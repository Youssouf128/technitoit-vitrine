import Link from "next/link";
import { REGIONS, SITE } from "@/data/site";
import { Accent, SectionTitle } from "@/components/ui/SectionTitle";
import { AgencySearch } from "./AgencySearch";
import { FranceMap } from "./FranceMap";

export function Agencies() {
  return (
    <section aria-labelledby="agencies-title" className="py-24 lg:py-32">
      <div className="content-container">
        <div className="grid items-center gap-12 overflow-hidden rounded-[2rem] bg-tt-stone p-6 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-16">
          <div>
            <SectionTitle
              id="agencies-title"
              eyebrow="Nos agences"
              title={
                <>
                  Un expert Technitoit <Accent>près de chez vous.</Accent>
                </>
              }
              description={`Depuis ${SITE.foundingYear}, notre réseau de ${SITE.agencies} agences accompagne les propriétaires dans toutes les régions de France, avec des équipes qui connaissent les spécificités de votre territoire.`}
            />

            <div className="mt-10">
              <label htmlFor="agency_search_input" className="mb-3 block text-sm font-bold">
                Trouvez l’agence la plus proche
              </label>
              <AgencySearch />
            </div>

            <nav aria-label="Régions" className="mt-10">
              <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-tt-muted">Par région</p>
              <ul className="flex flex-wrap gap-2">
                {REGIONS.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="inline-flex rounded-full border border-tt-line bg-white px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-tt-orange hover:bg-tt-orange hover:text-white"
                    >
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="hidden lg:block">
            <FranceMap />
          </div>
        </div>
      </div>
    </section>
  );
}
