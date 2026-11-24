import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteSection } from "@/components/layout/QuoteSection";
import { CenteredCta } from "@/components/landing/CenteredCta";
import { IntroSplit } from "@/components/landing/IntroSplit";
import { LandingHero } from "@/components/landing/LandingHero";
import { SectionHead } from "@/components/landing/SectionHead";
import { SectionNav } from "@/components/sections/SectionNav";
import { ShowcaseVideo } from "@/components/sections/ShowcaseVideo";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { RichText } from "@/components/ui/RichText";
import { Accent, SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowIcon, AwardIcon, CheckIcon, EuroIcon, HomeSearchIcon } from "@/components/ui/icons";
import { NAVIGATION } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: "Isolation : Dites oui aux économies d’énergie ! | Technitoit" },
  description:
    "Améliorez votre confort thermique et réduisez vos factures grâce à une isolation performante ! Découvrez nos solutions adaptées à votre habitat.",
  alternates: { canonical: "/isolation" },
};

const CRUMBS = [
  { label: "Accueil", href: "/" },
  { label: "Isolation thermique", href: "/isolation" },
];

const SECTIONS = [
  { id: "role", label: "Pourquoi isoler" },
  { id: "types", label: "Types d’isolation" },
  { id: "isolant", label: "Isolant Technitoit" },
  { id: "cout", label: "Coût" },
  { id: "financement", label: "Financement" },
  { id: "expertise", label: "Expertise" },
] as const;

const VIDEOS = {
  landscape: "https://a.storyblok.com/f/284071/x/5d7fabc46b/isolation_video_landscape.mp4",
  portrait: "https://a.storyblok.com/f/284071/x/d67b470b48/isolation_video_portrait.mp4",
};

const HEAT_LOSS_ZONES = ["La toiture", "Les murs", "Les fenêtres", "Les sous-sols", "Le vide sanitaire"];

const TYPES = [
  {
    title: "L’isolation des combles",
    text: "La toiture est souvent l’une des plus grandes sources de déperdition de chaleur dans une maison. L’isolation des combles, qu’ils soient [perdus](/isolation/combles/perdus) ou [aménageables](/isolation/combles/amenageable), est importante pour faire des économies et pour un meilleur confort thermique.",
    href: "/isolation/combles",
  },
  {
    title: "L’isolation thermique extérieure",
    text: "L’isolation par l’extérieur ([ITE](/actualites/pourquoi-l-ite-est-une-excellente-solution-d-isolation-thermique)) permet de lutter contre les déperditions de chaleur par les murs, sans perdre de la place à l’intérieur de votre maison. Une solution efficace qui vous permet en même temps de redonner une seconde jeunesse à votre façade.",
    href: "/isolation/isolation-thermique-exterieure",
  },
  {
    title: "L’isolation thermique intérieure",
    text: "L’isolation thermique intérieure ([ITI](/isolation/isolation-thermique-interieure)) est la plus répandue. Une solution économique pour lutter contre les pertes de chaleur provenant des murs de votre maison.",
    href: "/isolation/isolation-thermique-interieure",
  },
  {
    title: "L’isolation des sous-sols et vide sanitaire",
    text: "Pour lutter contre les déperditions par le sol, Technitoit réalise également l’isolation des [sous-sols](/isolation/isolation-sous-sol) et du [vide sanitaire](/isolation/isolation-sous-sol) grâce notamment à des panneaux isolants.",
    href: "/isolation/isolation-sous-sol",
  },
];

const MRWOOL_PROPS = ["Confort thermique", "Confort acoustique", "Résistant au vent", "Résistant à l’eau", "Résistant au feu", "Ne se tasse pas"];

const ISOLATION_LINKS = NAVIGATION.find((n) => n.href === "/isolation")?.links ?? [];

export default function IsolationPage() {
  return (
    <>
      <LandingHero
        image="/images/pages/933e9c25ec-header_isolation.jpeg"
        alt="Isolation thermique d’une maison"
        crumbs={CRUMBS}
        tag="Isolation"
        title={
          <>
            Spécialiste de l’<span className="text-tt-orange">isolation thermique.</span>
          </>
        }
        intro="L’isolation thermique de votre maison est essentielle pour garantir un confort optimal tout en réduisant vos dépenses énergétiques."
        primary={{ label: "Je fais appel à un expert de l’isolation", short: "Faire appel à un expert", href: "#configurator-anchor" }}
        secondary={{ label: "Trouver mon agence", href: "/agence" }}
        aside={{ title: "Nos solutions d’isolation", links: ISOLATION_LINKS }}
      />

      <TrustStrip />

      <IntroSplit
        id="intro-title"
        eyebrow="Isolation thermique"
        title={
          <>
            Un confort optimal, <Accent>été comme hiver.</Accent>
          </>
        }
        bullets={["Étude thermique de votre maison", "Combles, murs, sols", "Isolant Mr.Wool exclusif", "Accompagnement sur les aides"]}
        cta={{ label: "Je fais appel à un expert de l’isolation", href: "#configurator-anchor" }}
        className="pb-20 pt-20 lg:pb-24 lg:pt-24"
        media={
          <ShowcaseVideo
            landscape={VIDEOS.landscape}
            portrait={VIDEOS.portrait}
            poster="/images/prestation_isolation.jpg"
            title="L’isolation avec Technitoit"
          />
        }
      >
        <p>
          Une mauvaise <strong className="font-semibold text-tt-blue">isolation</strong> peut entraîner des pertes de chaleur
          importantes, affectant l’efficacité de votre chauffage en hiver et la{" "}
          <Link href="/foire-aux-questions" className="font-semibold text-tt-orange hover:underline">
            climatisation
          </Link>{" "}
          en été. Technitoit intervient en tant qu’<strong className="font-semibold text-tt-blue">expert de l’isolation</strong>{" "}
          pour vous assurer un confort été comme hiver dans votre maison.
        </p>
      </IntroSplit>

      <SectionNav items={SECTIONS} />

      {/* Pourquoi isoler */}
      <section id="role" aria-labelledby="role-title" className="scroll-mt-36 bg-tt-stone py-24 lg:py-32">
        <div className="content-container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle
              id="role-title"
              eyebrow="Rôle"
              title={
                <>
                  Pourquoi isoler <Accent>ma maison ?</Accent>
                </>
              }
            />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-tt-muted">
              <p>
                L’isolation joue un rôle <strong className="font-semibold text-tt-blue">crucial</strong> dans votre confort au
                quotidien mais aussi sur vos factures énergétiques.
              </p>
              <p>
                Les principales sources de <strong className="font-semibold text-tt-blue">déperdition de chaleur</strong>{" "}
                incluent :
              </p>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {HEAT_LOSS_ZONES.map((z) => (
                <li key={z} className="rounded-full border border-tt-line bg-white px-4 py-2 text-sm font-semibold">
                  {z}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg leading-relaxed text-tt-muted">
              Comprendre ces zones critiques vous permettra de choisir la solution d’isolation la plus adaptée aux
              caractéristiques <strong className="font-semibold text-tt-blue">uniques</strong> de votre maison.
            </p>
            <Link href="#configurator-anchor" className="btn-fill-orange group mt-10 inline-flex h-13 items-center gap-3 px-7">
              Je veux réaliser des économies
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
            <Image
              src="/images/pages/998d4022f3-illustration_prestation_isolation.jpg"
              alt="Prestation Isolation"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Types d'isolation */}
      <section id="types" aria-labelledby="types-title" className="scroll-mt-36 py-24 lg:py-32">
        <div className="content-container">
          <SectionHead
            id="types-title"
            eyebrow="Types d’isolation"
            title={
              <>
                Les différents types <Accent>d’isolation thermique.</Accent>
              </>
            }
            aside={
              <RichText text="Technitoit réalise différents types d’**isolation thermique** en fonction de l’état de votre maison et de ses déperditions énergétiques. Une étude thermique par nos experts vous guidera vers l’**isolation thermique** adaptée." />
            }
          />
          <ul className="grid gap-5 md:grid-cols-2 lg:gap-6">
            {TYPES.map((t, i) => (
              <li key={t.title} className="reveal group flex gap-6 rounded-3xl border border-tt-line bg-white p-7 transition-shadow hover:shadow-lift lg:p-9">
                <span className="w-14 shrink-0 text-4xl font-extrabold text-tt-orange/25 transition-colors group-hover:text-tt-orange">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-1 flex-col">
                  <h3 className="text-xl font-extrabold">{t.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-tt-muted">
                    <RichText text={t.text} />
                  </p>
                  <Link href={t.href} className="mt-5 inline-flex items-center gap-2 self-start text-sm font-bold text-tt-orange">
                    En savoir plus
                    <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <CenteredCta label="Obtenir une étude gratuitement" />
        </div>
      </section>

      {/* Isolant Mr.Wool */}
      <section id="isolant" aria-labelledby="isolant-title" className="relative isolate scroll-mt-36 overflow-hidden bg-tt-navy py-24 text-white lg:py-32">
        <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[560px] rounded-full bg-tt-orange/20 blur-[150px]" />
        <div className="content-container grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="reveal grid aspect-[16/9] place-items-center rounded-3xl bg-white p-10 shadow-lift">
            <Image
              src="/images/pages/901e0bf9f7-logo_mrwool.jpg"
              alt="Logo Mr.Wool, l’isolant thermique Technitoit"
              width={783}
              height={353}
              className="h-auto w-full max-w-sm"
            />
          </div>
          <div>
            <SectionTitle
              id="isolant-title"
              tone="light"
              eyebrow="Isolant Technitoit"
              title={
                <>
                  L’isolant thermique Mr.Wool <Accent>par Technitoit.</Accent>
                </>
              }
              description="Technitoit a créé Mr.Wool, un isolant thermique professionnel en laine minérale, qui répond parfaitement à tous les besoins. Principalement utilisé pour l’isolation des combles perdus par soufflage, cet isolant reste efficace dans le temps et ne se tasse pas."
            />
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {MRWOOL_PROPS.map((p) => (
                <li key={p} className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold">
                  <CheckIcon className="size-4 shrink-0 text-tt-orange" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Coût */}
      <section id="cout" aria-labelledby="cout-title" className="scroll-mt-36 py-24 lg:py-32">
        <div className="content-container grid gap-5 lg:grid-cols-2 lg:gap-6">
          <article className="flex flex-col rounded-[2rem] border border-tt-line bg-tt-stone p-8 sm:p-10 lg:p-12">
            <span className="grid size-13 place-items-center rounded-2xl bg-tt-orange text-white">
              <EuroIcon className="size-6" />
            </span>
            <p className="eyebrow mt-8">Coût</p>
            <h2 id="cout-title" className="mt-3 text-3xl font-extrabold leading-tight lg:text-4xl">
              Quel est le coût d’une isolation pour ma maison ?
            </h2>
            <p className="mt-5 leading-relaxed text-tt-muted">
              <strong className="font-semibold text-tt-blue">Le coût d’une isolation thermique</strong> peut varier en fonction
              de l’état de votre maison, des travaux réalisés et des isolants choisis. Avec autant de facteurs à prendre en
              compte, il est plus intéressant de réaliser un devis personnalisé pour connaître le{" "}
              <strong className="font-semibold text-tt-blue">prix de votre isolation</strong>. Contactez dès maintenant votre
              conseiller Technitoit pour une étude de votre isolation : c’est gratuit, rapide et sans engagement !
            </p>
            <div className="mt-auto pt-8">
              <Link href="#configurator-anchor" className="btn-fill-orange group inline-flex h-13 items-center gap-3 px-7">
                Obtenir un devis gratuitement
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
          <article className="flex flex-col rounded-[2rem] border border-tt-line bg-white p-8 sm:p-10 lg:p-12">
            <span className="grid size-13 place-items-center rounded-2xl bg-tt-orange-soft text-tt-orange">
              <HomeSearchIcon className="size-6" />
            </span>
            <p className="eyebrow mt-8">Prix moyen</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight lg:text-4xl">Le prix moyen d’une isolation</h2>
            <p className="mt-5 leading-relaxed text-tt-muted">
              Le <strong className="font-semibold text-tt-blue">prix moyen d’une isolation</strong> est compliqué à déterminer.
              En effet, il dépend de la prestation choisie et de l’état de votre maison. Pour en savoir plus sur le prix,
              faites une{" "}
              <Link href="/devis-gratuit" className="font-semibold text-tt-orange hover:underline">
                demande de devis
              </Link>
              . En ligne ou en agence, les professionnels sont à votre écoute pour échanger sur vos projets d’isolation.
            </p>
          </article>
        </div>
      </section>

      {/* Financement */}
      <section id="financement" aria-labelledby="financement-title" className="scroll-mt-36 pb-24 lg:pb-32">
        <div className="content-container">
          <div className="grid overflow-hidden rounded-[2rem] bg-tt-stone lg:grid-cols-2">
            <div className="relative min-h-72">
              <Image src="/images/pages/3055c3fcb8-photo_presta_2.jpg" alt="Chantier d’isolation Technitoit" fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
            </div>
            <div className="p-8 sm:p-10 lg:p-14">
              <p className="eyebrow">Financement</p>
              <h2 id="financement-title" className="mt-3 text-3xl font-extrabold leading-tight lg:text-4xl">
                Les aides à l’isolation en 2026
              </h2>
              <p className="mt-5 leading-relaxed text-tt-muted">
                Le <strong className="font-semibold text-tt-blue">financement de votre projet d’isolation</strong> peut
                s’appuyer sur des aides de l’état. MaPrimeRénov notamment, a été mise en place pour lutter contre les maisons
                dites « passoires thermiques ».{" "}
                <Link href="/guides/aides-renovation" className="font-semibold text-tt-orange hover:underline">
                  Les aides à l’isolation
                </Link>{" "}
                MaPrimeRénov sont soumises à certaines conditions, de revenus notamment. Renseignez-vous sur vos droits et sur
                les aides à l’isolation disponibles.
              </p>
              <Link href="/guides/aides-renovation" className="btn-outline-orange mt-8 inline-flex h-12 items-center px-6">
                Découvrir les aides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section id="expertise" aria-labelledby="expertise-title" className="scroll-mt-36 pb-24 lg:pb-32">
        <div className="content-container">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-tt-navy p-8 text-white sm:p-10 lg:p-14">
            <div aria-hidden className="absolute -left-24 -top-24 -z-10 size-80 rounded-full bg-tt-orange/25 blur-[100px]" />
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
              <div>
                <span className="grid size-13 place-items-center rounded-2xl bg-white/10 text-tt-orange">
                  <AwardIcon className="size-6" />
                </span>
                <p className="eyebrow mt-8">Expertise</p>
                <h2 id="expertise-title" className="mt-3 text-3xl font-extrabold leading-tight lg:text-4xl">
                  Technitoit, votre entreprise d’isolation partout en France
                </h2>
                <p className="mt-5 leading-relaxed text-white/70">
                  Pourquoi confier vos <strong className="font-semibold text-white">travaux d’isolation</strong> à un expert
                  comme Technitoit ? Pour ses 20 années d’expérience, ses milliers de chantiers réalisés, ses clients satisfaits
                  et sa passion incommensurable pour la rénovation de l’habitat. Une vraie expertise dans{" "}
                  <strong className="font-semibold text-white">la rénovation de votre isolation</strong> pour vous assurer un
                  confort optimal dans votre maison.
                </p>
                <p className="mt-4 leading-relaxed text-white/70">
                  Faites votre demande de devis en ligne dès maintenant pour que Technitoit vous accompagne dans votre{" "}
                  <strong className="font-semibold text-white">projet d’isolation</strong> en France.
                </p>
              </div>
              <div className="grid gap-3">
                {[
                  { v: "20 ans", l: "d’expérience" },
                  { v: "Des milliers", l: "de chantiers réalisés" },
                  { v: "Mr.Wool", l: "isolant développé par Technitoit" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-2xl font-extrabold">{s.v}</p>
                    <p className="text-sm text-white/60">{s.l}</p>
                  </div>
                ))}
                <Link href="#configurator-anchor" className="btn-fill-orange group mt-2 inline-flex h-13 items-center justify-center gap-3 px-7">
                  Faire ma demande de devis
                  <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteSection />
    </>
  );
}
