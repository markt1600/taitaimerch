/* ---------------------------------------------------------------------------
   Shopify Storefront API — products in, checkout out.

   Needs two env vars (see .env.example):
     SHOPIFY_STORE_DOMAIN              your-store.myshopify.com
     SHOPIFY_STOREFRONT_ACCESS_TOKEN   public Storefront API token

   Without them the site still works: the shop section simply stays hidden
   and the page remains a "coming soon" showcase.
--------------------------------------------------------------------------- */

const API_VERSION = "2026-07";

export type Product = {
  id: string;
  handle: string;
  title: string;
  available: boolean;
  price: { amount: string; currencyCode: string };
  image: { url: string; altText: string | null } | null;
  /** First purchasable variant — what "Buy now" sends to checkout. */
  variantId: string | null;
};

export function shopifyConfigured() {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN &&
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  );
}

async function storefront<T>(
  query: string,
  variables: Record<string, unknown>,
  init: RequestInit & { next?: { tags?: string[]; revalidate?: number } },
): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN!.replace(/^https?:\/\//, "");
  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
    ...init,
  });

  const json = await res.json().catch(() => null);
  if (!res.ok || !json || json.errors) {
    throw new Error(
      `Storefront API ${res.status}: ${JSON.stringify(json?.errors ?? null)}`,
    );
  }
  return json.data as T;
}

type ProductNode = {
  id: string;
  handle: string;
  title: string;
  availableForSale: boolean;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: { nodes: { id: string; availableForSale: boolean }[] };
};

/** Newest products first. Returns [] if Shopify isn't set up or is unreachable. */
export async function getProducts(first = 12): Promise<Product[]> {
  if (!shopifyConfigured()) return [];

  const query = `
    query Products($first: Int!) {
      products(first: $first, sortKey: CREATED_AT, reverse: true) {
        nodes {
          id
          handle
          title
          availableForSale
          featuredImage { url altText }
          priceRange { minVariantPrice { amount currencyCode } }
          variants(first: 10) { nodes { id availableForSale } }
        }
      }
    }`;

  try {
    const data = await storefront<{ products: { nodes: ProductNode[] } }>(
      query,
      { first },
      { next: { tags: ["products"], revalidate: 300 } },
    );
    return data.products.nodes.map((p) => {
      const variant =
        p.variants.nodes.find((v) => v.availableForSale) ?? p.variants.nodes[0];
      return {
        id: p.id,
        handle: p.handle,
        title: p.title,
        available: p.availableForSale,
        price: p.priceRange.minVariantPrice,
        image: p.featuredImage,
        variantId: variant?.id ?? null,
      };
    });
  } catch (err) {
    console.error("getProducts failed:", err);
    return [];
  }
}

/** Creates a one-item cart and returns Shopify's hosted checkout URL. */
export async function createCheckout(variantId: string): Promise<string> {
  const query = `
    mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { checkoutUrl }
        userErrors { message }
      }
    }`;

  const data = await storefront<{
    cartCreate: {
      cart: { checkoutUrl: string } | null;
      userErrors: { message: string }[];
    };
  }>(
    query,
    { lines: [{ merchandiseId: variantId, quantity: 1 }] },
    { cache: "no-store" },
  );

  const url = data.cartCreate.cart?.checkoutUrl;
  if (!url) {
    throw new Error(
      data.cartCreate.userErrors.map((e) => e.message).join("; ") ||
        "No checkout URL returned",
    );
  }
  return url;
}

export function formatPrice({ amount, currencyCode }: Product["price"]) {
  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
  }).format(Number(amount));
}
