"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ArticleMeta } from "@/lib/articles-types";
import { ArticleCard } from "./ArticleCard";

const PER_PAGE = 9;

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

type Props = { articles: ArticleMeta[]; tags: readonly string[] };

export function ArticlesList({ articles, tags }: Props) {
  const params = useSearchParams();
  const activeTag = params.get("tag");
  const page = Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1);

  const tabs = [{ label: "Toutes les actualités", value: null as string | null }, ...tags.map((t) => ({ label: t, value: slugify(t) }))];
  const filtered = activeTag ? articles.filter((a) => a.tags.some((t) => slugify(t) === activeTag)) : articles;
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const href = (tag: string | null, p = 1) => {
    const q = new URLSearchParams();
    if (tag) q.set("tag", tag);
    if (p > 1) q.set("page", String(p));
    const s = q.toString();
    return `/actualites${s ? `?${s}` : ""}`;
  };

  return (
    <div className="content-container pb-16">
      <div className="mb-12 overflow-x-auto overflow-y-hidden pb-1 [scrollbar-width:none]">
        <ul className="flex w-max gap-2">
          {tabs.map((t) => {
            const active = (t.value ?? null) === (activeTag ?? null);
            return (
              <li key={t.label}>
                <Link
                  href={href(t.value)}
                  scroll={false}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                    active ? "border-tt-blue bg-tt-blue text-white" : "border-tt-line hover:border-tt-orange hover:text-tt-orange"
                  }`}
                >
                  {t.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {visible.length ? (
        <ul className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {visible.map((a, i) => (
            <li key={a.slug}>
              <ArticleCard article={a} eager={i < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-16 text-xl font-light">Aucune actualité trouvée</p>
      )}

      {pages > 1 && (
        <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
          {current > 1 && (
            <Link href={href(activeTag, current - 1)} className="px-3 py-2 hover:text-tt-orange" aria-label="Page précédente">
              ‹
            </Link>
          )}
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={href(activeTag, p)}
              aria-current={p === current ? "page" : undefined}
              className={`flex size-10 items-center justify-center rounded-full border font-semibold transition-colors ${
                p === current ? "border-tt-orange bg-tt-orange text-white" : "border-tt-grey-light hover:border-tt-orange hover:text-tt-orange"
              }`}
            >
              {p}
            </Link>
          ))}
          {current < pages && (
            <Link href={href(activeTag, current + 1)} className="px-3 py-2 hover:text-tt-orange" aria-label="Page suivante">
              ›
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
