import Image from "next/image";
import { EXPERIENCE_BADGES } from "@/data/site";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BeforeAfterCarousel } from "./BeforeAfterCarousel";

export function Experience() {
  return (
    <section aria-labelledby="experience-title" className="relative">
      {/* Fond gris clair qui s'arrête au milieu du carrousel */}
      <div className="bg-tt-grey-bg">
        <div className="content-container flex flex-col pb-8 pt-14 lg:flex-row lg:items-center lg:pb-20">
          <SectionTitle id="experience-title" light="l'expérience" bold="Technitoit" className="mx-2 lg:mx-0" />
          <div className="mt-2.5 flex items-center justify-center gap-4 px-2 lg:ml-auto lg:mt-0 lg:gap-10 lg:px-0">
            {EXPERIENCE_BADGES.map((b) => (
              <div key={b.src} className={`w-20 sm:w-28 ${b.desktopOnly ? "hidden lg:block" : "block"}`}>
                <Image
                  src={b.src}
                  alt={b.alt}
                  width={b.w}
                  height={b.h}
                  unoptimized={b.src.endsWith(".svg")}
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mb-14 before:absolute before:inset-x-0 before:top-0 before:-z-10 before:h-24 before:bg-tt-grey-bg lg:before:h-56">
        <div className="content-container flex flex-col-reverse items-center lg:flex-row lg:items-start lg:justify-center">
          <div className="relative z-[1] h-min max-w-screen-sm bg-white lg:w-112 lg:shrink-0 lg:shadow-lg">
            <p className="m-3.5 text-lg font-light lg:m-7 xl:m-8">
              Depuis plus de 20 ans, Technitoit est votre partenaire de confiance pour tous vos projets de rénovation en
              France. Nous mettons notre expertise et notre savoir-faire au service de votre confort et de la valorisation de
              votre patrimoine immobilier. Que vous souhaitiez rénover votre toiture, moderniser votre façade ou améliorer
              l&apos;isolation de votre maison, Technitoit vous accompagne avec des solutions innovantes, durables et
              personnalisées. Découvrez dès maintenant comment nous pouvons transformer votre habitat et simplifier votre
              projet de rénovation.
            </p>
          </div>
          <div className="hidden size-10 shrink-0 bg-tt-orange lg:block" aria-hidden />
          <div className="w-full md:max-w-screen-md">
            <BeforeAfterCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
