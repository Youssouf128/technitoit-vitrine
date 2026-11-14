import Link from "next/link";
import { REGIONS } from "@/data/site";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AgencySearch } from "./AgencySearch";
import { FranceMap } from "./FranceMap";

export function Agencies() {
  return (
    <section aria-labelledby="agencies-title" className="block bg-tt-beige pb-40 pt-20">
      <div className="mx-auto max-w-screen-xl lg:px-8 2xl:max-w-screen-2xl">
        <div className="flex justify-center px-4 lg:px-0">
          <SectionTitle id="agencies-title" light="à votre écoute" bold="partout en France" inlineOnDesktop />
        </div>

        <div className="mt-6 flex gap-16 lg:mt-28 xl:gap-32">
          <div className="hidden flex-1 pt-8 lg:block">
            <FranceMap />
          </div>

          <div className="flex-1 px-4 lg:px-0">
            <p className="text-2xl font-light">
              Depuis 2002, Technitoit s&apos;est affirmé comme un acteur majeur de la rénovation en France. Fort de son réseau
              de 80 agences réparties sur l&apos;ensemble du territoire, Technitoit offre son expertise et ses services de
              qualité à une clientèle variée, répondant ainsi aux besoins de rénovation de chaque région.
            </p>

            <div className="relative mt-11">
              <label htmlFor="agency_search_input" className="block bg-tt-beige-medium py-6 pl-9 text-2xl font-bold">
                Trouvez l&apos;agence proche de chez vous :
              </label>
              <div className="absolute left-9 right-0 -translate-y-4">
                <AgencySearch />
              </div>
            </div>

            <nav aria-label="Régions" className="mt-20 grid grid-cols-2 gap-y-3 font-light lg:ml-9">
              {REGIONS.map((r) => (
                <Link key={r.href} href={r.href} className="transition-colors hover:text-tt-orange">
                  {r.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
