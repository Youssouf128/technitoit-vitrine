import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { AgencySearch } from "@/components/home/AgencySearch";
import { FranceMap } from "@/components/home/FranceMap";
import { REGIONS, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Nos agences",
  description: `Trouvez l'une des ${SITE.agencies} agences Technitoit proche de chez vous pour vos travaux de rénovation.`,
  alternates: { canonical: "/agence" },
};

export default function AgencesPage() {
  return (
    <>
      <PageHero
        title="Trouver mon agence"
        subtitle={`${SITE.agencies} agences Technitoit à votre écoute partout en France.`}
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "Nos agences", href: "/agence" },
        ]}
      />
      <section className="bg-tt-beige py-16 lg:py-24">
        <div className="content-container grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="mb-6 text-2xl font-bold">Ville, département ou code postal :</p>
            <div className="mb-14">
              <AgencySearch />
            </div>
            <p className="mb-4 text-sm tracking-[.25em] text-tt-orange">PAR RÉGION</p>
            <nav aria-label="Régions" className="grid grid-cols-2 gap-y-3 font-light">
              {REGIONS.map((r) => (
                <Link key={r.href} href={r.href} className="hover:text-tt-orange">
                  {r.label}
                </Link>
              ))}
            </nav>
          </div>
          <FranceMap />
        </div>
      </section>
    </>
  );
}
