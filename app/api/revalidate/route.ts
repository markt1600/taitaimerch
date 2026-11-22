import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// Shopify webhook target (products/create, products/update, products/delete):
//   https://YOUR-DOMAIN/api/revalidate?secret=SHOPIFY_REVALIDATION_SECRET
// Refreshes the product grid as soon as something changes in the admin.
export async function POST(request: Request) {
  const secret = process.env.SHOPIFY_REVALIDATION_SECRET;
  if (!secret || new URL(request.url).searchParams.get("secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  revalidateTag("products");
  return NextResponse.json({ revalidated: true });
}
