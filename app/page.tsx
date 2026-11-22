import Image from "next/image";
import NotifyForm from "./notify-form";
import Sparkles from "./components/sparkles";
import { Spotlight, Tilt } from "./components/pointer";
import { pieces } from "./components/pieces";
import { formatPrice, getProducts } from "@/lib/shopify";

const ticker = [
  "Art by Mel",
  "Modern but cute",
  "Set by hand, crystal by crystal",
  "Everyday things, dressed up",
  "One of one",
];

const hero = [pieces[2], pieces[3], pieces[1]];

function Glint() {
  return (
    <svg viewBox="-12 -12 24 24" aria-hidden="true">
      <path
        d="M0 -10 C1.5 -3 3 -1.5 10 0 C3 1.5 1.5 3 0 10 C-1.5 3 -3 1.5 -10 0 C-3 -1.5 -1.5 -3 0 -10Z"
        fill="currentColor"
      />
    </svg>
  );
}

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
          <a href="#work">The art</a>
          <a href="#mel">Meet Mel</a>
        </nav>
        <a className="pill" href={open ? "#shop" : "#join"}>
          {open ? "Shop the drop" : "Join the list"}
        </a>
      </header>

      <main id="main">
        {/* ------------------------------ Hero ------------------------------ */}
        <section className="hero" id="top">
          <Sparkles />
          <div className="hero-copy reveal">
            <p className="eyebrow">
              <span className="dot" aria-hidden="true" />
              {open ? "Now open" : "Coming soon"} · Art by Mel · Singapore
            </p>
            <h1 className="wordmark" aria-label="Tai Tai Merch">
              <span className="letters" aria-hidden="true">
                {"Tai Tai".split("").map((c, i) => (
                  <span key={i} style={{ "--i": i } as React.CSSProperties}>
                    {c === " " ? " " : c}
                  </span>
                ))}
              </span>
              <em aria-hidden="true">Merch</em>
            </h1>
            <p className="tagline">
              Everyday things, dressed to the nines. One-of-a-kind crystal and
              bead creations by Mel, for the ladies who lunch &mdash; and the
              rest of us who&rsquo;d like to.
            </p>
            {open ? (
              <div className="hero-actions">
                <a className="pill pill-foil" href="#shop">
                  Shop the drop <span aria-hidden="true">→</span>
                </a>
                <a className="pill" href="#work">
                  See the art
                </a>
              </div>
            ) : (
              <>
                <NotifyForm />
                <p className="fine">
                  First access to the first drop. No spam, ever.
                </p>
              </>
            )}
          </div>

          <Tilt className="stack">
            {hero.map((p, i) => (
              <figure key={p.no} className={`print print-${"abc"[i]}`}>
                <div className={`print-art tone-${p.tone}`}>
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    priority
                    sizes="(max-width: 56rem) 50vw, 20rem"
                  />
                </div>
                <figcaption>
                  <span>{p.title}</span>
                  <i>Archive</i>
                </figcaption>
              </figure>
            ))}
            <span className="twinkle twinkle-a">
              <Glint />
            </span>
            <span className="twinkle twinkle-b">
              <Glint />
            </span>
          </Tilt>
        </section>

        {/* ----------------------------- Ticker ----------------------------- */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((n) => (
              <ul key={n}>
                {ticker.map((t) => (
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
              <p className="eyebrow">The shop</p>
              <h2>
                Take one <em>home</em>
              </h2>
              <p>
                Each piece is made by hand, so when it&rsquo;s gone, it&rsquo;s
                gone. Checkout is handled securely by Shopify.
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
                      {!p.available ? (
                        <span className="badge">Sold</span>
                      ) : null}
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
                        className="buy"
                        type="submit"
                        disabled={!p.available || !p.variantId}
                      >
                        {p.available ? "Buy now" : "Sold out"}
                        {p.available ? <span aria-hidden="true">→</span> : null}
                      </button>
                    </form>
                  </Tilt>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* ----------------------------- Gallery ---------------------------- */}
        <section className="work" id="work">
          <div className="section-head sr">
            <p className="eyebrow eyebrow-ink">The art</p>
            <h2>
              A peek at the <em>studio shelf</em>
            </h2>
            <p>
              Mel takes the everyday &mdash; a wine bottle, a packet of prawn
              crackers, a tiny camera &mdash; and sets it with crystals and
              beads until it can&rsquo;t help but sparkle. These are from her
              own collection: not for sale, just a taste of what she does.
            </p>
          </div>

          <ul className="bento">
            {pieces.map((p) => (
              <li
                key={p.no}
                className={`tile ${p.size ? `tile-${p.size}` : ""} sr`}
              >
                <Tilt
                  className={`tile-card ${p.tone ? `is-cutout tone-${p.tone}` : ""}`}
                >
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
                    <span className="tile-no">From the archive</span>
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
              <a className="pill pill-solid" href={open ? "#shop" : "#join"}>
                {open ? "Shop the drop" : "Be first to know"}{" "}
                <span aria-hidden="true">→</span>
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
            <p className="eyebrow">Meet Mel</p>
            <h2>
              Ordinary things, <em>extraordinarily dressed.</em>
            </h2>
            <p>
              Mel is the artist behind Tai Tai Merch. She makes the everyday
              amazing.
            </p>
            <ul className="traits">
              <li>
                <b>One of one</b>
                No two pieces are ever alike.
              </li>
              <li>
                <b>By hand</b>
                Every crystal and bead, placed by Mel.
              </li>
              <li>
                <b>Cute</b>
                Unapologetically so.
              </li>
            </ul>
          </div>
        </section>

        {/* ---------------------------- Big marquee -------------------------- */}
        <div className="shout" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((n) => (
              <ul key={n}>
                {["Tai Tai Merch", "Art by Mel", "More is more"].map((t) => (
                  <li key={t}>
                    {t}
                    <Glint />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* ------------------------------ Join ------------------------------ */}
        <section className="join" id="join">
          <div className="join-bg" aria-hidden="true">
            <div className="ticker-track">
              {[0, 1].map((n) => (
                <ul key={n}>
                  {pieces
                    .filter((p) => p.tone)
                    .map((p) => (
                    <li key={p.no}>
                      <Image src={p.image} alt="" fill sizes="20rem" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <Sparkles density={0.6} />
          <div className="plaque sr">
            <div className="crest" aria-hidden="true">
              ttm
            </div>
            <p className="eyebrow">
              {open ? "Stay in the loop" : "The doors open soon"}
            </p>
            <h2>
              Get on <em>the list</em>
            </h2>
            <div className="rule" aria-hidden="true">
              <span>◆</span>
            </div>
            <p className="tagline">
              {open
                ? "A note whenever Mel finishes something new, before anyone else sees it."
                : "One note when the shop opens, with first pick of Mel’s first drop."}
            </p>
            <NotifyForm />
          </div>
        </section>
      </main>

      <footer className="foot">
        <span>Tai Tai Merch</span>
        <span>An independent label · Est. 2026</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
