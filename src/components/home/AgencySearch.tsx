"use client";

import { useRouter } from "next/navigation";
import { useId, useMemo, useState, type SubmitEvent } from "react";
import { departments } from "@/data/france-map";
import { DEPARTMENT_NAMES } from "@/data/departments";
import { LocationIcon } from "@/components/ui/icons";

type Suggestion = { label: string; href: string };

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "");

/** Barre « Ville ou code postal » avec suggestions de départements couverts. */
export function AgencySearch() {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const all: Suggestion[] = useMemo(
    () =>
      departments
        .filter((d) => d.href)
        .map((d) => ({ label: `${DEPARTMENT_NAMES[d.n] ?? d.n} (${d.n})`, href: d.href! }))
        .sort((a, b) => a.label.localeCompare(b.label, "fr")),
    [],
  );

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    const dep = /^\d{2,5}$/.test(q) ? q.slice(0, 2) : null;
    return all
      .filter((s) => (dep ? s.label.includes(`(${dep})`) : normalize(s.label).includes(q)))
      .slice(0, 6);
  }, [query, all]);

  function go(s?: Suggestion) {
    setOpen(false);
    if (s) router.push(s.href);
    else if (query.trim()) router.push(`/agence?q=${encodeURIComponent(query.trim())}`);
  }

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    go(results[highlight]);
  }

  return (
    <form onSubmit={onSubmit} role="search" className="relative flex h-14 items-center justify-between rounded-full border border-tt-line bg-white pl-2 pr-1.5 shadow-soft transition focus-within:border-tt-orange focus-within:ring-4 focus-within:ring-tt-orange/15">
      <LocationIcon aria-hidden className="ml-4 size-5 shrink-0 text-tt-orange" />
      <div className="relative mx-4 w-full">
        <input
          id="agency_search_input"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          value={query}
          placeholder="Ville ou code postal"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setHighlight(0);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setHighlight((h) => Math.min(h + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setHighlight((h) => Math.max(h - 1, 0));
            }
          }}
          className="h-10 w-full bg-transparent font-medium outline-none placeholder:font-normal placeholder:text-tt-grey-medium"
        />
      </div>
      <button
        type="submit"
        className="h-11 shrink-0 rounded-full bg-tt-blue px-5 text-sm font-bold text-white transition-colors hover:bg-tt-orange"
      >
        Rechercher
      </button>
      {open && results.length > 0 && (
        <ul id={listId} role="listbox" className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-tt-line bg-white py-2 shadow-lift">
          {results.map((s, i) => (
            <li key={s.href} role="option" aria-selected={i === highlight}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(s)}
                onMouseEnter={() => setHighlight(i)}
                className={`block w-full px-5 py-2.5 text-left font-medium ${i === highlight ? "bg-tt-orange-soft text-tt-orange" : ""}`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
