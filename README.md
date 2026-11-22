# Tai Tai Merch

The storefront for **Tai Tai Merch** — one-of-a-kind crystal and bead art by
Mel. It runs in two modes from the same code:

- **Coming soon** (no Shopify storefront token set): a showcase of Mel's work
  with an email signup.
- **Open** (token set and at least one product published): the same page gains
  a **Shop** section with live products, prices and stock from Shopify, and
  "Buy now" buttons that go straight to Shopify's hosted checkout.

Stack: Next.js (App Router) · React · Tailwind CSS v4 · TypeScript · deployed on Vercel.

---

## Adding Mel's artwork

The gallery and hero photos live in `public/art/`. They are examples of Mel's
work, shown as a portfolio and labelled as not for sale; anything you actually
sell comes from Shopify and appears in the Shop section. To add or swap a piece, drop
in a portrait photo (roughly 3:4) and edit the list in
`app/components/pieces.ts` — title, note, alt text and crop focus are all there.

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

### 1. Create the store and add products

1. Start a store at [shopify.com](https://www.shopify.com). **Use the Basic
   plan or higher.**
2. In the admin, add your products: title, photos, price and **inventory
   quantity** (1 for a one-off piece). Make sure each product is published to
   the Headless / custom app sales channel from step 2.
3. Under **Settings → Payments**, activate a provider (Shopify Payments supports
   SGD in Singapore). Set up **Shipping** and **Taxes** while you're there.

### 2. Get a Storefront API token

- **Settings → Apps and sales channels → Shopify App Store**, search for
  **Headless**, add it, and create a storefront. Copy the **public Storefront
  API access token**.

Note your store domain too: `your-store.myshopify.com`.

### 3. Set environment variables

Copy `.env.example` to `.env.local` for local work, and add the same values in
Vercel under **Settings → Environment Variables**, then redeploy:

| Variable | Used for |
| --- | --- |
| `SHOPIFY_STORE_DOMAIN` | `your-store.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | product grid and checkout |
| `SHOPIFY_CLIENT_ID` / `SHOPIFY_CLIENT_SECRET` | email signup (creates a customer tagged `waitlist`) |
| `SHOPIFY_REVALIDATION_SECRET` | a random string you invent, for the webhook below |

### 4. Keep the site fresh with webhooks

Products refresh on their own every five minutes. To make changes show up
immediately, add webhooks under **Settings → Notifications → Webhooks** for
`products/create`, `products/update` and `products/delete`, pointing at:

```
https://YOUR-DOMAIN/api/revalidate?secret=YOUR_SHOPIFY_REVALIDATION_SECRET
```

### How buying works

Each product card posts to `/api/checkout`, which creates a one-item Shopify
cart and redirects to Shopify's hosted checkout. Payment details never touch
this app. There is no multi-item cart yet — one piece per checkout.

---

## What's where

```
app/
  layout.tsx              fonts + metadata
  page.tsx                the page: hero, shop, gallery, Meet Mel, signup
  notify-form.tsx         email signup form
  globals.css             brand styling (jade + gold) and all animation
  components/pieces.ts    the list of Mel's pieces shown in the gallery
  components/sparkles.tsx twinkling canvas behind the hero
  components/pointer.tsx  pointer glow and card tilt
  api/notify              adds a signup to Shopify customers
  api/checkout            "Buy now" -> Shopify checkout
  api/revalidate          webhook target that refreshes products
lib/shopify.ts            Storefront API client
public/art/               Mel's photos
.env.example              the environment variables above
```
