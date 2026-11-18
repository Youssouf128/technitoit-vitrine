"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ENERGY_SOLUTIONS, ENERGY_THEMES, type EnergyTheme } from "@/data/energie";

/** Solutions mises en avant (carte double largeur) quand aucun filtre n’est actif. */
const FEATURED = new Set(["/energie/pompe-a-chaleur-air-eau", "/energie/panneaux-solaires"]);
import { ArrowIcon } from "@/components/ui/icons";
import { THEME_ICONS } from "./themeIcons";

/** « texte **gras** texte » -> nœuds React. */
function RichText({ text }: Readonly<{ text: string }>) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-semibold text-tt-blue">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

const themeLabel = (id: EnergyTheme) => ENERGY_THEMES.find((t) => t.id === id)?.label ?? id;

export function EnergySolutions() {
  const [theme, setTheme] = useState<EnergyTheme | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const visible = theme ? ENERGY_SOLUTIONS.filter((s) => s.theme === theme) : ENERGY_SOLUTIONS;

  // Liens « #theme-xxx » (raccourcis du hero) : applique le filtre puis fait défiler jusqu’au catalogue
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace("#theme-", "") as EnergyTheme;
      if (!ENERGY_THEMES.some((t) => t.id === id)) return;
      setTheme(id);
      document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" });
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const tabs: { id: EnergyTheme | null; label: string; count: number }[] = [
    { id: null, label: "Toutes les solutions", count: ENERGY_SOLUTIONS.length },
    ...ENERGY_THEMES.map((t) => ({ ...t, count: ENERGY_SOLUTIONS.filter((s) => s.theme === t.id).length })),
  ];

  return (
    <div>
      <div className="-mx-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:mx-0 lg:px-0">
        <div role="toolbar" aria-label="Filtrer les solutions" className="flex w-max gap-2">
          {tabs.map((t) => {
            const active = t.id === theme;
            const Icon = t.id ? THEME_ICONS[t.id] : null;
            return (
              <button
                key={t.label}
                type="button"
                aria-pressed={active}
                onClick={() => setTheme(t.id)}
                className={`inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors ${
                  active
                    ? "border-tt-blue bg-tt-blue text-white"
                    : "border-tt-line bg-white text-tt-blue hover:border-tt-orange hover:text-tt-orange"
                }`}
              >
                {Icon && <Icon className="size-4" />}
                {t.label}
                <span
                  className={`grid min-w-6 place-items-center rounded-full px-1.5 text-xs ${
                    active ? "bg-white/15" : "bg-tt-stone text-tt-muted"
                  }`}
                >
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {visible.map((s) => {
          const Icon = THEME_ICONS[s.theme];
          const open = expanded === s.href;
          const featured = !theme && FEATURED.has(s.href);
          return (
            <li
              key={s.href}
              className={`group flex animate-fade-in flex-col overflow-hidden rounded-3xl border border-tt-line bg-white transition-shadow duration-300 hover:shadow-lift ${
                featured ? "lg:col-span-2 lg:flex-row" : ""
              }`}
            >
              <div className={`relative aspect-[16/10] overflow-hidden ${featured ? "lg:aspect-auto lg:w-1/2 lg:shrink-0" : ""}`}>
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes={featured ? "(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-tt-blue backdrop-blur">
                  <Icon className="size-3.5 text-tt-orange" />
                  {themeLabel(s.theme)}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 lg:p-7">
                {featured && <p className="eyebrow mb-3">Solution phare</p>}
                <h3 className={`font-extrabold leading-snug ${featured ? "text-2xl" : "text-xl"}`}>{s.title}</h3>
                <div
                  id={`sol-${s.href}`}
                  className={`mt-3 space-y-3 text-[15px] leading-relaxed text-tt-muted ${open ? "" : featured ? "line-clamp-6" : "line-clamp-4"}`}
                >
                  {s.text.map((p) => (
                    <p key={p.slice(0, 24)}>
                      <RichText text={p} />
                    </p>
                  ))}
                </div>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`sol-${s.href}`}
                  onClick={() => setExpanded(open ? null : s.href)}
                  className="mt-2 self-start text-sm font-semibold text-tt-blue underline decoration-tt-line underline-offset-4 hover:decoration-tt-orange"
                >
                  {open ? "Réduire" : "Lire la suite"}
                </button>

                <div className="mt-auto pt-6">
                  <Link
                    href={s.href}
                    className="flex items-center justify-between gap-3 border-t border-tt-line pt-5 font-bold text-tt-orange"
                  >
                    En savoir plus
                    <span className="grid size-10 place-items-center rounded-full bg-tt-orange-soft transition-colors group-hover:bg-tt-orange group-hover:text-white">
                      <ArrowIcon className="size-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
