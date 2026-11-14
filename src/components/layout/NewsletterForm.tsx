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
    <div className="mx-auto mt-6 max-w-[500px] lg:mx-0 lg:max-w-none">
      <form
        onSubmit={onSubmit}
        noValidate
        className="flex flex-col lg:h-[70px] lg:w-[500px] lg:flex-row lg:items-center lg:bg-white xl:w-[590px]"
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
          className="h-14 bg-white pl-8 outline-none placeholder:text-tt-grey-medium lg:h-full lg:flex-1"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 bg-tt-blue px-10 py-4 text-sm tracking-[.25em] text-white transition-colors hover:bg-tt-sky-blue disabled:opacity-60 lg:mx-3 lg:mt-0"
        >
          {status === "loading" ? "ENVOI…" : "INSCRIPTION"}
        </button>
      </form>
      <p
        role="status"
        className={`mt-2 min-h-5 text-center text-sm lg:text-left ${status === "error" ? "text-red-600" : "text-tt-blue"}`}
      >
        {message}
      </p>
    </div>
  );
}
