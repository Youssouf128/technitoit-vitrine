import Image from "next/image";
import Link from "next/link";
import { PRESTATIONS, SITE } from "@/data/site";
import { ArrowIcon, CheckIcon, LocationIcon, StarIcon } from "@/components/ui/icons";

const TRUST = [
  "Installateurs certifiés RGE*",
  `${SITE.agencies} agences en France`,
  `Entreprise française depuis ${SITE.foundingYear}`,
];

const formatRating = (r: number) => r.toLocaleString("fr-FR", { minimumFractionDigits: 1 });

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-tt-navy text-white">
      <Image
        src="/images/home_hero.jpg"
        alt="Vue aérienne d'un quartier pavillonnaire"
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover"
      />
      {/* Voiles pour la lisibilité */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-tt-navy/95 via-tt-navy/75 to-tt-navy/30" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-tt-navy/80 to-transparent" />
      <div
        aria-hidden
        className="absolute -left-40 top-1/3 -z-10 size-[520px] rounded-full bg-tt-orange/25 blur-[140px]"
      />

      <div className="content-container grid items-center gap-12 pb-24 pt-32 lg:min-h-[min(100svh,920px)] lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16 lg:pb-32 lg:pt-36 xl:grid-cols-[minmax(0,1fr)_430px]">
        <div className="animate-fade-in">
          <Link
            href="/avis"
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 py-1.5 pl-2 pr-4 text-sm backdrop-blur-md transition-colors hover:bg-white/15"
          >
            <span className="flex items-center gap-0.5 rounded-full bg-white px-2 py-1 text-tt-orange">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} className="size-3" />
              ))}
            </span>
            <span>
              <strong className="font-bold">{formatRating(SITE.rating)}/5</strong>
              <span className="text-white/70"> · avis clients vérifiés</span>
            </span>
          </Link>

          <h1 className="mt-7 max-w-3xl text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-[4.5rem]">
            Rénovez votre maison avec le <span className="text-tt-orange">leader français</span> de l’habitat.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
            Toiture, façade, isolation, énergie : un interlocuteur unique près de chez vous, des artisans qualifiés et un
            devis gratuit, sans engagement.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/devis-gratuit"
              className="btn-fill-orange group inline-flex h-14 items-center justify-center gap-3 px-8 text-base"
            >
              Obtenir mon devis gratuit
              <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/agence"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-7 font-semibold backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/10"
            >
              <LocationIcon className="h-5" />
              Trouver mon agence
            </Link>
          </div>

          <ul className="mt-10 flex flex-col gap-3 text-sm text-white/80 sm:flex-row sm:flex-wrap sm:gap-x-7">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span className="grid size-5 place-items-center rounded-full bg-tt-orange/20 text-tt-orange">
                  <CheckIcon className="size-3" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Sélecteur de projet */}
        <nav
          aria-label="Choisir votre projet"
          className="rounded-3xl border border-white/15 bg-white/[0.08] p-3 shadow-2xl backdrop-blur-xl lg:p-4"
        >
          <p className="px-3 pb-3 pt-2 text-sm font-semibold text-white/70">Quel est votre projet ?</p>
          <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
            {PRESTATIONS.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-white/10"
                >
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-xl">
                    <Image src={p.image} alt="" fill sizes="56px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">{p.title}</span>
                    <span className="block truncate text-sm text-white/60">{p.short}</span>
                  </span>
                  <span className="mr-2 grid size-9 shrink-0 place-items-center rounded-full bg-white/10 transition-colors group-hover:bg-tt-orange">
                    <ArrowIcon className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
