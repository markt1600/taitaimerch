import { NextResponse } from "next/server";
import { createCheckout, shopifyConfigured } from "@/lib/shopify";

// "Buy now": a product card posts its variant id here and the shopper is
// redirected to Shopify's hosted checkout. Payment never touches this app.
export async function POST(request: Request) {
  const back = (reason: string) =>
    NextResponse.redirect(new URL(`/?checkout=${reason}#shop`, request.url), 303);

  const form = await request.formData().catch(() => null);
  const variantId = form?.get("variantId");

  if (
    !shopifyConfigured() ||
    typeof variantId !== "string" ||
    !variantId.startsWith("gid://shopify/ProductVariant/")
  ) {
    return back("unavailable");
  }

  try {
    return NextResponse.redirect(await createCheckout(variantId), 303);
  } catch (err) {
    // The full reason is in the server logs (Vercel → Logs → /api/checkout).
    console.error("checkout route error:", err);
    return back("failed");
  }
}
