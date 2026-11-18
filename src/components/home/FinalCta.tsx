import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, LocationIcon } from "@/components/ui/icons";

/** Grand appel à l'action en bas de page. */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="pb-24 lg:pb-32">
      <div className="content-container">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-tt-orange px-6 py-16 text-white sm:px-12 lg:px-20 lg:py-24">
          <Image
            src="/images/prestation_toiture.jpg"
            alt=""
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="-z-20 object-cover opacity-25 mix-blend-multiply"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-tt-orange via-tt-orange/90 to-tt-orange/40" />
          <div className="max-w-2xl">
            <h2 id="cta-title" className="text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Prêt à donner une seconde jeunesse à votre maison ?
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Nos conseillers étudient votre projet gratuitement et vous orientent vers les solutions et les aides les
              plus adaptées.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/devis-gratuit"
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-tt-navy px-8 font-bold text-white transition-colors hover:bg-tt-navy-soft"
              >
                Demander mon devis gratuit
                <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/agence"
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-white/40 px-7 font-semibold transition-colors hover:bg-white hover:text-tt-orange"
              >
                <LocationIcon className="h-5" />
                Trouver mon agence
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
