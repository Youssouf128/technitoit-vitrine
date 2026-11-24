import Link from "next/link";
import { PhotoBackdrop } from "@/components/ui/PhotoBackdrop";
import { Accent, SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowIcon, ClipboardIcon, HomeSearchIcon, ShieldCheckIcon, ToolsIcon } from "@/components/ui/icons";

const STEPS = [
  {
    icon: ClipboardIcon,
    title: "Vous décrivez votre projet",
    text: "En ligne en quelques clics ou en agence : quelques questions suffisent pour cerner vos besoins.",
  },
  {
    icon: HomeSearchIcon,
    title: "Diagnostic à domicile",
    text: "Un conseiller de votre agence se déplace, analyse l’existant et vous remet un devis détaillé gratuit.",
  },
  {
    icon: ToolsIcon,
    title: "Réalisation des travaux",
    text: "Nos équipes et installateurs certifiés RGE interviennent selon un planning convenu ensemble.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Suivi & service après-vente",
    text: "Réception du chantier, conseils d’entretien et un SAV dédié pour une tranquillité durable.",
  },
];

export function Process() {
  return (
    <section aria-labelledby="process-title" className="relative isolate overflow-hidden bg-tt-navy py-24 text-white lg:py-32">
      <PhotoBackdrop src="/images/pages/a2c5611d03-facade_chantier_hydrofuge_facade.jpg" />
      <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[560px] rounded-full bg-tt-orange/15 blur-[150px]" />

      <div className="content-container">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle
            id="process-title"
            tone="light"
            eyebrow="Comment ça marche"
            title={
              <>
                Votre projet en 4 étapes, <Accent>sans mauvaise surprise.</Accent>
              </>
            }
          />
          <Link
            href="/devis-gratuit"
            className="btn-fill-orange group inline-flex h-13 shrink-0 items-center gap-3 self-start px-7 lg:self-auto"
          >
            Démarrer mon projet
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-5">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="reveal group relative rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-tt-orange/50 hover:bg-white/[0.07]"
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="grid size-13 place-items-center rounded-2xl bg-tt-orange/15 text-tt-orange transition-colors group-hover:bg-tt-orange group-hover:text-white">
                  <s.icon className="size-6" />
                </span>
                <span className="text-5xl font-extrabold text-white/10">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
