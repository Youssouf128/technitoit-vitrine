import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { ArrowRight } from "@/components/ui/icons";
import { FOOTER_COLUMNS, NAVIGATION, REGIONS } from "@/data/site";
import { ARTICLES_META } from "@/data/articles";

export const metadata: Metadata = { title: "Recherche", robots: { index: false } };

type Props = { searchParams: Promise<{ q?: string }> };

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, " ");

const INDEX = [
  ...NAVIGATION.flatMap((c) => [
    { label: `Rénovation ${c.label}`, href: c.href, group: "Prestations" },
    ...c.links.map((l) => ({ label: l.label, href: l.href, group: "Prestations" })),
  ]),
  { label: "Aides financières à la rénovation", href: "/guides/aides-renovation", group: "Informations" },
  { label: "Panneaux photovoltaïques", href: "/energie/panneaux-solaires", group: "Prestations" },
  ...FOOTER_COLUMNS.flatMap((c) => c.links.map((l) => ({ label: l.label, href: l.href, group: "Informations" }))),
  ...REGIONS.map((r) => ({ label: r.label, href: r.href, group: "Régions" })),
  ...ARTICLES_META.map((a) => ({ label: a.title, href: `/actualites/${a.slug}`, group: "Actualités" })),
];

export default function SearchPage({ searchParams }: Props) {
  return (
    <Suspense
      fallback={
        <div className="content-container py-24 text-xl font-light" role="status">
          Recherche en cours…
        </div>
      }
    >
      <SearchResults searchParams={searchParams} />
    </Suspense>
  );
}

async function SearchResults({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const terms = normalize(q).split(/\s+/).filter(Boolean);
  const results = terms.length
    ? INDEX.filter((item) => terms.every((t) => normalize(item.label).includes(t)))
    : [];

  return (
    <>
      <PageHero
        title={q ? `Résultats pour « ${q} »` : "Recherche"}
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "Recherche", href: "/recherche" },
        ]}
      />
      <section className="content-container py-16">
        <form action="/recherche" className="mb-12 flex max-w-2xl gap-3">
          <label htmlFor="search-page-q" className="sr-only">
            Rechercher
          </label>
          <input
            id="search-page-q"
            name="q"
            defaultValue={q}
            placeholder="Que recherchez-vous ?"
            className="h-13 flex-1 border-b border-tt-blue text-xl outline-none"
          />
          <button type="submit" className="btn-fill-orange px-6 font-bold">
            Rechercher
          </button>
        </form>

        {q && (
          <p className="mb-6 font-light">
            {results.length} résultat{results.length > 1 ? "s" : ""}
          </p>
        )}
        {q && results.length === 0 && (
          <p className="text-xl font-light">
            Aucun résultat. Essayez un autre mot-clé ou{" "}
            <Link href="/devis-gratuit" className="font-bold text-tt-orange hover:underline">
              contactez-nous
            </Link>
            .
          </p>
        )}
        <ul className="divide-y divide-tt-grey-light">
          {results.map((r) => (
            <li key={r.href + r.label}>
              <Link href={r.href} className="group flex items-center justify-between gap-6 py-5">
                <span>
                  <span className="block text-xs tracking-[.25em] text-tt-orange">{r.group.toUpperCase()}</span>
                  <span className="text-xl font-bold group-hover:text-tt-orange">{r.label}</span>
                </span>
                <ArrowRight className="size-8 shrink-0 stroke-[4px] text-tt-orange transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
