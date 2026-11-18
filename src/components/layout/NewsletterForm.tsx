"use client";

import { useState, type SubmitEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok: boolean; message: string };
      setStatus(data.ok ? "success" : "error");
      setMessage(data.message);
      if (data.ok) form.reset();
    } catch {
      setStatus("error");
      setMessage("Une erreur est survenue, merci de réessayer.");
    }
  }

  return (
    <div className="mt-4 max-w-md">
      <form
        onSubmit={onSubmit}
        noValidate
        className="flex h-14 items-center rounded-full border border-white/15 bg-white/5 p-1.5 pl-5 transition focus-within:border-tt-orange"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Votre adresse email
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Votre adresse email"
          className="h-full min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/40"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-full shrink-0 rounded-full bg-tt-orange px-5 text-sm font-bold text-white transition-colors hover:bg-tt-orange-dark disabled:opacity-60"
        >
          {status === "loading" ? "Envoi…" : "S'inscrire"}
        </button>
      </form>
      <p role="status" className={`mt-2 min-h-5 text-sm ${status === "error" ? "text-red-400" : "text-white/70"}`}>
        {message}
      </p>
    </div>
  );
}
