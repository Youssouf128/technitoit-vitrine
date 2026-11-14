import Image from "next/image";
import Link from "next/link";
import { PRESS_LOGOS } from "@/data/site";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowRight } from "@/components/ui/icons";

export function Press() {
  return (
    <section aria-labelledby="press-title" className="content-container mb-32">
      <div className="flex w-full flex-col justify-between md:flex-row">
        <div className="flex flex-col md:w-2/5">
          <SectionTitle id="press-title" light="la presse" bold="parle de nous" />
          <p className="mb-2 mt-6 font-light md:text-sm">
            Consultez les derniers articles et communiqués de presse pour rester informé des nouveautés et initiatives de
            Technitoit.
          </p>
          <Link href="/presse" className="group mb-4 flex items-center gap-2 text-sm font-bold md:mb-0">
            <span>En savoir plus</span>
            <ArrowRight className="size-4 stroke-[7px] text-tt-orange transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ul className="flex flex-wrap justify-between gap-x-4 gap-y-3 md:w-1/2">
          {PRESS_LOGOS.map((l) => (
            <li key={l.src} className="flex h-20 w-[calc(33%-1rem)] items-center justify-center">
              <Image
                src={l.src}
                alt={l.alt}
                width={l.w}
                height={l.h}
                sizes="200px"
                className="max-h-14 w-auto max-w-full object-contain opacity-90 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
