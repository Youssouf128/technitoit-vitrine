import Image from "next/image";
import Link from "next/link";
import { ReviewsWidget } from "./ReviewsWidget";

export function Hero() {
  return (
    <section className="relative block h-144 sm:h-176 lg:h-screen lg:min-h-[760px]">
      <Image
        src="/images/home_hero.jpg"
        alt="Vue aérienne d'un quartier pavillonnaire"
        fill
        priority
        sizes="100vw"
        className="-z-0 object-cover"
      />
      <div className="relative z-10 flex h-full flex-col text-white">
        <div className="relative flex h-full w-full flex-col 2xl:mx-auto 2xl:max-w-screen-2xl">
          <div className="relative mt-48 flex w-11/12 max-w-screen-sm items-start justify-start lg:ml-36 lg:mt-64">
            <div className="flex size-full flex-col justify-between bg-white/20 py-10 pl-8 pr-4 backdrop-blur-[2px] sm:pr-16">
              <h1 className="max-w-112 text-start text-4xl font-bold drop-shadow-lg sm:text-[2.5rem] sm:leading-[43px] md:text-7xl md:leading-[1.05]">
                Leader de la rénovation de l’habitat en France<span className="text-tt-orange">.</span>
              </h1>
              <div className="flex w-full flex-col items-start pt-8 lg:items-end lg:pt-0">
                <Link
                  href="/renovation-toiture/hydrofuge-toiture"
                  className="btn-fill-orange inline-block px-5 py-2 text-center font-bold"
                >
                  Continuer
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-[10%] z-50 block">
            <ReviewsWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
