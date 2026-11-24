import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PhotoBackdrop } from "@/components/ui/PhotoBackdrop";
import { Breadcrumbs } from "@/components/layout/PageHero";
import { QuoteSection } from "@/components/layout/QuoteSection";
import { Accent, SectionTitle } from "@/components/ui/SectionTitle";
import { EnergySolutions } from "@/components/energie/EnergySolutions";
import { THEME_ICONS } from "@/components/energie/themeIcons";
import { SectionNav } from "@/components/sections/SectionNav";
import { ShowcaseVideo } from "@/components/sections/ShowcaseVideo";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ArrowIcon, CheckIcon, EuroIcon, LeafIcon, ShieldCheckIcon, SparkleIcon, SunIcon } from "@/components/ui/icons";
import { ENERGY_SOLUTIONS, ENERGY_THEMES, ENERGY_VIDEOS } from "@/data/energie";

export const metadata: Metadata = {
  title: { absolute: "Rénovation énergétique : Réduisez votre consommation & vos factures ! | Technitoit" },
  description:
    "Découvrez nos solutions de rénovation énergétique pour une maison plus économe et écologique : PAC, panneaux solaires, VMC… Optez pour une énergie durable !",
  alternates: { canonical: "/energie" },
};

const SECTIONS = [
  { id: "solutions", label: "Nos solutions" },
  { id: "benefices", label: "Bénéfices" },
  { id: "conseils", label: "Conseils" },
] as const;

const CRUMBS = [
  { label: "Accueil", href: "/" },
  { label: "Rénovation énergétique", href: "/energie" },
];

const BENEFITS = [
  {
    icon: SparkleIcon,
    title: "Confort thermique",
    text: "Pompes à chaleur, chaudières à condensation et chauffages à inertie assurent un confort thermique et réduisent les coûts énergétiques.",
  },
  {
    icon: LeafIcon,
    title: "Énergie propre",
    text: "Panneaux photovoltaïques et chauffe-eaux thermodynamiques permettent de consommer une énergie propre et renouvelable.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Air sain",
    text: "Les systèmes de ventilation (simple flux, double flux, insufflation) éliminent les polluants et l’humidité.",
  },
  {
    icon: EuroIcon,
    title: "Factures allégées",
    text: "Moins de dépendance aux sources d’énergie traditionnelles, c’est un foyer plus économe au quotidien.",
  },
];

export default function EnergiePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-tt-navy text-white">
        <Image
          src="/images/pages/bea1b31181-header_energie.jpg"
          alt="Maison équipée de panneaux solaires"
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-tt-navy/95 via-tt-navy/75 to-tt-navy/25" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-tt-navy to-transparent" />
        <div aria-hidden className="absolute -left-32 bottom-0 -z-10 size-[480px] rounded-full bg-tt-orange/25 blur-[140px]" />

        <div className="content-container grid items-end gap-12 pb-20 pt-32 lg:min-h-[min(88svh,840px)] lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16 lg:pb-24 lg:pt-40">
          <div className="animate-fade-in">
            <Breadcrumbs crumbs={CRUMBS} light />
            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-tt-orange px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em]">
              <SunIcon className="size-4" />
              Énergie
            </p>
            <h1 className="mt-6 max-w-3xl text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
              Réalisez des économies d’énergie <span className="text-tt-orange">avec Technitoit.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
              Technitoit vous accompagne dans la rénovation énergétique avec des solutions adaptées à votre logement pour
              réaliser des économies d’énergie.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#configurator-anchor" className="btn-fill-orange group inline-flex h-14 items-center justify-center gap-3 px-8">
                <span className="sm:hidden">J’ai un projet</span>
                <span className="hidden sm:inline">J’ai un projet de rénovation énergétique</span>
                <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#solutions"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 font-semibold backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/10"
              >
                Découvrir nos solutions
              </Link>
            </div>
          </div>

          {/* Raccourcis par thème */}
          <nav aria-label="Nos solutions par thème" className="rounded-3xl border border-white/15 bg-white/[0.08] p-3 backdrop-blur-xl lg:p-4">
            <p className="px-3 pb-3 pt-2 text-sm font-semibold text-white/70">
              {ENERGY_SOLUTIONS.length} solutions pour une maison plus économe
            </p>
            <ul className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">
              {ENERGY_THEMES.map((t) => {
                const Icon = THEME_ICONS[t.id];
                const items = ENERGY_SOLUTIONS.filter((s) => s.theme === t.id);
                return (
                  <li key={t.id}>
                    <a href={`#theme-${t.id}`} className="group flex items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-white/10 lg:gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-tt-orange/20 text-tt-orange-light transition-colors group-hover:bg-tt-orange group-hover:text-white">
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-bold leading-tight lg:text-base">{t.label}</span>
                        <span className="hidden text-sm text-white/55 lg:block">
                          {items.length} solution{items.length > 1 ? "s" : ""}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>

      <TrustStrip />

      {/* Introduction + vidéo */}
      <section aria-labelledby="intro-title" className="pb-20 pt-20 lg:pb-24 lg:pt-24">
        <div className="content-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle
              id="intro-title"
              eyebrow="Rénovation énergétique"
              title={
                <>
                  Une maison plus économe, <Accent>plus saine, plus confortable.</Accent>
                </>
              }
            />
            <p className="mt-6 text-lg leading-relaxed text-tt-muted">
              Avec l’installation de panneaux photovoltaïques, d’une pompe à chaleur, d’un ballon thermodynamique ou encore
              d’un chauffage à inertie, Technitoit vous guide dans tous vos projets de{" "}
              <strong className="font-semibold text-tt-blue">rénovation énergétique</strong>.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Étude de votre logement", "Solutions adaptées à vos besoins", "Installateurs certifiés RGE*", "Accompagnement sur les aides"].map(
                (p) => (
                  <li key={p} className="flex items-center gap-3 font-medium">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-tt-orange text-white">
                      <CheckIcon className="size-3.5" />
                    </span>
                    {p}
                  </li>
                ),
              )}
            </ul>
            <Link href="#configurator-anchor" className="btn-fill-orange group mt-10 inline-flex h-13 items-center gap-3 px-7">
              Être conseillé gratuitement
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="reveal">
            <ShowcaseVideo
              landscape={ENERGY_VIDEOS.landscape}
              portrait={ENERGY_VIDEOS.portrait}
              poster="/images/pages/19d1acdfda-panneaux_solaires.jpg"
              title="La rénovation énergétique avec Technitoit"
            />
          </div>
        </div>
      </section>

      <SectionNav items={SECTIONS} />

      {/* Solutions */}
      <section id="solutions" aria-labelledby="solutions-title" className="scroll-mt-36 bg-tt-stone py-24 lg:py-32">
        <div className="content-container">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionTitle
              id="solutions-title"
              eyebrow="Nos solutions"
              title={
                <>
                  Produire, chauffer, respirer : <Accent>la bonne solution pour chaque besoin.</Accent>
                </>
              }
            />
            <p className="max-w-sm text-tt-muted lg:text-right">
              Filtrez par thème et découvrez en détail chacune de nos solutions de rénovation énergétique.
            </p>
          </div>
          <EnergySolutions />
        </div>
      </section>

      {/* Bénéfices */}
      <section id="benefices" aria-labelledby="benefits-title" className="relative isolate scroll-mt-36 overflow-hidden bg-tt-navy py-24 text-white lg:py-32">
        <PhotoBackdrop src="/images/pages/19d1acdfda-panneaux_solaires.jpg" />
        <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[560px] rounded-full bg-tt-orange/15 blur-[150px]" />
        <div className="content-container">
          <SectionTitle
            id="benefits-title"
            tone="light"
            eyebrow="Les bénéfices"
            title={
              <>
                Un environnement plus confortable, sain <Accent>et économiquement avantageux.</Accent>
              </>
            }
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
            {BENEFITS.map((b) => (
              <li
                key={b.title}
                className="reveal group rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-tt-orange/50 hover:bg-white/[0.07]"
              >
                <span className="mb-10 grid size-13 place-items-center rounded-2xl bg-tt-orange/15 text-tt-orange transition-colors group-hover:bg-tt-orange group-hover:text-white">
                  <b.icon className="size-6" />
                </span>
                <h3 className="text-xl font-bold">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Conseils */}
      <section id="conseils" aria-labelledby="advice-title" className="scroll-mt-36 py-24 lg:py-32">
        <div className="content-container grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <SectionTitle
              id="advice-title"
              eyebrow="Nos conseils"
              title={
                <>
                  Comment faire des <Accent>économies d’énergie ?</Accent>
                </>
              }
            />
            <div className="mt-8 rounded-3xl bg-tt-navy p-7 text-white">
              <p className="text-lg font-bold">Vous ne savez pas vers quel appareil vous tourner ?</p>
              <p className="mt-2 text-sm text-white/65">
                Un expert Technitoit réalise une étude de votre maison et vous oriente vers les solutions les plus adaptées.
              </p>
              <Link
                href="#configurator-anchor"
                className="mt-6 flex h-12 items-center justify-center rounded-full bg-tt-orange font-bold text-white transition-colors hover:bg-tt-orange-dark"
              >
                Faire appel à un expert
              </Link>
              <Link
                href="/guides/aides-renovation"
                className="mt-3 flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 font-semibold transition-colors hover:bg-white/10"
              >
                <EuroIcon className="size-4" />
                Découvrir les aides financières
              </Link>
            </div>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-tt-muted [&_a]:font-semibold [&_a]:text-tt-orange [&_a:hover]:underline [&_strong]:font-semibold [&_strong]:text-tt-blue">
            <p>
              <strong>Technitoit</strong> aide à rénover énergétiquement les logements pour améliorer le confort de vie des
              foyers. L’installation de pompes à chaleur, de chaudières à condensation et de chauffages à inertie assure un
              confort thermique et réduit les coûts énergétiques. Les panneaux photovoltaïques et{" "}
              <Link href="/energie/chauffe-eau-thermodynamique">chauffe-eaux thermodynamiques</Link> permettent de{" "}
              <strong>consommer de l’énergie propre et renouvelable</strong>, diminuant ainsi la dépendance aux sources
              d’énergie traditionnelles.
            </p>
            <p>
              Les systèmes de <Link href="/foire-aux-questions">ventilation mécanique</Link> (simple flux, double-flux et
              insufflation) maintiennent une qualité de l’air saine en éliminant les polluants et l’humidité. Enfin, les
              adoucisseurs d’eau et <Link href="/energie/purificateur-dair">purificateurs d’air</Link> améliorent la santé et
              le bien-être en offrant une eau plus douce et un <strong>air plus pur.</strong>
            </p>
            <p>
              Avec Technitoit, votre environnement devient plus confortable, sain et économiquement avantageux. Vous ne savez
              pas vers quel appareil vous tourner ? Faites appel à un expert Technitoit pour réaliser une étude de votre
              maison et vous renseigner sur les solutions les plus adaptées. Réactifs et à votre écoute, les professionnels
              sont disponibles pour vous accompagner dans vos projets de <strong>rénovation énergétique</strong>.
            </p>
            <ul className="!mt-10 grid gap-3 sm:grid-cols-2">
              {ENERGY_SOLUTIONS.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-tt-line bg-white px-5 py-4 text-base !font-semibold !text-tt-blue transition-colors hover:border-tt-orange/40 hover:!no-underline hover:shadow-soft"
                  >
                    {s.label}
                    <ArrowIcon className="size-4 shrink-0 text-tt-orange transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <QuoteSection />
    </>
  );
}
