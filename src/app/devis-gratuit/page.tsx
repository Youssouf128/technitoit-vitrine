import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { QuoteConfigurator } from "@/components/home/QuoteConfigurator";

export const metadata: Metadata = {
  title: "Devis gratuit",
  description:
    "Demandez gratuitement votre devis de rénovation (toiture, façade, isolation, énergie) auprès de l'agence Technitoit la plus proche.",
  alternates: { canonical: "/devis-gratuit" },
};

export default function DevisPage() {
  return (
    <>
      <PageHero
        title="Devis gratuit"
        subtitle="Décrivez votre projet en 3 étapes : un conseiller de votre agence vous recontacte rapidement."
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "Devis gratuit", href: "/devis-gratuit" },
        ]}
      />
      <section className="bg-tt-grey-bg pb-24 pt-16">
        <div id="configurator-anchor" className="content-container flex scroll-mt-32 justify-center">
          <QuoteConfigurator />
        </div>
      </section>
    </>
  );
}
