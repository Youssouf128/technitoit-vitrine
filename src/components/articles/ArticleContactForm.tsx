"use client";

import Link from "next/link";
import { useState, type ReactNode, type SubmitEvent } from "react";
import { CONTACT_PRODUCTS, PARTNERS_NOTICE, validateContact, type ContactRequest } from "@/data/contact";
import { CheckIcon } from "@/components/ui/icons";

const EMPTY: ContactRequest = {
  lastName: "",
  firstName: "",
  postalCodeCity: "",
  phone: "",
  email: "",
  isOwner: "proprietaire",
  houseType: "maison",
  products: [],
  comment: "",
  partnersConsent: false,
};

const inputCls = (err?: string) =>
  `h-10 border px-4 outline-none transition-colors focus:border-tt-orange ${err ? "border-red-500" : "border-tt-blue"}`;

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

function Radio({ checked, onSelect, children }: { checked: boolean; onSelect: () => void; children: ReactNode }) {
  return (
    <button type="button" role="radio" aria-checked={checked} onClick={onSelect} className="flex items-center gap-2">
      <span className="flex size-4 items-center justify-center rounded-full border border-tt-grey-dark">
        {checked && <span className="size-1.5 rounded-full bg-tt-blue" />}
      </span>
      {children}
    </button>
  );
}

/** Formulaire « Informations de contact » affiché en bas des articles. */
export function ArticleContactForm({ source }: { source: string }) {
  const [data, setData] = useState<ContactRequest>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const set = <K extends keyof ContactRequest>(k: K, v: ContactRequest[K]) => setData((d) => ({ ...d, [k]: v }));

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateContact(data);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      const json = (await res.json()) as { ok: boolean; errors?: Record<string, string> };
      if (!json.ok) {
        setErrors(json.errors ?? {});
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-start gap-4 py-6" role="status">
        <span className="flex size-14 items-center justify-center rounded-full bg-tt-orange text-white">
          <CheckIcon className="size-7" />
        </span>
        <p className="text-2xl font-bold">
          Merci, votre demande a bien été envoyée<span className="text-tt-orange">.</span>
        </p>
        <p className="font-light">Un conseiller Technitoit vous recontactera dans les meilleurs délais.</p>
        <Link href="/" className="text-sm font-bold tracking-[.2em] text-tt-orange hover:underline">
          RETOUR À L&apos;ACCUEIL
        </Link>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-5 lg:flex-row">
        <Field id="lastName" label="Nom *" error={errors.lastName}>
          <input id="lastName" autoComplete="family-name" placeholder="Durand" value={data.lastName} onChange={(e) => set("lastName", e.target.value)} className={inputCls(errors.lastName)} />
        </Field>
        <Field id="firstName" label="Prénom">
          <input id="firstName" autoComplete="given-name" placeholder="Bernard" value={data.firstName} onChange={(e) => set("firstName", e.target.value)} className={inputCls()} />
        </Field>
      </div>

      <Field id="postalCode-city" label="Code postal - Ville *" error={errors.postalCodeCity}>
        <input id="postalCode-city" autoComplete="postal-code" placeholder="49000 - Angers" value={data.postalCodeCity} onChange={(e) => set("postalCodeCity", e.target.value)} className={inputCls(errors.postalCodeCity)} />
      </Field>

      <div className="flex flex-col gap-5 lg:flex-row">
        <Field id="phone" label="Numéro de téléphone *" error={errors.phone}>
          <input id="phone" type="tel" autoComplete="tel" placeholder="+33 2 41 53 90 87" value={data.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls(errors.phone)} />
        </Field>
        <Field id="email" label="Email *" error={errors.email}>
          <input id="email" type="email" autoComplete="email" placeholder="durand.b@gmail.com" value={data.email} onChange={(e) => set("email", e.target.value)} className={inputCls(errors.email)} />
        </Field>
      </div>

      <div className="flex flex-col gap-4">
        <p>Vous êtes *</p>
        <div role="radiogroup" aria-label="Vous êtes" className="flex flex-wrap gap-5">
          <Radio checked={data.isOwner === "proprietaire"} onSelect={() => set("isOwner", "proprietaire")}>Propriétaire</Radio>
          <Radio checked={data.isOwner === "locataire"} onSelect={() => set("isOwner", "locataire")}>Locataire</Radio>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p>Vos travaux concernent *</p>
        <div role="radiogroup" aria-label="Vos travaux concernent" className="flex flex-wrap gap-5">
          <Radio checked={data.houseType === "maison"} onSelect={() => set("houseType", "maison")}>Une maison</Radio>
          <Radio checked={data.houseType === "appartement"} onSelect={() => set("houseType", "appartement")}>Un appartement</Radio>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p>Votre demande concerne (plusieurs choix possibles)</p>
        <div className="flex flex-wrap gap-5">
          {CONTACT_PRODUCTS.map((p) => {
            const on = data.products.includes(p);
            return (
              <button
                key={p}
                type="button"
                aria-pressed={on}
                onClick={() => set("products", on ? data.products.filter((x) => x !== p) : [...data.products, p])}
                className={`border px-6 py-2.5 transition-colors ${
                  on ? "border-tt-blue bg-tt-blue text-white" : "border-[#BCBCBC] text-[#BCBCBC] hover:border-tt-blue hover:text-tt-blue"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      <Field id="comment" label="Compléter votre demande" error={errors.comment}>
        <textarea
          id="comment"
          placeholder="Si vous souhaitez préciser votre projet ..."
          value={data.comment}
          onChange={(e) => set("comment", e.target.value)}
          className="h-28 resize-none border border-tt-blue px-4 py-2 outline-none transition-colors focus:border-tt-orange"
        />
      </Field>

      <div className="flex items-start gap-2">
        <input
          id="partnersConsent"
          type="checkbox"
          checked={data.partnersConsent}
          onChange={(e) => set("partnersConsent", e.target.checked)}
          className="mt-1 cursor-pointer accent-tt-orange"
        />
        <label htmlFor="partnersConsent" className="cursor-pointer text-sm">
          Recevoir les offres de nos partenaires <sup>(1)</sup>
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          Votre demande n&apos;a pas pu être envoyée. Vérifiez les champs et réessayez.
        </p>
      )}

      <div className="mt-10 flex justify-end">
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex h-12 items-center justify-center bg-tt-orange px-8 text-xl font-bold text-white transition-colors duration-300 hover:bg-[#d94c0f] disabled:opacity-60"
        >
          {status === "sending" ? "Envoi…" : "Obtenir un devis gratuitement"}
        </button>
      </div>

      <p className="text-xs font-light text-tt-grey-medium">
        <sup>(1)</sup> {PARTNERS_NOTICE}
      </p>
    </form>
  );
}
