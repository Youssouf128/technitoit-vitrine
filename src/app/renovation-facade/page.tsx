import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteSection } from "@/components/layout/QuoteSection";
import { BeforeAfterCarousel } from "@/components/home/BeforeAfterCarousel";
import { CenteredCta } from "@/components/landing/CenteredCta";
import { IntroSplit } from "@/components/landing/IntroSplit";
import { IssueGrid } from "@/components/landing/IssueGrid";
import { LandingHero } from "@/components/landing/LandingHero";
import { SectionHead } from "@/components/landing/SectionHead";
import { SectionNav } from "@/components/sections/SectionNav";
import { ShowcaseVideo } from "@/components/sections/ShowcaseVideo";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Accent, SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowIcon, AwardIcon, CheckIcon, EuroIcon } from "@/components/ui/icons";
import { FACADE_BEFORE_AFTER, FACADE_ISSUES, FACADE_SECTIONS, FACADE_VIDEOS } from "@/data/facade";
import { NAVIGATION, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: "Rénovation façade : Embellissez et protégez votre maison ! | Technitoit" },
  description:
    "Réparez fissures, dégradations et usure avec nos services de rénovation de façade. Améliorez l’isolation et l’esthétique de vos murs durablement !",
  alternates: { canonical: "/renovation-facade" },
};

const CRUMBS = [
  { label: "Accueil", href: "/" },
  { label: "Rénovation de façade", href: "/renovation-facade" },
];

const FACADE_LINKS = NAVIGATION.find((n) => n.href === "/renovation-facade")?.links.slice(0, 6) ?? [];

export default function RenovationFacadePage() {
  return (
    <>
      <LandingHero
        image="/images/pages/5a0c18b547-header_facade.jpeg"
        alt="Façade de maison rénovée"
        crumbs={CRUMBS}
        tag="Façade"
        title={
          <>
            Spécialiste de la <span className="text-tt-orange">rénovation façade.</span>
          </>
        }
        intro="L’entretien d’une façade de maison, quand cela est nécessaire, passe par la rénovation de la façade."
        primary={{ label: "Je souhaite refaire ma façade", short: "Refaire ma façade", href: "#configurator-anchor" }}
        secondary={{ label: "Trouver mon agence", href: "/agence" }}
        aside={{ title: "Nos prestations façade", links: FACADE_LINKS }}
      />

      <TrustStrip />

      <IntroSplit
        id="intro-title"
        eyebrow="Rénovation de façade"
        title={
          <>
            Une façade solide, <Accent>éclatante et protégée.</Accent>
          </>
        }
        bullets={["Nettoyage & démoussage", "Réparation des fissures", "Ravalement & mise en peinture", "Revêtement hydrofuge"]}
        cta={{ label: "Je souhaite refaire ma façade", href: "#configurator-anchor" }}
        className="pb-20 pt-20 lg:pb-24 lg:pt-24"
        media={
          <ShowcaseVideo
            landscape={FACADE_VIDEOS.landscape}
            portrait={FACADE_VIDEOS.portrait}
            poster="/images/prestation_facade.jpg"
            title="La rénovation de façade avec Technitoit"
          />
        }
      >
        <p>
          Qu’il s’agisse d’un projet esthétique ou structurel, Technitoit vous accompagne dans la{" "}
          <strong className="font-semibold text-tt-blue">rénovation complète de votre façade</strong> : nettoyage en
          profondeur, démoussage, traitement contre les micro-organismes, réparation des fissures,{" "}
          <strong className="font-semibold text-tt-blue">ravalement</strong> et{" "}
          <strong className="font-semibold text-tt-blue">mise en peinture</strong>, ou encore{" "}
          <strong className="font-semibold text-tt-blue">application d’un revêtement hydrofuge</strong> pour protéger
          durablement vos murs contre l’humidité et les intempéries.
        </p>
        <p>
          Avec <strong className="font-semibold text-tt-blue">Technitoit</strong>, votre façade retrouve toute sa solidité,
          son éclat et sa protection, grâce à des solutions durables et adaptées à chaque matériau.
        </p>
      </IntroSplit>

      <SectionNav items={FACADE_SECTIONS} />

      {/* Pourquoi rénover */}
      <section id="role" aria-labelledby="role-title" className="scroll-mt-36 bg-tt-stone py-24 lg:py-32">
        <div className="content-container">
          <SectionHead
            id="role-title"
            eyebrow="Rôle"
            title={
              <>
                Pourquoi rénover <Accent>ma façade ?</Accent>
              </>
            }
            aside="Mousse, humidité, enduit vieillissant ou salissures : identifiez votre situation et découvrez la solution Technitoit adaptée."
          />
          <IssueGrid items={FACADE_ISSUES} />
          <CenteredCta label="Demander mon étude gratuite" />
        </div>
      </section>

      {/* Avant / après */}
      <section id="avant_apres" aria-labelledby="ba-title" className="scroll-mt-36 py-24 lg:py-32">
        <div className="content-container grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          <div>
            <SectionTitle
              id="ba-title"
              eyebrow="Avant / après"
              title={
                <>
                  Rénovation de façade : <Accent>avant / après.</Accent>
                </>
              }
              description={
                <>
                  Technitoit a réalisé des milliers de chantiers de{" "}
                  <strong className="font-semibold text-tt-blue">rénovation de façades</strong> partout en France. Découvrez
                  les avant / après des chantiers.
                </>
              }
            />
            <p className="mt-6 text-sm text-tt-muted">Faites glisser le curseur sur l’image pour comparer.</p>
            <Link href="#configurator-anchor" className="btn-fill-orange group mt-10 inline-flex h-13 items-center gap-3 px-7">
              Je veux le même résultat
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="reveal">
            <BeforeAfterCarousel items={FACADE_BEFORE_AFTER} />
          </div>
        </div>
      </section>

      {/* Expertise + coût */}
      <section aria-label="Expertise et coût" className="bg-tt-stone py-24 lg:py-32">
        <div className="content-container grid gap-5 lg:grid-cols-2 lg:gap-6">
          <article
            id="expertise"
            aria-labelledby="expertise-title"
            className="relative isolate flex scroll-mt-36 flex-col overflow-hidden rounded-[2rem] bg-tt-navy p-8 text-white sm:p-10 lg:p-12"
          >
            <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-tt-orange/25 blur-[100px]" />
            <span className="grid size-13 place-items-center rounded-2xl bg-white/10 text-tt-orange">
              <AwardIcon className="size-6" />
            </span>
            <p className="eyebrow mt-8">Expertise</p>
            <h2 id="expertise-title" className="mt-3 text-3xl font-extrabold leading-tight lg:text-4xl">
              Pourquoi choisir Technitoit pour la rénovation de façade de maison ?
            </h2>
            <p className="mt-5 leading-relaxed text-white/70">
              Technitoit est une entreprise française, implantée en France depuis {SITE.foundingYear}. Un véritable réseau
              d’artisans avec plus de{" "}
              <Link href="/agence" className="font-semibold text-tt-orange-light hover:underline">
                {SITE.agencies} agences partout sur le territoire
              </Link>
              . Élue pour la cinquième année consécutive meilleure chaîne de magasins de l’année, l’entreprise met la qualité
              et la satisfaction client au cœur de son développement.
            </p>
            <p className="mt-4 leading-relaxed text-white/70">
              Confiez votre <strong className="font-semibold text-white">rénovation de façade</strong> à Technitoit pour
              profiter de son expertise et de la qualité de ses produits développés dans son propre laboratoire angevin (49).
            </p>
            <dl className="mb-8 mt-8 grid grid-cols-3 gap-3">
              {[
                { v: String(SITE.foundingYear), l: "année de création" },
                { v: `${SITE.agencies}+`, l: "agences" },
                { v: "5", l: "années consécutives élue" },
              ].map((s) => (
                <div key={s.l} className="flex flex-col-reverse justify-end rounded-2xl border border-white/10 bg-white/5 p-4">
                  <dt className="mt-1 text-xs text-white/60">{s.l}</dt>
                  <dd className="text-2xl font-extrabold sm:text-3xl">{s.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
              <Image
                src="/images/technitoit-meilleure-chaine-magasin-2026.png"
                alt="technitoit élu meilleure chaîne de magasins de l'année, catégorie renovation de l'habitat"
                width={200}
                height={200}
                className="size-16 rounded-xl"
              />
              <Link href="#configurator-anchor" className="btn-fill-orange group inline-flex h-12 items-center gap-3 px-6">
                Je fais appel à Technitoit
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>

          <article id="cout" aria-labelledby="cout-title" className="flex scroll-mt-36 flex-col rounded-[2rem] border border-tt-line bg-white p-8 sm:p-10 lg:p-12">
            <span className="grid size-13 place-items-center rounded-2xl bg-tt-orange text-white">
              <EuroIcon className="size-6" />
            </span>
            <p className="eyebrow mt-8">Coût</p>
            <h2 id="cout-title" className="mt-3 text-3xl font-extrabold leading-tight lg:text-4xl">
              Combien coûte une rénovation de façade ?
            </h2>
            <p className="mt-5 leading-relaxed text-tt-muted">
              <strong className="font-semibold text-tt-blue">La rénovation de façade</strong> se matérialise différemment en
              fonction des besoins et des maisons. Le prix dépendra alors :
            </p>
            <ul className="mt-6 grid gap-2.5">
              {["Des travaux réalisés", "De la surface (en m²) de la façade"].map((f) => (
                <li key={f} className="flex items-center gap-3 rounded-2xl bg-tt-stone px-4 py-3 font-medium">
                  <CheckIcon className="size-4 shrink-0 text-tt-orange" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-tt-muted">
              Des{" "}
              <Link href="/guides/aides-renovation" className="font-semibold text-tt-orange hover:underline">
                aides
              </Link>{" "}
              peuvent également exister pour financer en partie votre projet de{" "}
              <strong className="font-semibold text-tt-blue">rénovation de façade de maison</strong>.
            </p>
            <div className="mt-auto pt-8">
              <Link href="#configurator-anchor" className="btn-fill-orange group inline-flex h-13 items-center gap-3 px-7">
                Obtenir un devis gratuitement
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <QuoteSection />
    </>
  );
}
