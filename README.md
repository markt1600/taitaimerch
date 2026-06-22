# Tai Tai Merch

A placeholder landing page for **Tai Tai Merch**, built on the same stack the
store will eventually run on, so nothing here is throwaway.

- **Now:** a branded "coming soon" page with an email capture.
- **Later:** swap the page for the [Next.js Commerce](https://github.com/vercel/commerce)
  storefront and point it at a Shopify backend. Shopify handles products,
  inventory, checkout, payments, customer accounts, and orders; this app is the
  custom front end.

Stack: Next.js (App Router) · React · Tailwind CSS v4 · TypeScript · deployed on Vercel.

---

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. No environment variables are needed for the
placeholder.

---

## Deploy to Vercel

1. Push this folder to a new GitHub repository.
2. Go to [vercel.com](https://vercel.com), **Add New → Project**, and import the repo.
3. Vercel auto-detects Next.js — no build settings to change. Click **Deploy**.
4. Add your custom domain under **Settings → Domains** when ready.

> Vercel's free Hobby plan is for non-commercial use. Once the store takes
> money, move the project to a **Pro** team (~$20/month).

---

## Going live: connect Shopify

Do this when you're ready to actually sell. The placeholder keeps working until
you make the swap.

### 1. Create the store and add products

1. Start a store at [shopify.com](https://www.shopify.com) (free trial, then a
   paid plan). **Use the Basic plan or higher** — the Starter plan can't install
   the custom theme that headless requires.
2. In the admin, add your products: titles, images, prices, variants, and
   **inventory quantities**. Group them into collections.
3. Under **Settings → Payments**, activate a provider (Shopify Payments supports
   SGD in Singapore). Set up **Shipping** and **Taxes** while you're there.

### 2. Get a Storefront API token

The cleanest route is Shopify's **Headless** sales channel, which creates the
token for you and wires up the hosted checkout:

- **Settings → Apps and sales channels → Shopify App Store**, search for
  **Headless**, add it, and create a storefront. Copy the **Storefront API
  access token**.

Or create a custom app manually:

- **Settings → Apps and sales channels → Develop apps → Create an app**.
- Open **Configuration → Storefront API** and enable these scopes:
  - `unauthenticated_read_product_listings`
  - `unauthenticated_read_product_inventory`
  - `unauthenticated_read_checkouts`
  - `unauthenticated_write_checkouts`
- **Install** the app, then copy the **Storefront API access token** from
  **API credentials**.

Note your store domain too: `your-store.myshopify.com`.

### 3. Set environment variables

Copy `.env.example` to `.env.local` for local work, and add the same values in
Vercel under **Settings → Environment Variables**:

| Variable | Value |
| --- | --- |
| `SITE_NAME` | `Tai Tai Merch` |
| `COMPANY_NAME` | `Tai Tai Merch` (optional) |
| `SHOPIFY_STORE_DOMAIN` | `your-store.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | the token from step 2 |
| `SHOPIFY_REVALIDATION_SECRET` | a random string you invent (e.g. a UUID) |

### 4. Keep the site fresh with webhooks

So the site updates when products or stock change, add Shopify webhooks under
**Settings → Notifications → Webhooks** for `products/update` and
`collections/update`, pointing at:

```
https://YOUR-DOMAIN/api/revalidate?secret=YOUR_SHOPIFY_REVALIDATION_SECRET
```

Next.js Commerce ships with this `/api/revalidate` route already.

### 5. Swap the placeholder for the storefront

Clone [`vercel/commerce`](https://github.com/vercel/commerce), bring over the
branding from `app/globals.css` and `app/layout.tsx`, set the same environment
variables, and deploy. Checkout is handled by Shopify: the cart returns a
Shopify-hosted checkout URL, so you never touch payment details directly.

---

## What's where

```
app/
  layout.tsx       fonts + metadata
  page.tsx         the placeholder landing page
  notify-form.tsx  email capture (not yet wired to a backend)
  globals.css      brand styling (jade + gold "calling card")
  icon.svg         favicon
.env.example       env vars for the Shopify connection (later)
```
