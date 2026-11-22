import Image from "next/image";
import NotifyForm from "./notify-form";
import { Spotlight, Tilt } from "./components/pointer";
import { Bao, Cat, Sparkle, Teacup, pieces } from "./components/art";

const ticker = [
  "Art by Mel",
  "Modern but cute",
  "Drawn in Singapore",
  "Original characters",
  "First drop coming soon",
];

export default function Home() {
  return (
    <>
      <Spotlight />
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
          <a href="#work">The art</a>
          <a href="#mel">Meet Mel</a>
        </nav>
        <a className="pill" href="#join">
          Join the list
        </a>
      </header>

      <main id="main">
        {/* ------------------------------ Hero ------------------------------ */}
        <section className="hero" id="top">
          <div className="hero-copy reveal">
            <p className="eyebrow">
              <span className="dot" aria-hidden="true" />
              Coming soon · Art by Mel · Singapore
            </p>
            <h1 className="wordmark">
              Tai&nbsp;Tai <em>Merch</em>
            </h1>
            <p className="tagline">
              Modern, cute and a little bit cheeky. One-of-a-kind creations by
              Mel, for the ladies who lunch &mdash; and the rest of us
              who&rsquo;d like to.
            </p>
            <NotifyForm />
            <p className="fine">First access to the first drop. No spam, ever.</p>
          </div>

          <Tilt className="stack">
            <figure className="print print-a">
              <div className="print-art tone-jade">
                <Teacup />
              </div>
              <figcaption>
                <span>Tea for One</span>
                <i>No. 01</i>
              </figcaption>
            </figure>
            <figure className="print print-b">
              <div className="print-art tone-sage">
                <Cat />
              </div>
              <figcaption>
                <span>Pearls, Darling</span>
                <i>No. 02</i>
              </figcaption>
            </figure>
            <figure className="print print-c">
              <div className="print-art tone-deep">
                <Bao />
              </div>
              <figcaption>
                <span>Bao Bao</span>
                <i>No. 04</i>
              </figcaption>
            </figure>
            <svg className="twinkle twinkle-a" viewBox="-12 -12 24 24" aria-hidden="true">
              <Sparkle x={0} y={0} />
            </svg>
            <svg className="twinkle twinkle-b" viewBox="-12 -12 24 24" aria-hidden="true">
              <Sparkle x={0} y={0} />
            </svg>
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

        {/* ----------------------------- Gallery ---------------------------- */}
        <section className="work" id="work">
          <div className="section-head sr">
            <p className="eyebrow eyebrow-ink">The art</p>
            <h2>
              A peek at the <em>studio wall</em>
            </h2>
            <p>
              Every piece starts as a doodle in Mel&rsquo;s sketchbook. Here
              are a few of the characters getting ready for their debut.
            </p>
          </div>

          <ul className="bento">
            {pieces.map((p) => (
              <li
                key={p.no}
                className={`tile tone-${p.tone} ${p.size ? `tile-${p.size}` : ""} sr`}
              >
                <div className="tile-art">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 48rem) 100vw, 50vw"
                    />
                  ) : (
                    <p.Art />
                  )}
                </div>
                <div className="tile-label">
                  <span className="tile-no">No. {p.no}</span>
                  <strong>{p.title}</strong>
                  <span className="tile-note">{p.note}</span>
                </div>
              </li>
            ))}
            <li className="tile tile-wide tile-cta sr">
              <p>
                More on the wall <em>soon.</em>
              </p>
              <a className="pill pill-solid" href="#join">
                Be first to see it <span aria-hidden="true">→</span>
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
              Clean lines, soft shapes, <em>big feelings.</em>
            </h2>
            <p>
              Mel is the artist behind Tai Tai Merch. Her work is modern at
              first glance and cute on the second &mdash; small characters with
              big personalities, drawn by hand and made into things you&rsquo;ll
              actually want to keep.
            </p>
            <ul className="traits">
              <li>
                <b>Original</b>
                Every character is Mel&rsquo;s own.
              </li>
              <li>
                <b>Considered</b>
                Modern shapes, a restrained palette.
              </li>
              <li>
                <b>Cute</b>
                Unapologetically so.
              </li>
            </ul>
          </div>
        </section>

        {/* ------------------------------ Join ------------------------------ */}
        <section className="join" id="join">
          <div className="plaque sr">
            <div className="crest" aria-hidden="true">
              ttm
            </div>
            <p className="eyebrow">The doors open soon</p>
            <h2>
              Get on <em>the list</em>
            </h2>
            <div className="rule" aria-hidden="true">
              <span>◆</span>
            </div>
            <p className="tagline">
              One note when the shop opens, with first pick of Mel&rsquo;s
              first drop.
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
