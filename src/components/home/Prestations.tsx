"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PRESTATIONS } from "@/data/site";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { QuoteConfigurator } from "./QuoteConfigurator";

const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 25 25" fill="none" aria-hidden className="size-5 text-tt-orange">
      <path d="M12.5 2v21" stroke="currentColor" strokeWidth="3" className={`origin-center transition-transform duration-300 ${open ? "scale-y-0" : ""}`} />
      <path d="M2 12.5h21" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

export function Prestations() {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby="prestations-title">
      <div className="content-container mb-8 flex px-2 lg:mb-16 lg:justify-center">
        <SectionTitle id="prestations-title" light="découvrez" bold="nos prestations" inlineOnDesktop className="mx-6" />
      </div>

      <div className="content-container relative mb-32 flex flex-col items-end justify-end pt-5 before:absolute before:inset-y-0 before:left-4 before:right-4 before:-z-10 before:bg-tt-grey-bg lg:max-w-screen-lg xl:max-w-screen-xl">
        <div className="z-10 flex w-full flex-col justify-between lg:flex-row">
          {PRESTATIONS.map((p, i) => {
            const open = i === active;
            return (
              <article
                key={p.title}
                onMouseEnter={() => isDesktop() && setActive(i)}
                className={[
                  "relative isolate overflow-hidden transition-[max-height,width] duration-500 ease-in-out",
                  "lg:h-[794px] lg:max-h-none lg:pt-64",
                  open ? "max-h-[2000px] lg:w-[40%]" : "max-h-[100px] lg:w-[calc((100%-40%-60px)/3)]",
                ].join(" ")}
              >
                {/* Liseré orange (desktop) */}
                <div
                  aria-hidden
                  className={`absolute -left-1 top-1/2 z-10 hidden h-60 w-2 -translate-y-1/2 bg-tt-orange transition-opacity duration-500 lg:block ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                />

                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`prestation-${i}`}
                  onClick={() => setActive(open && !isDesktop() ? -1 : i)}
                  className="relative block w-full cursor-pointer text-left lg:static lg:cursor-default"
                  tabIndex={0}
                >
                  <div
                    className={`relative w-full overflow-hidden transition-[height] duration-500 lg:absolute lg:inset-0 lg:-z-30 lg:h-full ${
                      open ? "aspect-[1.57] lg:aspect-auto" : "h-[100px]"
                    }`}
                  >
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  {/* Voile bleu */}
                  <div
                    aria-hidden
                    className={`absolute left-0 top-0 h-full w-full bg-tt-blue transition-opacity duration-500 lg:-z-20 ${
                      open ? "opacity-0 lg:opacity-75" : "opacity-75 lg:opacity-0"
                    }`}
                  />
                  {/* Titre + icône (mobile, replié) */}
                  <span
                    className={`absolute left-8 top-[50px] -translate-y-1/2 text-[32px] font-bold text-white transition-opacity lg:hidden ${
                      open ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {p.title}
                    <span className="text-tt-orange">.</span>
                  </span>
                  <span
                    className={`absolute right-10 top-[50px] -translate-y-1/2 transition-opacity lg:hidden ${
                      open ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <PlusIcon open={open} />
                  </span>
                  <span
                    aria-hidden
                    className={`absolute left-8 top-full z-[1] h-2 w-12 -translate-y-1/2 bg-tt-orange lg:hidden ${
                      open ? "block" : "hidden"
                    }`}
                  />
                  <span className="sr-only">{open ? "Replier" : "Afficher"} la prestation {p.title}</span>
                </button>

                <div id={`prestation-${i}`}>
                  <h3
                    className={`bg-tt-blue px-8 pb-6 pt-11 text-[32px] font-bold text-white transition-opacity duration-500 lg:mb-10 lg:bg-transparent lg:p-0 lg:pl-16 lg:text-4xl ${
                      open ? "lg:opacity-100" : "lg:opacity-0"
                    }`}
                  >
                    {p.title}
                    <span className="text-tt-orange">.</span>
                  </h3>
                  <div
                    className={`relative bg-tt-blue px-8 pb-14 transition-opacity duration-500 lg:w-[400px] lg:bg-transparent lg:p-0 lg:pl-16 ${
                      open ? "lg:opacity-100" : "pointer-events-none lg:opacity-0"
                    }`}
                  >
                    <p className="mb-8 text-base text-white lg:text-xl">{p.text}</p>
                    <div aria-hidden className="mb-14 hidden h-2 w-12 bg-tt-orange lg:block" />
                    <Link
                      href={p.href}
                      tabIndex={open ? 0 : -1}
                      className="btn-outline-orange inline-block px-5 py-2"
                    >
                      découvrir
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div id="configurator-anchor" className="mt-20 flex w-full scroll-mt-32 justify-end pb-10 lg:mt-24 lg:pb-0">
          <QuoteConfigurator />
        </div>
      </div>

      <a
        href="https://france-renov.gouv.fr/"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto my-6 block w-fit px-4"
      >
        <Image
          src="/images/bandeau_france_renov__website_700x150px.png"
          alt="Avant de vous engager, le service public vous informe gratuitement pour préparer et sécuriser votre projet : france-renov.gouv.fr"
          width={701}
          height={151}
        />
      </a>
    </section>
  );
}
