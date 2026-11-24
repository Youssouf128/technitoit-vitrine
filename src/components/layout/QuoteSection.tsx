import Image from "next/image";
import { QuoteConfigurator } from "@/components/home/QuoteConfigurator";
import { Accent, SectionTitle } from "@/components/ui/SectionTitle";
import { EuroIcon, ShieldCheckIcon, SparkleIcon } from "@/components/ui/icons";

const REASSURANCE = [
  { icon: SparkleIcon, label: "100 % gratuit et sans engagement" },
  { icon: ShieldCheckIcon, label: "Vos données restent confidentielles" },
  { icon: EuroIcon, label: "Conseils sur les aides financières" },
];

/** Bloc « devis gratuit » réutilisable (accueil et pages internes). */
export function QuoteSection() {
  return (
    <section aria-labelledby="quote-title" className="relative isolate overflow-hidden bg-tt-stone py-24 lg:py-32">
      <div aria-hidden className="absolute -left-40 top-0 -z-10 h-80 w-[700px] rounded-full bg-tt-orange/10 blur-[120px]" />
      <div className="content-container flex flex-col">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionTitle
            id="quote-title"
            eyebrow="Devis gratuit"
            title={
              <>
                Estimez votre projet <Accent>en quelques clics.</Accent>
              </>
            }
          />
          <p className="max-w-md text-tt-muted lg:text-right">
            Répondez à quelques questions : un conseiller de l’agence la plus proche vous recontacte pour affiner votre
            besoin et vous remettre un devis détaillé.
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          {REASSURANCE.map((r) => (
            <li key={r.label} className="flex items-center gap-2">
              <r.icon className="size-5 text-tt-orange" />
              {r.label}
            </li>
          ))}
        </ul>

        <div id="configurator-anchor" className="mt-12 w-full scroll-mt-32">
          <QuoteConfigurator className="max-w-none!" />
        </div>

        <a
          href="https://france-renov.gouv.fr/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 block w-fit overflow-hidden rounded-2xl border border-tt-line bg-white p-2 shadow-soft transition-shadow hover:shadow-lift"
        >
          <Image
            src="/images/bandeau_france_renov__website_700x150px.png"
            alt="Avant de vous engager, le service public vous informe gratuitement pour préparer et sécuriser votre projet : france-renov.gouv.fr"
            width={701}
            height={151}
            className="h-auto w-full max-w-[520px]"
          />
        </a>
      </div>
    </section>
  );
}
