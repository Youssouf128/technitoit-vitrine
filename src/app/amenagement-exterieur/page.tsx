import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteSection } from "@/components/layout/QuoteSection";
import { Faq } from "@/components/landing/Faq";
import { IntroSplit } from "@/components/landing/IntroSplit";
import { IssueGrid } from "@/components/landing/IssueGrid";
import { LandingHero } from "@/components/landing/LandingHero";
import { SectionHead } from "@/components/landing/SectionHead";
import { SectionNav } from "@/components/sections/SectionNav";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { RichText } from "@/components/ui/RichText";
import { Accent, SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowIcon, CheckIcon, ShieldCheckIcon, SparkleIcon, SunIcon } from "@/components/ui/icons";
import {
  EXTERIEUR_BENEFITS,
  EXTERIEUR_COMPARISON,
  EXTERIEUR_FAQ,
  EXTERIEUR_FUNCTIONS,
  EXTERIEUR_FUNDING,
  EXTERIEUR_GUIDE,
  EXTERIEUR_SECTIONS,
  EXTERIEUR_SOLUTIONS,
  EXTERIEUR_STEPS,
} from "@/data/exterieur";

export const metadata: Metadata = {
  title: { absolute: "Aménagement extérieur photovoltaïque & bioclimatique | Technitoit" },
  description:
    "Auvent, pergola ou îlot photovoltaïque et bioclimatique : découvrez nos solutions d'aménagement extérieur sur mesure. Devis gratuit avec un expert Technitoit.",
  alternates: { canonical: "/amenagement-exterieur" },
};

const CRUMBS = [
  { label: "Accueil", href: "/" },
  { label: "Aménagement extérieur", href: "/amenagement-exterieur" },
];

const FUNCTION_ICONS = [ShieldCheckIcon, SparkleIcon, SunIcon];

export default function AmenagementExterieurPage() {
  return (
    <>
      <LandingHero
        image="/images/pages/67abc0718f-pergola-solaire-maiko-technitoit.png"
        alt="Une famille profite d'une journée ensoleillée sur une terrasse moderne équipée d'une pergola à panneaux solaires."
        crumbs={CRUMBS}
        tag="Extérieur"
        title={
          <>
            Aménagement extérieur : <span className="text-tt-orange">auvent, pergola et îlot.</span>
          </>
        }
        intro="Une terrasse en plein soleil devient vite invivable en été, et une facture d’électricité qui grimpe pèse sur le budget de la maison. Il existe une réponse plus durable."
        primary={{ label: "Je fais appel à un expert", href: "#configurator-anchor" }}
        secondary={{ label: "Trouver mon agence", href: "/agence" }}
        aside={{
          title: "Nos solutions d’aménagement",
          links: EXTERIEUR_SOLUTIONS.map((s) => ({ label: s.title.replace(/^(L’|Le |La )/, "").replace(/^./, (c) => c.toUpperCase()), href: s.href })),
        }}
      />

      <TrustStrip />

      <IntroSplit
        id="intro-title"
        eyebrow="Aménagement extérieur"
        title={
          <>
            Protéger, embellir <Accent>et produire de l’énergie.</Accent>
          </>
        }
        cta={{ label: "Je fais appel à un expert", href: "#configurator-anchor" }}
        className="pb-20 pt-20 lg:pb-24 lg:pt-24"
        media={
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
            <Image
              src="/images/pages/b607fb9969-pergola-bioclimatique-technitoit.png"
              alt="Pergola bioclimatique Technitoit"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </div>
        }
      >
        <p>
          Beaucoup de foyers renoncent à profiter de leur jardin faute d’ombre, ou installent un simple parasol qui ne résout
          rien.
        </p>
        <p>
          Il existe une réponse plus durable : des structures d’
          <strong className="font-semibold text-tt-blue">aménagement extérieur</strong> conçues pour protéger, embellir et
          produire de l’énergie. Auvent, pergola ou îlot photovoltaïque et bioclimatique : chez Technitoit, chaque solution
          répond à un besoin précis de confort, d’esthétique et d’économie.
        </p>
      </IntroSplit>

      <SectionNav items={EXTERIEUR_SECTIONS} />

      {/* Concept */}
      <section id="concept" aria-labelledby="concept-title" className="scroll-mt-36 bg-tt-stone py-24 lg:py-32">
        <div className="content-container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle
              id="concept-title"
              eyebrow="Smart Consuming"
              title={
                <>
                  Un aménagement extérieur <Accent>intelligent et économe en énergie.</Accent>
                </>
              }
              description="Un aménagement extérieur intelligent ne se limite plus à une simple couverture. Il associe trois fonctions :"
            />
            <ul className="mt-8 grid gap-3">
              {EXTERIEUR_FUNCTIONS.map((f, i) => {
                const Icon = FUNCTION_ICONS[i];
                return (
                  <li key={f.title} className="flex items-start gap-4 rounded-2xl border border-tt-line bg-white p-5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-tt-orange-soft text-tt-orange">
                      <Icon className="size-5" />
                    </span>
                    <p className="leading-relaxed text-tt-muted">
                      <strong className="block font-bold text-tt-blue">{f.title}</strong>
                      {f.text}
                    </p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 leading-relaxed text-tt-muted">
              C’est le principe du <strong className="font-semibold text-tt-blue">Smart Consuming</strong> : plutôt que
              d’opposer confort et sobriété, on choisit une solution qui rend l’un et l’autre compatibles. Une toiture qui
              ombrage votre terrasse peut aussi alimenter votre maison en électricité.
            </p>
            <Link href="#configurator-anchor" className="btn-fill-orange group mt-8 inline-flex h-13 items-center gap-3 px-7">
              Je veux réaliser des économies
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
            <Image src="/images/pages/1122309449-auvent-porte-entree.webp" alt="Auvent de porte d’entrée" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" aria-labelledby="solutions-title" className="scroll-mt-36 py-24 lg:py-32">
        <div className="content-container">
          <SectionHead
            id="solutions-title"
            eyebrow="Nos solutions"
            title={
              <>
                Quelles solutions Technitoit <Accent>pour valoriser votre extérieur ?</Accent>
              </>
            }
            aside="Chaque structure répond à un usage différent : produire de l’énergie sur un espace fixe, moduler l’ombre au fil de la journée, ou créer un vrai salon extérieur indépendant de la maison."
          />
          <IssueGrid items={EXTERIEUR_SOLUTIONS} badge="Solution" quote={false} ctaLabel="Découvrir" />
        </div>
      </section>

      {/* Comparatif */}
      <section id="comparatif" aria-labelledby="comparatif-title" className="scroll-mt-36 bg-tt-stone py-24 lg:py-32">
        <div className="content-container">
          <SectionHead
            id="comparatif-title"
            eyebrow="Comparatif"
            title={
              <>
                Quelle structure <Accent>pour quel usage ?</Accent>
              </>
            }
          />
          <div className="overflow-x-auto rounded-3xl border border-tt-line bg-white shadow-soft">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="bg-tt-navy text-sm text-white">
                  {EXTERIEUR_COMPARISON.head.map((h) => (
                    <th key={h} scope="col" className="px-6 py-4 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-tt-line">
                {EXTERIEUR_COMPARISON.rows.map(([name, fn, energy, place]) => (
                  <tr key={name} className="transition-colors hover:bg-tt-stone/60">
                    <th scope="row" className="px-6 py-5 font-bold">
                      {name}
                    </th>
                    <td className="px-6 py-5 text-tt-muted">{fn}</td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold ${
                          energy ? "bg-tt-orange-soft text-tt-orange" : "bg-tt-stone text-tt-muted"
                        }`}
                      >
                        {energy ? <SunIcon className="size-4" /> : null}
                        {energy ? "Oui" : "Non"}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-tt-muted">{place}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-16 text-2xl font-extrabold">Quelle solution correspond le mieux à votre terrasse ou votre jardin ?</h3>
          <ul className="mt-6 grid gap-4 lg:grid-cols-3">
            {EXTERIEUR_GUIDE.map((g) => (
              <li key={g.answer} className="flex flex-col rounded-3xl border border-tt-line bg-white p-6">
                <p className="leading-relaxed text-tt-muted">
                  <RichText text={g.need} />
                </p>
                <p className="mt-auto flex items-start gap-3 border-t border-tt-line pt-4 font-bold">
                  <ArrowIcon className="mt-1 size-4 shrink-0 text-tt-orange" />
                  <span>
                    <RichText text={g.answer} />
                  </span>
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-tt-muted">
            Déjà des centaines de projets réalisés par nos équipes certifiées RGE — garantie jusqu’à 10 ans, sans engagement.
          </p>
        </div>
      </section>

      {/* Avantages */}
      <section id="avantages" aria-labelledby="avantages-title" className="scroll-mt-36 py-24 lg:py-32">
        <div className="content-container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift lg:order-2">
            <Image src="/images/pages/92d8c9ee7b-amenagement-exterieur-technitoit.webp" alt="Aménagement extérieur Technitoit" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionTitle
              id="avantages-title"
              eyebrow="Avantages"
              title={
                <>
                  Quels bénéfices concrets <Accent>pour votre confort et votre budget ?</Accent>
                </>
              }
              description="Au-delà de l’esthétique, ces aménagements apportent des bénéfices mesurables :"
            />
            <ul className="mt-8 divide-y divide-tt-line border-y border-tt-line">
              {EXTERIEUR_BENEFITS.map((b) => (
                <li key={b.title} className="flex items-start gap-4 py-4">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-tt-orange text-white">
                    <CheckIcon className="size-3.5" />
                  </span>
                  <p className="text-tt-muted">
                    <strong className="font-bold text-tt-blue">{b.title}</strong> {b.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Étapes */}
      <section id="etapes" aria-labelledby="etapes-title" className="relative isolate scroll-mt-36 overflow-hidden bg-tt-navy py-24 text-white lg:py-32">
        <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[560px] rounded-full bg-tt-orange/20 blur-[150px]" />
        <div className="content-container">
          <SectionHead
            id="etapes-title"
            tone="light"
            eyebrow="Étapes"
            title={
              <>
                Comment se déroule votre projet <Accent>avec Technitoit ?</Accent>
              </>
            }
            aside="Vous n’êtes pas seul dans votre projet : on vous accompagne de A à Z, du premier échange à la mise en service de votre installation."
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {EXTERIEUR_STEPS.map((s, i) => (
              <li key={s.title} className="reveal rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-tt-orange/50">
                <span className="text-5xl font-extrabold text-tt-orange">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <Link href="#configurator-anchor" className="btn-fill-orange group inline-flex h-13 items-center gap-3 px-7">
              Obtenir un devis gratuitement
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Financement */}
      <section id="financement" aria-labelledby="financement-title" className="scroll-mt-36 py-24 lg:py-32">
        <div className="content-container">
          <div className="relative mb-12 aspect-[21/8] overflow-hidden rounded-[2rem]">
            <Image src="/images/pages/d0e01b77a5-installation-auvent-solaire.webp" alt="Installation d’un auvent solaire" fill sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover" />
          </div>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionTitle
                id="financement-title"
                eyebrow="Financement"
                title={
                  <>
                    Quelles aides existent encore <Accent>pour financer votre projet en 2026 ?</Accent>
                  </>
                }
              />
              <p className="mt-6 text-lg leading-relaxed text-tt-muted">
                Le paysage des aides au photovoltaïque a changé récemment. La prime à l’autoconsommation, qui pouvait atteindre
                plusieurs centaines d’euros selon la puissance installée, a été supprimée depuis le 5 juin 2026, suite à un
                nouvel arrêté tarifaire.
              </p>
            </div>
            <div>
              <p className="font-bold">Concrètement, en 2026 :</p>
              <ul className="mt-4 grid gap-3">
                {EXTERIEUR_FUNDING.map((f) => (
                  <li key={f} className="flex items-start gap-3 rounded-2xl bg-tt-stone p-4 text-tt-muted">
                    <CheckIcon className="mt-1 size-4 shrink-0 text-tt-orange" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-2xl border border-tt-orange/30 bg-tt-orange-soft p-5 leading-relaxed text-tt-muted">
                <strong className="font-bold text-tt-orange">Point de vigilance :</strong> méfiez-vous des promesses de
                financement intégral par l’État. La rentabilité d’un{" "}
                <Link href="/amenagement-exterieur/auvent-solaire" className="font-semibold text-tt-orange hover:underline">
                  auvent
                </Link>
                , d’une{" "}
                <Link href="/amenagement-exterieur/pergola-adossee" className="font-semibold text-tt-orange hover:underline">
                  pergola
                </Link>{" "}
                ou d’un îlot photovoltaïque repose avant tout sur les économies réalisées grâce à l’autoconsommation, pas sur une
                subvention ponctuelle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise + FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-36 bg-tt-stone py-24 lg:py-32">
        <div className="content-container grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <SectionTitle
              id="faq-title"
              eyebrow="FAQ"
              title={
                <>
                  Toutes vos <Accent>questions.</Accent>
                </>
              }
            />
            <div className="relative isolate mt-8 overflow-hidden rounded-3xl bg-tt-navy p-7 text-white">
              <div aria-hidden className="absolute -right-16 -top-16 -z-10 size-56 rounded-full bg-tt-orange/25 blur-3xl" />
              <p className="text-lg font-bold">Technitoit, votre expert de l’aménagement extérieur partout en France</p>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                Pourquoi confier vos <strong className="font-semibold text-white">travaux d’aménagement extérieur</strong> à un
                expert comme Technitoit ? Pour ses 20 années d’expérience, ses milliers de chantiers réalisés, ses clients
                satisfaits et sa passion incommensurable pour la rénovation de l’habitat.
              </p>
              <Link
                href="#configurator-anchor"
                className="mt-6 flex h-12 items-center justify-center rounded-full bg-tt-orange font-bold transition-colors hover:bg-tt-orange-dark"
              >
                Faire ma demande de devis
              </Link>
            </div>
          </div>
          <Faq items={EXTERIEUR_FAQ} />
        </div>
      </section>

      <QuoteSection />
    </>
  );
}
