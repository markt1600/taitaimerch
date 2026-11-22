import Image from "next/image";
import NotifyForm from "./notify-form";
import Sparkles from "./components/sparkles";
import { Spotlight, Tilt } from "./components/pointer";
import { piece, pieces } from "./components/pieces";
import { formatPrice, getProducts } from "@/lib/shopify";

const band = ["Modern art", "Crafted by hand", "One of one", "By Mel", "Singapore"];

const showcase = [
  piece("Napa Confetti"),
  piece("Twin-Lens Twinkle"),
  piece("Sticks & Stones"),
];

const principles = [
  {
    no: "I",
    title: "Modern art",
    text: "Everyday objects, reimagined as contemporary pieces: a snack packet, a wine bottle, a tiny camera.",
  },
  {
    no: "II",
    title: "Crafted by hand",
    text: "Every crystal and every bead is set by Mel, one at a time. No machines, no shortcuts.",
  },
  {
    no: "III",
    title: "One of one",
    text: "Each piece is made once and never repeated. When it has a home, it is gone.",
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const [products, params] = await Promise.all([getProducts(), searchParams]);
  const open = products.length > 0;

  return (
    <>
      <Spotlight />
      <div className="progress" aria-hidden="true" />
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="nav">
        <a className="nav-brand" href="#top" aria-label="Tai Tai Merch, home">
          <span className="crest" aria-hidden="true">
            ttm
          </span>
          <span className="nav-name">Tai Tai Merch</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {open ? <a href="#shop">Shop</a> : null}
          <a href="#principles">Principles</a>
          <a href="#work">Archive</a>
          <a href="#mel">Mel</a>
        </nav>
        <a className="btn btn-ghost" href={open ? "#shop" : "#join"}>
          {open ? "Shop" : "Join the list"}
        </a>
      </header>

      <main id="main">
        {/* ------------------------------ Hero ------------------------------ */}
        <section className="hero" id="top">
          <Sparkles density={0.45} />
          <div className="hero-copy reveal">
            <p className="eyebrow">
              {open ? "Now open" : "Opening soon"} <span>◆</span> Singapore
            </p>
            <h1 className="wordmark">
              Tai&nbsp;Tai <em>Merch</em>
            </h1>
            <p className="tagline">
              Modern art, crafted by hand. Mel turns everyday things into
              one-of-one pieces, set crystal by crystal &mdash; for the ladies
              who lunch, and the rest of us who&rsquo;d like to.
            </p>
            {open ? (
              <div className="hero-actions">
                <a className="btn" href="#shop">
                  Shop the collection
                </a>
                <a className="btn btn-ghost" href="#work">
                  View the archive
                </a>
              </div>
            ) : (
              <>
                <NotifyForm />
                <p className="fine">
                  First access to the first collection. Nothing else.
                </p>
              </>
            )}
          </div>

          <div className="showcase">
            <div className="niche-arch">
              {showcase.map((p, i) => (
                <figure
                  key={p.no}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 56rem) 80vw, 28rem"
                  />
                  <figcaption>
                    <span>{p.title}</span>
                    <i>One of one</i>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------ Band ------------------------------ */}
        <div className="band" aria-hidden="true">
          <div className="band-track">
            {[0, 1, 2].map((n) => (
              <ul key={n}>
                {band.map((t) => (
                  <li key={t}>
                    {t}
                    <span>◆</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* ------------------------------ Shop ------------------------------ */}
        {open ? (
          <section className="shop" id="shop">
            <div className="section-head sr">
              <p className="eyebrow">The collection</p>
              <h2>
                Available <em>now</em>
              </h2>
              <p>
                Each piece is made once. Checkout is handled securely by
                Shopify.
              </p>
              {params.checkout === "unavailable" ? (
                <p className="shop-alert" role="alert">
                  Sorry &mdash; we couldn&rsquo;t start checkout for that piece.
                  Please try again in a moment.
                </p>
              ) : null}
            </div>

            <ul className="products">
              {products.map((p) => (
                <li key={p.id} className="product sr">
                  <Tilt className="product-card">
                    <div className="product-art">
                      {p.image ? (
                        <Image
                          src={p.image.url}
                          alt={p.image.altText ?? p.title}
                          fill
                          sizes="(max-width: 40rem) 100vw, (max-width: 64rem) 50vw, 25vw"
                        />
                      ) : null}
                      <span className="badge">
                        {p.available ? "One of one" : "Sold"}
                      </span>
                    </div>
                    <div className="product-info">
                      <h3>{p.title}</h3>
                      <p>{formatPrice(p.price)}</p>
                    </div>
                    <form action="/api/checkout" method="post">
                      <input
                        type="hidden"
                        name="variantId"
                        value={p.variantId ?? ""}
                      />
                      <button
                        className="btn buy"
                        type="submit"
                        disabled={!p.available || !p.variantId}
                      >
                        {p.available ? "Acquire" : "Sold"}
                      </button>
                    </form>
                  </Tilt>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* --------------------------- Principles --------------------------- */}
        <section className="principles" id="principles">
          <div className="section-head section-head-center sr">
            <p className="eyebrow eyebrow-ink">The principles</p>
            <h2>
              Made once. By hand. <em>Never again.</em>
            </h2>
          </div>
          <ol className="creed">
            {principles.map((p) => (
              <li key={p.no} className="sr">
                <span className="creed-no" aria-hidden="true">
                  {p.no}
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------- Archive ---------------------------- */}
        <section className="work" id="work">
          <div className="section-head sr">
            <p className="eyebrow">The archive</p>
            <h2>
              From the <em>studio shelf</em>
            </h2>
            <p>
              A selection from Mel&rsquo;s own collection. These pieces are not
              for sale &mdash; they are here to show what her hands can do.
            </p>
          </div>

          <ul className="bento">
            {pieces.map((p) => (
              <li
                key={p.no}
                className={`tile ${p.size ? `tile-${p.size}` : ""} sr`}
              >
                <Tilt className={`tile-card ${p.photo ? "is-photo" : ""}`}>
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes={
                      p.size
                        ? "(max-width: 52rem) 100vw, 50vw"
                        : "(max-width: 52rem) 50vw, 25vw"
                    }
                  />
                  <div className="tile-label">
                    <span className="tile-no">No. {p.no}</span>
                    <strong>{p.title}</strong>
                    <span className="tile-note">{p.note}</span>
                  </div>
                </Tilt>
              </li>
            ))}
            <li className="tile tile-wide tile-cta sr">
              <p>
                {open ? "Pieces you can " : "Pieces you can own, "}
                <em>{open ? "take home." : "coming soon."}</em>
              </p>
              <a className="btn" href={open ? "#shop" : "#join"}>
                {open ? "Shop the collection" : "Be first to know"}
              </a>
            </li>
          </ul>
        </section>

        {/* ------------------------------- Mel ------------------------------ */}
        <section className="mel" id="mel">
          <div className="mel-mark sr" aria-hidden="true">
            <span>M</span>
          </div>
          <div className="mel-copy sr">
            <p className="eyebrow">The artist</p>
            <h2>
              Meet <em>Mel</em>
            </h2>
            <p>
              Mel is the artist behind Tai Tai Merch. She makes the everyday
              amazing.
            </p>
            <p className="signature" aria-hidden="true">
              Mel
            </p>
          </div>
        </section>

        {/* ------------------------------ Join ------------------------------ */}
        <section className="join" id="join">
          <div className="join-bg" aria-hidden="true">
            <div className="band-track">
              {[0, 1, 2].map((n) => (
                <ul key={n}>
                  {pieces
                    .filter((p) => !p.photo)
                    .map((p) => (
                      <li key={p.no}>
                        <Image src={p.image} alt="" fill sizes="20rem" />
                      </li>
                    ))}
                </ul>
              ))}
            </div>
          </div>
          <Sparkles density={0.35} />
          <div className="plaque sr">
            <div className="crest" aria-hidden="true">
              ttm
            </div>
            <p className="eyebrow">
              {open ? "By invitation" : "The doors open soon"}
            </p>
            <h2>
              Join <em>the list</em>
            </h2>
            <div className="rule" aria-hidden="true">
              <span>◆</span>
            </div>
            <p className="tagline">
              {open
                ? "A note whenever Mel finishes something new, before anyone else sees it."
                : "One note when the shop opens, with first pick of Mel’s first collection."}
            </p>
            <NotifyForm />
          </div>
        </section>
      </main>

      <footer className="foot">
        <p className="foot-mark">
          Tai Tai <em>Merch</em>
        </p>
        <div className="foot-row">
          <span>Modern art · Crafted by hand · One of one</span>
          <span>Singapore · Est. 2026</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
