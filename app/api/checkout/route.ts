import { NextResponse } from "next/server";
import { createCheckout, shopifyConfigured } from "@/lib/shopify";

// "Buy now": a product card posts its variant id here and the shopper is
// redirected to Shopify's hosted checkout. Payment never touches this app.
export async function POST(request: Request) {
  const home = new URL("/?checkout=unavailable#shop", request.url);

  const form = await request.formData().catch(() => null);
  const variantId = form?.get("variantId");

  if (
    !shopifyConfigured() ||
    typeof variantId !== "string" ||
    !variantId.startsWith("gid://shopify/ProductVariant/")
  ) {
    return NextResponse.redirect(home, 303);
  }

  try {
    return NextResponse.redirect(await createCheckout(variantId), 303);
  } catch (err) {
    console.error("checkout route error:", err);
    return NextResponse.redirect(home, 303);
  }
}
