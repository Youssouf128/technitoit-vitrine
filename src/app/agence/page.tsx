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
      <section className="py-16 lg:py-24">
        <div className="content-container grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="mb-4 text-2xl font-extrabold">Ville, département ou code postal</p>
            <div className="mb-14">
              <AgencySearch />
            </div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-tt-muted">Par région</p>
            <nav aria-label="Régions" className="flex flex-wrap gap-2">
              {REGIONS.map((r) => (
                <Link key={r.href} href={r.href} className="rounded-full border border-tt-line bg-white px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-tt-orange hover:bg-tt-orange hover:text-white">
                  {r.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="rounded-[2rem] bg-tt-stone p-8 lg:p-12">
            <FranceMap />
          </div>
        </div>
      </section>
    </>
  );
}
