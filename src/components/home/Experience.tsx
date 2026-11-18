import Link from "next/link";
import { Accent, SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowIcon, CheckIcon } from "@/components/ui/icons";
import { BeforeAfterCarousel } from "./BeforeAfterCarousel";

const POINTS = [
  "Des produits exclusifs, développés pour durer",
  "Des équipes formées aux techniques de chaque matériau",
  "Un chantier propre, suivi de bout en bout",
];

export function Experience() {
  return (
    <section aria-labelledby="experience-title" className="bg-tt-stone py-24 lg:py-32">
      <div className="content-container grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <SectionTitle
            id="experience-title"
            eyebrow="Nos réalisations"
            title={
              <>
                Des résultats qui se voient <Accent>au premier coup d’œil.</Accent>
              </>
            }
            description="Depuis plus de 20 ans, Technitoit met son savoir-faire au service de votre confort et de la valeur de votre patrimoine. Faites glisser le curseur pour comparer avant et après travaux."
          />
          <ul className="mt-8 space-y-3.5">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 font-medium">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-tt-orange text-white">
                  <CheckIcon className="size-3.5" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Link
            href="/devis-gratuit"
            className="btn-fill-orange group mt-10 inline-flex h-13 items-center gap-3 px-7"
          >
            Je veux le même résultat
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="reveal">
          <BeforeAfterCarousel />
        </div>
      </div>
    </section>
  );
}
