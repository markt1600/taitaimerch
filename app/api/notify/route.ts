import { NextResponse } from "next/server";

// Shopify Admin API version. Bump to a newer dated version over time.
const SHOPIFY_API_VERSION = "2026-01";

// Cached app access token (Shopify tokens last 24h). Persists across warm
// serverless invocations; refetched automatically on cold starts or expiry.
let cachedToken: string | null = null;
let cachedTokenExpiresAt = 0;

async function getAccessToken(
  domain: string,
  clientId: string,
  clientSecret: string,
): Promise<string> {
  if (cachedToken && Date.now() < cachedTokenExpiresAt - 60_000) {
    return cachedToken;
  }

  // Client credentials grant: exchange Client ID + Secret for an access token.
  const res = await fetch(`https://${domain}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    // Log Shopify's actual error (e.g. "shop_not_permitted", "invalid_client")
    // so the cause is visible in the Vercel logs.
    const detail = await res.text().catch(() => "");
    console.error("Token request failed:", res.status, detail);
    throw new Error(`Token request failed: ${res.status} ${detail}`);
  }

  const data = await res.json();
  cachedToken = data.access_token as string;
  cachedTokenExpiresAt = Date.now() + (data.expires_in ?? 86399) * 1000;
  return cachedToken;
}

export async function POST(request: Request) {
  // 1. Read and validate the email.
  let email: string | undefined;
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim() : undefined;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const looksLikeEmail = !!email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!looksLikeEmail) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // 2. Server-only credentials (never sent to the browser).
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
  if (!domain || !clientId || !clientSecret) {
    return NextResponse.json(
      { error: "The signup form isn't configured yet." },
      { status: 500 },
    );
  }

  // 3. Create the customer, subscribed to email marketing and tagged so the
  //    welcome automation can target these signups.
  const query = `
    mutation customerCreate($input: CustomerInput!) {
      customerCreate(input: $input) {
        userErrors { field message }
        customer { id }
      }
    }`;

  const variables = {
    input: {
      email,
      emailMarketingConsent: {
        marketingState: "SUBSCRIBED",
        marketingOptInLevel: "SINGLE_OPT_IN",
      },
      tags: ["waitlist"],
    },
  };

  try {
    const accessToken = await getAccessToken(domain, clientId, clientSecret);

    const res = await fetch(
      `https://${domain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
        body: JSON.stringify({ query, variables }),
        cache: "no-store",
      },
    );

    const json = await res.json();

    if (json?.errors) {
      console.error("Shopify GraphQL error:", JSON.stringify(json.errors));
      return NextResponse.json({ error: "Subscription failed." }, { status: 502 });
    }

    const userErrors = json?.data?.customerCreate?.userErrors ?? [];
    if (userErrors.length > 0) {
      const message: string = userErrors[0]?.message ?? "";
      // Already a customer? Treat it as success — they're on the list.
      if (/taken|already/i.test(message)) {
        return NextResponse.json({ ok: true, alreadySubscribed: true });
      }
      console.error("customerCreate userErrors:", JSON.stringify(userErrors));
      return NextResponse.json(
        { error: "We couldn't add you just now. Please try again." },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("notify route error:", err);
    return NextResponse.json({ error: "Subscription failed." }, { status: 502 });
  }
}
