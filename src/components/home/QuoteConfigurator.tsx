"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import {
  CATEGORIES,
  CONFIGURATOR_TEXTS as T,
  HOUSING,
  PROFILES,
  STEPS,
  isEmail,
  isPhone,
  isPositiveInt,
  isPostalCode,
  type QuoteRequest,
} from "@/data/configurator";

/* Écrans successifs du configurateur d'origine. */
type Screen =
  | { id: "housing"; step: 0 }
  | { id: "area"; step: 0 }
  | { id: "categories"; step: 1 }
  | { id: "products"; step: 1; categoryId: string }
  | { id: "profile"; step: 2 }
  | { id: "identity"; step: 2 }
  | { id: "postalCode"; step: 2 }
  | { id: "phone"; step: 2 }
  | { id: "email"; step: 2 }
  | { id: "done"; step: 3 };

const EMPTY: QuoteRequest = {
  housing: "",
  area: "",
  categories: [],
  products: {},
  profile: "",
  gender: "",
  firstName: "",
  lastName: "",
  postalCode: "",
  phone: "",
  email: "",
  partnersConsent: false,
};

const SELECTED_BORDER =
  "border-2 border-transparent [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(180deg,#FF5100,#F7A015)_border-box]";

function CheckCircle({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute right-3 top-3 flex size-7 items-center justify-center rounded-full border-2 border-[#FF5100] transition-colors ${
        checked ? "bg-[#FF5100]" : "bg-white"
      }`}
    >
      {checked && (
        <svg viewBox="0 0 24 24" className="size-4 text-white" fill="none">
          <path d="M5 12.5 10 17 19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

function Card({ label, icon, checked, onClick, multiple }: { label: string; icon: string; checked: boolean; onClick: () => void; multiple?: boolean }) {
  return (
    <button
      type="button"
      role={multiple ? "checkbox" : "radio"}
      aria-checked={checked}
      onClick={onClick}
      className={`relative flex min-h-[180px] w-full flex-col items-center justify-center gap-5 rounded-2xl px-4 pb-6 pt-10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift lg:min-h-[220px] ${
        checked ? `${SELECTED_BORDER} shadow-lift` : "border-2 border-tt-line bg-white shadow-soft"
      }`}
    >
      <CheckCircle checked={checked} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt="" className="size-20 lg:size-24" loading="lazy" />
      <span className="text-center font-bold leading-tight">{label}</span>
    </button>
  );
}

function CardGrid({ children, count }: { children: ReactNode; count: number }) {
  return (
    <div
      className={`grid w-full gap-[18px] ${count <= 2 ? "max-w-[430px] grid-cols-2" : "max-w-[654px] grid-cols-2 sm:grid-cols-3"}`}
    >
      {children}
    </div>
  );
}

const inputCls =
  "h-12 w-full rounded-xl border border-tt-beige-dark bg-white px-4 outline-none transition focus:border-tt-orange focus:ring-4 focus:ring-tt-orange/15";

export function QuoteConfigurator({ className = "" }: { className?: string }) {
  const [data, setData] = useState<QuoteRequest>(EMPTY);
  const [index, setIndex] = useState(0);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const screens: Screen[] = useMemo(
    () => [
      { id: "housing", step: 0 },
      { id: "area", step: 0 },
      { id: "categories", step: 1 },
      ...CATEGORIES.filter((c) => data.categories.includes(c.id)).map(
        (c) => ({ id: "products", step: 1, categoryId: c.id }) as const,
      ),
      { id: "profile", step: 2 },
      { id: "identity", step: 2 },
      { id: "postalCode", step: 2 },
      { id: "phone", step: 2 },
      { id: "email", step: 2 },
      { id: "done", step: 3 },
    ],
    [data.categories],
  );
  const screen = screens[Math.min(index, screens.length - 1)];
  const set = <K extends keyof QuoteRequest>(k: K, v: QuoteRequest[K]) => setData((d) => ({ ...d, [k]: v }));

  const go = (i: number) => {
    setError("");
    setIndex(Math.max(0, Math.min(i, screens.length - 1)));
    scrollRef.current?.scrollTo({ top: 0 });
  };
  const next = () => go(index + 1);

  const valid = (() => {
    switch (screen.id) {
      case "housing":
        return !!data.housing;
      case "area":
        return isPositiveInt(data.area);
      case "categories":
        return data.categories.length > 0;
      case "products":
        return (data.products[screen.categoryId] ?? []).length > 0;
      case "profile":
        return !!data.profile;
      case "identity":
        return !!data.gender && !!data.firstName.trim() && !!data.lastName.trim();
      case "postalCode":
        return isPostalCode(data.postalCode);
      case "phone":
        return isPhone(data.phone);
      case "email":
        return isEmail(data.email);
      default:
        return false;
    }
  })();

  async function submit() {
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; message?: string };
      if (!json.ok) {
        setError(json.message ?? "Votre demande n'a pas pu être envoyée.");
        return;
      }
      next();
    } catch {
      setError("Erreur réseau : merci de réessayer dans quelques instants.");
    } finally {
      setSending(false);
    }
  }

  function onContinue() {
    if (!valid || sending) return;
    if (screen.id === "email") void submit();
    else next();
  }

  const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  let question = "";
  let body: ReactNode = null;
  switch (screen.id) {
    case "housing":
      question = "Vos travaux concernent-ils une maison ou un appartement ?";
      body = (
        <CardGrid count={HOUSING.length}>
          {HOUSING.map((h) => (
            <Card
              key={h.value}
              label={h.label}
              icon={h.icon}
              checked={data.housing === h.value}
              onClick={() => {
                set("housing", h.value);
                next();
              }}
            />
          ))}
        </CardGrid>
      );
      break;
    case "area":
      question = "Quelle est la superficie de votre logement ?";
      body = (
        <div className="relative flex w-full max-w-2xl items-center">
          <input
            autoFocus
            inputMode="numeric"
            aria-label="Superficie en m²"
            value={data.area}
            onChange={(e) => set("area", e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => e.key === "Enter" && onContinue()}
            className={`${inputCls} pr-12`}
          />
          <span className="pointer-events-none absolute right-4">m²</span>
        </div>
      );
      break;
    case "categories":
      question = "Quels travaux souhaitez-vous réaliser ?";
      body = (
        <CardGrid count={CATEGORIES.length}>
          {CATEGORIES.map((c) => (
            <Card
              key={c.id}
              multiple
              label={c.label}
              icon={c.icon}
              checked={data.categories.includes(c.id)}
              onClick={() => set("categories", toggle(data.categories, c.id))}
            />
          ))}
        </CardGrid>
      );
      break;
    case "products": {
      const cat = CATEGORIES.find((c) => c.id === screen.categoryId)!;
      const chosen = data.products[cat.id] ?? [];
      question = cat.label;
      body = (
        <CardGrid count={cat.products.length}>
          {cat.products.map((p) => (
            <Card
              key={p.id}
              multiple
              label={p.label}
              icon={p.icon}
              checked={chosen.includes(p.id)}
              onClick={() => set("products", { ...data.products, [cat.id]: toggle(chosen, p.id) })}
            />
          ))}
        </CardGrid>
      );
      break;
    }
    case "profile":
      question = "Êtes vous propriétaire ou locataire ?";
      body = (
        <CardGrid count={PROFILES.length}>
          {PROFILES.map((p) => (
            <Card
              key={p.value}
              label={p.label}
              icon={p.icon}
              checked={data.profile === p.value}
              onClick={() => {
                set("profile", p.value);
                next();
              }}
            />
          ))}
        </CardGrid>
      );
      break;
    case "identity":
      question = "Comment vous appelez-vous ?";
      body = (
        <div className="flex w-full max-w-[576px] flex-col items-center gap-8">
          <div role="radiogroup" aria-label="Civilité" className="flex gap-[18px]">
            {(["madame", "monsieur"] as const).map((g) => (
              <button
                key={g}
                type="button"
                role="radio"
                aria-checked={data.gender === g}
                onClick={() => set("gender", g)}
                className={`h-14 w-40 rounded-xl font-bold sm:w-[190px] ${
                  data.gender === g ? `${SELECTED_BORDER} shadow-lift` : "border-2 border-tt-line bg-white shadow-soft"
                }`}
              >
                {g === "madame" ? "Madame" : "Monsieur"}
              </button>
            ))}
          </div>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 font-bold">
              Prénom
              <input autoComplete="given-name" value={data.firstName} onChange={(e) => set("firstName", e.target.value)} className={`${inputCls} font-normal`} />
            </label>
            <label className="flex flex-col gap-2 font-bold">
              Nom
              <input autoComplete="family-name" value={data.lastName} onChange={(e) => set("lastName", e.target.value)} onKeyDown={(e) => e.key === "Enter" && onContinue()} className={`${inputCls} font-normal`} />
            </label>
          </div>
        </div>
      );
      break;
    case "postalCode":
      question = "Quel est le code postal où seront réalisés les travaux ?";
      body = (
        <div className="w-full max-w-2xl">
          <input
            autoFocus
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            aria-label="Code postal"
            value={data.postalCode}
            onChange={(e) => set("postalCode", e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => e.key === "Enter" && onContinue()}
            className={inputCls}
          />
          {data.postalCode.length === 5 && !isPostalCode(data.postalCode) && (
            <p className="mt-2 text-sm text-red-600">{T.postalCodeError}</p>
          )}
        </div>
      );
      break;
    case "phone":
      question = "Quel est votre numéro de téléphone ?";
      body = (
        <div className="flex h-12 w-full max-w-2xl items-center overflow-hidden rounded-xl border border-tt-beige-dark bg-white transition focus-within:border-tt-orange focus-within:ring-4 focus-within:ring-tt-orange/15">
          <span className="flex h-full items-center gap-1.5 border-r border-tt-line bg-tt-stone px-3 text-sm font-semibold" aria-hidden>
            <span className="inline-block h-3 w-[18px] bg-[linear-gradient(90deg,#002395_33%,#fff_33%_66%,#ED2939_66%)]" />
            +33
          </span>
          <input
            autoFocus
            type="tel"
            autoComplete="tel"
            aria-label="Numéro de téléphone"
            placeholder="06 12 34 56 78"
            value={data.phone}
            onChange={(e) => set("phone", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onContinue()}
            className="h-full w-full px-4 outline-none"
          />
        </div>
      );
      break;
    case "email":
      question = "Quelle est votre adresse mail ?";
      body = (
        <div className="flex w-full max-w-2xl flex-col gap-4">
          <input
            autoFocus
            type="email"
            autoComplete="email"
            aria-label="Adresse email"
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onContinue()}
            className={inputCls}
          />
          <label className="flex cursor-pointer items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={data.partnersConsent}
              onChange={(e) => set("partnersConsent", e.target.checked)}
              className="mt-1 accent-tt-orange"
            />
            {T.consentLabel}
          </label>
          <p className="text-xs font-light">{T.consentTerms}</p>
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      );
      break;
    case "done":
      body = (
        <div className="flex flex-col items-center gap-4 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/configurator/confirmation.svg" alt="" className="size-36" />
          <p className="text-2xl font-bold">{T.endTitle}</p>
          <p className="font-light">{T.endSubtitle}</p>
        </div>
      );
      break;
  }

  const showBack = index > 0 && screen.id !== "done";

  return (
    <div
      className={`relative h-[704px] w-full max-w-screen-lg scroll-mt-32 overflow-hidden rounded-3xl border border-tt-line bg-white text-left shadow-lift lg:h-[512px] ${className}`}
      aria-label={T.title}
    >
      <div className="relative flex h-full w-full flex-col lg:flex-row">
        {/* Titre + étapes */}
        <div className="relative isolate flex shrink-0 flex-col overflow-hidden bg-tt-navy px-6 py-5 text-white lg:m-3 lg:w-72 lg:rounded-2xl lg:p-8">
          <div aria-hidden className="absolute -bottom-24 -left-24 -z-10 size-64 rounded-full bg-tt-orange/30 blur-3xl" />
          <p className="text-lg font-extrabold leading-tight lg:text-2xl">{T.title}</p>
          <ol className="mt-10 hidden flex-col gap-7 lg:flex">
            {STEPS.map((s, i) => {
              const active = i === screen.step;
              const done = i < screen.step;
              return (
                <li key={s.title} aria-current={active ? "step" : undefined} className="flex items-start gap-4">
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold transition-colors ${
                      active ? "bg-tt-orange text-white" : done ? "bg-white text-tt-orange" : "bg-white/10 text-white/50"
                    }`}
                  >
                    {done ? (
                      <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
                        <path d="M5 12.5 10 17 19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <div className={`flex flex-col transition-opacity ${active || done ? "" : "opacity-50"}`}>
                    <p className="font-bold">{s.title}</p>
                    <p className="text-xs text-white/60">{s.hint}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/15 lg:hidden" aria-hidden>
            <div className="h-full rounded-full bg-tt-orange transition-all duration-300" style={{ width: `${Math.min(100, ((screen.step + 1) / 3) * 100)}%` }} />
          </div>
        </div>

        {/* Contenu */}
        <div className="relative min-h-0 w-full flex-1">
          {showBack && (
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="absolute left-4 top-3 z-10 flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-tt-muted transition-colors hover:bg-tt-stone hover:text-tt-orange lg:left-8 lg:top-6"
            >
              <svg viewBox="0 0 24 12" className="h-3 w-6" fill="none" aria-hidden>
                <path d="M23 6H1m0 0 5-5M1 6l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {T.back}
            </button>
          )}
          <div ref={scrollRef} className="h-full overflow-y-auto pb-24 pt-14 lg:pb-24 lg:pt-20">
            <div key={index} className="flex min-h-full w-full animate-fade-in flex-col items-center px-4 lg:px-10">
              {screen.step < 3 && (
                <p className="mb-2 text-center text-xs font-bold tracking-[.18em] text-tt-orange lg:hidden">
                  {STEPS[screen.step].title.toUpperCase()}
                </p>
              )}
              {question && <p className="pb-6 text-center text-xl font-extrabold tracking-tight lg:text-2xl">{question}</p>}
              <div className={`flex w-full flex-1 flex-col items-center ${screen.id === "done" || screen.id.match(/^(area|postalCode|phone|email)$/) ? "justify-center" : ""}`}>
                {body}
              </div>
            </div>
          </div>
        </div>

        {screen.id !== "done" && (
          <button
            type="button"
            onClick={onContinue}
            disabled={!valid || sending}
            className={`absolute inset-x-4 bottom-4 z-20 flex h-13 shrink-0 rounded-full transition duration-300 lg:left-auto lg:right-6 lg:w-48 ${
              valid && !sending ? "bg-tt-orange shadow-glow hover:bg-tt-orange-dark" : "cursor-not-allowed bg-tt-grey-light"
            }`}
          >
            <span className="m-auto text-center text-base font-bold text-white">{sending ? "Envoi…" : T.continue}</span>
          </button>
        )}
      </div>
    </div>
  );
}
