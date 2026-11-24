import Link from "next/link";
import type { ReactNode } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowIcon, CheckIcon } from "@/components/ui/icons";

type Props = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  bullets?: string[];
  cta?: { label: string; href: string; variant?: "fill" | "outline" };
  media: ReactNode;
  /** Média à gauche sur grand écran. */
  reverse?: boolean;
  className?: string;
};

/** Bloc texte + média (vidéo, image, comparateur) en deux colonnes. */
export function IntroSplit({ id, eyebrow, title, children, bullets, cta, media, reverse, className = "py-24 lg:py-32" }: Readonly<Props>) {
  return (
    <section aria-labelledby={id} className={className}>
      <div className="content-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className={reverse ? "lg:order-2" : ""}>
          <SectionTitle id={id} eyebrow={eyebrow} title={title} />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-tt-muted">{children}</div>
          {bullets && (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 font-medium">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-tt-orange text-white">
                    <CheckIcon className="size-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          )}
          {cta && (
            <Link
              href={cta.href}
              className={`group mt-10 inline-flex h-13 items-center gap-3 px-7 ${cta.variant === "outline" ? "btn-outline-orange" : "btn-fill-orange"}`}
            >
              {cta.label}
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
        <div className={`reveal ${reverse ? "lg:order-1" : ""}`}>{media}</div>
      </div>
    </section>
  );
}
