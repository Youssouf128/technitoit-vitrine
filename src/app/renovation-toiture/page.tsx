import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/PageHero";
import { QuoteSection } from "@/components/layout/QuoteSection";
import { BeforeAfterSlider } from "@/components/home/BeforeAfterSlider";
import { SectionNav } from "@/components/sections/SectionNav";
import { ShowcaseVideo } from "@/components/sections/ShowcaseVideo";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { RichText } from "@/components/ui/RichText";
import { Accent, SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowIcon, AwardIcon, CheckIcon, EuroIcon, LocationIcon, ShieldCheckIcon } from "@/components/ui/icons";
import { SITE } from "@/data/site";
import {
  TOITURE_CAUSES,
  TOITURE_MATERIALS,
  TOITURE_PRESTATIONS,
  TOITURE_PRICE_FACTORS,
  TOITURE_SECTIONS,
  TOITURE_VIDEOS,
} from "@/data/toiture";

export const metadata: Metadata = {
  title: { absolute: "Spécialiste de la rénovation de toiture en France | Technitoit" },
  description:
    "Des traces d'usures ou de salissures sur votre toiture ? Contactez nos spécialistes Technitoit en rénovation de toiture. Devis gratuit.",
  alternates: { canonical: "/renovation-toiture" },
};

const CRUMBS = [
  { label: "Accueil", href: "/" },
  { label: "Rénovation de toiture", href: "/renovation-toiture" },
];

export default function RenovationToiturePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-tt-navy text-white">
        <Image
          src="/images/pages/ad2647fe98-expert-renovation-toiture.jpg"
          alt="Rénovation toiture sur une toiture en pente ardoise"
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-tt-navy/95 via-tt-navy/80 to-tt-navy/35" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-tt-navy to-transparent" />
        <div aria-hidden className="absolute -left-32 bottom-0 -z-10 size-[480px] rounded-full bg-tt-orange/25 blur-[140px]" />

        <div className="content-container grid items-end gap-12 pb-20 pt-32 lg:min-h-[min(88svh,840px)] lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16 lg:pb-24 lg:pt-40">
          <div className="animate-fade-in">
            <Breadcrumbs crumbs={CRUMBS} light />
            <p className="mt-8 inline-flex rounded-full bg-tt-orange px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em]">Toiture</p>
            <h1 className="mt-6 max-w-3xl text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
              Spécialiste de la <span className="text-tt-orange">rénovation de toiture.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
              Votre toiture montre des signes de fatigue ? Que ce soit pour améliorer l’isolation, prolonger la durée de vie
              de votre maison ou prévenir les infiltrations, la rénovation de toiture est une étape essentielle.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#configurator-anchor" className="btn-fill-orange group inline-flex h-14 items-center justify-center gap-3 px-8">
                Avoir un diagnostic gratuit
                <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/agence"
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-7 font-semibold backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/10"
              >
                <LocationIcon className="h-5" />
                <span className="sm:hidden">Trouver un couvreur</span>
                <span className="hidden sm:inline">Trouver un couvreur près de chez moi</span>
              </Link>
            </div>
          </div>

          <nav aria-label="Nos prestations toiture" className="rounded-3xl border border-white/15 bg-white/[0.12] p-3 backdrop-blur-3xl backdrop-saturate-150 lg:p-4">
            <p className="px-3 pb-2 pt-2 text-sm font-semibold text-white/70">Nos prestations toiture</p>
            <ul>
              {TOITURE_PRESTATIONS.map((p, i) => (
                <li key={p.href}>
                  <Link href={p.href} className="group flex items-center gap-4 rounded-2xl px-3 py-2.5 transition-colors hover:bg-white/10">
                    <span className="w-6 text-sm font-bold text-tt-orange-light">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 font-semibold">{p.label}</span>
                    <ArrowIcon className="size-4 -translate-x-1 opacity-50 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
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
              eyebrow="Rénovation de toiture"
              title={
                <>
                  Une toiture saine, <Accent>une maison protégée.</Accent>
                </>
              }
            />
            <p className="mt-6 text-lg leading-relaxed text-tt-muted">
              Chez Technitoit, nous vous accompagnons dans tous vos travaux de{" "}
              <strong className="font-semibold text-tt-blue">rénovation de toiture</strong> : nettoyage, démoussage,
              traitement hydrofuge ou réfection complète. Grâce à notre expertise nationale et nos solutions innovantes, vous
              bénéficiez d’une rénovation durable, efficace, et{" "}
              <Link href="/guides/aides-renovation" className="font-semibold text-tt-orange underline-offset-4 hover:underline">
                éligible aux aides financières
              </Link>
              .
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Diagnostic à domicile", "Couvreurs expérimentés", "Produits et procédés éprouvés", `${SITE.agencies} agences en France`].map((p) => (
                <li key={p} className="flex items-center gap-3 font-medium">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-tt-orange text-white">
                    <CheckIcon className="size-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Link href="#configurator-anchor" className="btn-fill-orange group mt-10 inline-flex h-13 items-center gap-3 px-7">
              J’ai besoin de conseils
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="reveal">
            <ShowcaseVideo
              landscape={TOITURE_VIDEOS.landscape}
              portrait={TOITURE_VIDEOS.portrait}
              poster="/images/prestation_toiture.jpg"
              title="La rénovation de toiture avec Technitoit"
            />
          </div>
        </div>
      </section>

      <SectionNav items={TOITURE_SECTIONS} />

      {/* Causes */}
      <section id="causes" aria-labelledby="causes-title" className="scroll-mt-36 bg-tt-stone py-24 lg:py-32">
        <div className="content-container">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
            <SectionTitle
              id="causes-title"
              eyebrow="Les causes"
              title={
                <>
                  Pourquoi rénover <Accent>ma toiture ?</Accent>
                </>
              }
            />
            <p className="max-w-md text-tt-muted lg:text-right">
              Vous remarquez des problèmes sur votre toiture ? Technitoit est le spécialiste en{" "}
              <strong className="font-semibold text-tt-blue">rénovation de toiture</strong> partout en France. Un expert se
              déplace à domicile pour vous conseiller au mieux sur <strong className="font-semibold text-tt-blue">les travaux de toiture</strong> à
              réaliser.
            </p>
          </div>

          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {TOITURE_CAUSES.map((c, i) => (
              <li
                key={c.href}
                className="reveal group relative flex flex-col overflow-hidden rounded-3xl border border-tt-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-tt-blue backdrop-blur">
                    Symptôme {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 lg:p-7">
                  <h3 className="text-xl font-extrabold leading-snug">« {c.title} »</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-tt-muted">
                    <RichText text={c.text} />
                  </p>
                  <div className="mt-auto pt-6">
                    <Link
                      href={c.href}
                      className="flex items-center justify-between gap-3 border-t border-tt-line pt-5 text-sm font-bold after:absolute after:inset-0 after:content-['']"
                    >
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-[.14em] text-tt-muted">Notre solution</span>
                        <span className="mt-0.5 block text-base text-tt-orange">{c.cta}</span>
                      </span>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-tt-orange-soft text-tt-orange transition-colors group-hover:bg-tt-orange group-hover:text-white">
                        <ArrowIcon className="size-4" />
                      </span>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex justify-center">
            <Link href="#configurator-anchor" className="btn-fill-orange group inline-flex h-13 items-center gap-3 px-7">
              Avoir un diagnostic gratuit de mon toit
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Prestations */}
      <section id="prestations" aria-labelledby="prestations-title" className="scroll-mt-36 py-24 lg:py-32">
        <div className="content-container grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <SectionTitle
              id="prestations-title"
              eyebrow="Nos prestations"
              title={
                <>
                  En quoi consiste la rénovation de toiture <Accent>avec Technitoit ?</Accent>
                </>
              }
            />
            <p className="mt-6 text-lg leading-relaxed text-tt-muted">
              Technitoit, grâce à son réseau d’artisans couvreurs experts en travaux de{" "}
              <strong className="font-semibold text-tt-blue">rénovation de toiture</strong>, peut vous proposer différentes
              prestations, répondant à toutes vos problématiques :
            </p>
            <ol className="mt-8 divide-y divide-tt-line border-y border-tt-line">
              {TOITURE_PRESTATIONS.map((p, i) => (
                <li key={p.href}>
                  <Link href={p.href} className="group flex items-center gap-5 py-4">
                    <span className="text-sm font-bold text-tt-orange">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 text-lg font-bold transition-colors group-hover:text-tt-orange">{p.label}</span>
                    <span className="grid size-9 place-items-center rounded-full bg-tt-stone text-tt-orange transition-colors group-hover:bg-tt-orange group-hover:text-white">
                      <ArrowIcon className="size-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <Link href="#configurator-anchor" className="btn-outline-orange mt-10 inline-flex h-13 items-center px-7">
              Demander conseil à un professionnel
            </Link>
          </div>

          <figure className="reveal">
            <div className="overflow-hidden rounded-3xl shadow-lift">
              <BeforeAfterSlider
                before="/images/avant-hydrofuge-toiture-technitoit.webp"
                after="/images/toiture-apres-hydrofuge-technitoit.webp"
                width={1104}
                height={732}
                label="Hydrofuge toiture"
              />
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-tt-muted">
              <span>
                <strong className="font-semibold text-tt-blue">Hydrofuge toiture</strong> : faites glisser le curseur pour
                comparer avant et après.
              </span>
              <Link href="/renovation-toiture/hydrofuge-toiture" className="shrink-0 font-bold text-tt-orange hover:underline">
                Découvrir
              </Link>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Types de couverture */}
      <section id="types_de_couverture" aria-labelledby="types-title" className="scroll-mt-36 bg-tt-stone py-24 lg:py-32">
        <div className="content-container">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
            <SectionTitle
              id="types-title"
              eyebrow="Types de couverture"
              title={
                <>
                  La rénovation de toiture <Accent>par types de matériaux.</Accent>
                </>
              }
            />
            <p className="max-w-md text-tt-muted lg:text-right">
              Technitoit intervient pour vos <strong className="font-semibold text-tt-blue">travaux de rénovation de toiture</strong>{" "}
              sur différents types de toiture : tuile, ardoise, ardoise fibrociment.
            </p>
          </div>

          <ul className="grid gap-5 lg:grid-cols-3 lg:gap-6">
            {TOITURE_MATERIALS.map((m) => (
              <li key={m.title} className="reveal flex flex-col overflow-hidden rounded-3xl border border-tt-line bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={m.image} alt={m.alt} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-tt-navy/70 via-transparent to-transparent" />
                  <span className="absolute bottom-5 left-6 text-3xl font-extrabold text-white">{m.tag}</span>
                </div>
                <div className="flex flex-1 flex-col p-6 lg:p-7">
                  <h3 className="text-xl font-extrabold">{m.title}</h3>
                  <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-tt-muted">
                    {m.paragraphs.map((p, i) => (
                      <p key={i}>
                        <RichText text={p} />
                      </p>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex justify-center">
            <Link href="#configurator-anchor" className="btn-fill-orange group inline-flex h-13 items-center gap-3 px-7">
              Obtenir un diagnostic toiture gratuit
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Coût + expertise */}
      <section aria-label="Coût et expertise" className="py-24 lg:py-32">
        <div className="content-container grid gap-5 lg:grid-cols-2 lg:gap-6">
          <article id="cout" aria-labelledby="cout-title" className="scroll-mt-36 rounded-[2rem] border border-tt-line bg-tt-stone p-8 sm:p-10 lg:p-12">
            <span className="grid size-13 place-items-center rounded-2xl bg-tt-orange text-white">
              <EuroIcon className="size-6" />
            </span>
            <p className="eyebrow mt-8">Le coût</p>
            <h2 id="cout-title" className="mt-3 text-3xl font-extrabold leading-tight lg:text-4xl">
              La rénovation de votre toit : à quel prix ?
            </h2>
            <p className="mt-5 leading-relaxed text-tt-muted">
              La <strong className="font-semibold text-tt-blue">rénovation de la toiture</strong> peut représenter un certain
              coût selon la prestation choisie. Le prix des travaux dépendra de plusieurs facteurs :
            </p>
            <ul className="mt-6 grid gap-2.5">
              {TOITURE_PRICE_FACTORS.map((f) => (
                <li key={f} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 font-medium">
                  <CheckIcon className="size-4 shrink-0 text-tt-orange" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-tt-muted">
              Des <strong className="font-semibold text-tt-blue">aides à la rénovation de toiture par l’ANAH</strong> peuvent
              être disponibles en fonction des travaux effectués (uniquement sur la partie isolation) et de vos revenus.
              Contactez directement un conseiller Technitoit pour en savoir plus sur le{" "}
              <strong className="font-semibold text-tt-blue">prix au m2 pour votre rénovation de toiture</strong> et les aides
              disponibles.
            </p>
            <Link href="/devis-gratuit" className="btn-fill-orange group mt-8 inline-flex h-13 items-center gap-3 px-7">
              Demander un devis
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </article>

          <article
            id="expertise"
            aria-labelledby="expertise-title"
            className="relative isolate flex scroll-mt-36 flex-col overflow-hidden rounded-[2rem] bg-tt-navy p-8 text-white sm:p-10 lg:p-12"
          >
            <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-tt-orange/25 blur-[100px]" />
            <span className="grid size-13 place-items-center rounded-2xl bg-white/10 text-tt-orange">
              <AwardIcon className="size-6" />
            </span>
            <p className="eyebrow mt-8">Notre expertise</p>
            <h2 id="expertise-title" className="mt-3 text-3xl font-extrabold leading-tight lg:text-4xl">
              Pourquoi choisir l’entreprise de rénovation de toiture Technitoit ?
            </h2>
            <p className="mt-5 leading-relaxed text-white/70">
              Confiez la <strong className="font-semibold text-white">rénovation de toiture</strong> à Technitoit, entreprise
              française élue meilleure chaîne de magasin 2026 (catégorie Bâtiment et Habitat). Technitoit a remporté le prix en
              2023, 2024 et 2025. Une équipe de couvreurs expérimentés à proximité de chez vous grâce aux {SITE.agencies} agences
              réparties sur tout le territoire.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-3">
              {[
                { v: "4×", l: "primée de 2023 à 2026" },
                { v: String(SITE.agencies), l: "agences" },
                { v: "+20", l: "ans d’expertise" },
              ].map((s) => (
                <div key={s.l} className="flex flex-col-reverse justify-end rounded-2xl border border-white/10 bg-white/5 p-4">
                  <dt className="mt-1 text-xs text-white/60">{s.l}</dt>
                  <dd className="text-3xl font-extrabold">{s.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mb-8 mt-8 leading-relaxed text-white/70">
              Réalisez votre demande de devis gratuitement auprès de votre{" "}
              <strong className="font-semibold text-white">entreprise de rénovation de toiture</strong>, en ligne ou en agence,
              c’est rapide et sans engagement avec nos experts couvreurs.
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
              <Image
                src="/images/technitoit-meilleure-chaine-magasin-2026.png"
                alt="technitoit élu meilleure chaîne de magasins de l'année, catégorie renovation de l'habitat"
                width={200}
                height={200}
                className="size-16 rounded-xl"
              />
              <Image
                src="/images/technitoit-meilleure-franchise-2026.png"
                alt="technitoit élu meilleure franchise de l'année, catégorie renovation de l'habitat"
                width={200}
                height={200}
                className="size-16 rounded-xl"
              />
              <span className="flex items-center gap-2 text-sm text-white/70">
                <ShieldCheckIcon className="size-5 shrink-0 text-tt-orange" />
                Installateurs sélectionnés certifiés RGE*
              </span>
            </div>
          </article>
        </div>
      </section>

      <QuoteSection />
    </>
  );
}
