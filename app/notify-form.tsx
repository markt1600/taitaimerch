"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "done" | "error";

export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const value = email.trim();

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong.");
      }

      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="notify notify-done" role="status">
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
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          required
        />
        <button
          className="notify-button"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Adding\u2026" : "Notify me"}
          <span aria-hidden="true">→</span>
        </button>
      </div>
      {status === "error" ? (
        <p role="alert" className="notify-error">
          {error}
        </p>
      ) : null}
    </form>
  );
}
