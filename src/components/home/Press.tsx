import Image from "next/image";
import Link from "next/link";
import { PRESS_LOGOS } from "@/data/site";
import { ArrowIcon } from "@/components/ui/icons";

/** Bandeau défilant des logos presse. */
export function Press() {
  const row = [...PRESS_LOGOS, ...PRESS_LOGOS];
  return (
    <section aria-labelledby="press-title" className="border-y border-tt-line py-14 lg:py-16">
      <div className="content-container flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
        <div className="shrink-0 lg:w-64">
          <h2 id="press-title" className="text-lg font-extrabold">
            Ils parlent de nous
          </h2>
          <Link href="/presse" className="group mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-tt-muted hover:text-tt-orange">
            Espace presse
            <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="group/marquee relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <ul className="flex w-max animate-marquee items-center gap-14 [animation-duration:35s] group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none">
            {row.map((l, i) => (
              <li key={`${l.src}-${i}`} aria-hidden={i >= PRESS_LOGOS.length} className="flex h-12 w-36 shrink-0 items-center justify-center">
                <Image
                  src={l.src}
                  alt={l.alt}
                  width={l.w}
                  height={l.h}
                  sizes="160px"
                  className="max-h-10 w-auto max-w-full object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
