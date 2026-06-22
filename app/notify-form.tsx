"use client";

import { useState } from "react";

export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const value = email.trim();
    const looksLikeEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
    if (!looksLikeEmail) return;

    // Placeholder only — nothing is stored yet. When the shop goes live,
    // POST this to your email list (Klaviyo, Mailchimp, a Shopify customer
    // create mutation, etc.) from a route handler at app/api/notify/route.ts.
    setDone(true);
  }

  if (done) {
    return (
      <p className="notify notify-done">
        <strong>You&rsquo;re on the list.</strong> We&rsquo;ll send a note the
        moment the doors open.
      </p>
    );
  }

  return (
    <form className="notify" onSubmit={handleSubmit} noValidate>
      <div className="notify-row">
        <input
          className="notify-input"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Your email"
          aria-label="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button className="notify-button" type="submit">
          Notify me
        </button>
      </div>
    </form>
  );
}
