import NotifyForm from "./notify-form";

export default function Home() {
  return (
    <main className="plaque reveal">
      <div className="crest" aria-hidden="true">
        ttm
      </div>
      <p className="eyebrow">Coming soon · Singapore</p>
      <h1 className="wordmark">
        Tai&nbsp;Tai
        <br />
        Merch
      </h1>
      <div className="rule" aria-hidden="true">
        <span>◆</span>
      </div>
      <p className="tagline">
        Merch for the ladies who lunch &mdash; and the rest of us who&rsquo;d
        like to. The shop opens soon.
      </p>
      <NotifyForm />
      <p className="foot">An independent label · Est. 2026</p>
    </main>
  );
}
