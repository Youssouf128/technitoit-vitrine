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
    <form onSubmit={onSubmit} role="search" className="relative flex h-12 items-center justify-between bg-white px-2 shadow-lg">
      <button type="submit" aria-label="Rechercher une agence" className="ml-4 text-tt-orange">
        <LocationIcon className="size-5" />
      </button>
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
          className="h-10 w-full bg-transparent outline-none placeholder:text-tt-grey-medium"
        />
      </div>
      {open && results.length > 0 && (
        <ul id={listId} role="listbox" className="absolute left-0 right-0 top-full z-20 mt-1 bg-white py-2 shadow-lg">
          {results.map((s, i) => (
            <li key={s.href} role="option" aria-selected={i === highlight}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(s)}
                onMouseEnter={() => setHighlight(i)}
                className={`block w-full px-6 py-2 text-left ${i === highlight ? "bg-tt-beige text-tt-orange" : ""}`}
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
