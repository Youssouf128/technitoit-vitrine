import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/PageHero";
import { ArrowIcon, LocationIcon } from "@/components/ui/icons";

type Props = {
  image: string;
  alt: string;
  crumbs: { label: string; href: string }[];
  tag: string;
  title: ReactNode;
  intro: string;
  primary: { label: string; short?: string; href: string };
  secondary?: { label: string; short?: string; href: string };
  aside: { title: string; links: { label: string; href: string }[] };
};

/** Hero des pages catégories : photo assombrie, titre, deux actions et encadré de raccourcis flouté. */
export function LandingHero({ image, alt, crumbs, tag, title, intro, primary, secondary, aside }: Readonly<Props>) {
  return (
    <section className="relative isolate overflow-hidden bg-tt-navy text-white">
      <Image src={image} alt={alt} fill preload sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-tt-navy/95 via-tt-navy/80 to-tt-navy/35" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-tt-navy to-transparent" />
      <div aria-hidden className="absolute -left-32 bottom-0 -z-10 size-[480px] rounded-full bg-tt-orange/25 blur-[140px]" />

      <div className="content-container grid items-end gap-12 pb-20 pt-32 lg:min-h-[min(88svh,840px)] lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16 lg:pb-24 lg:pt-40">
        <div className="animate-fade-in">
          <Breadcrumbs crumbs={crumbs} light />
          <p className="mt-8 inline-flex rounded-full bg-tt-orange px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em]">{tag}</p>
          <h1 className="mt-6 max-w-3xl text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">{intro}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={primary.href} className="btn-fill-orange group inline-flex h-14 items-center justify-center gap-3 px-8">
              {primary.short ? (
                <>
                  <span className="sm:hidden">{primary.short}</span>
                  <span className="hidden sm:inline">{primary.label}</span>
                </>
              ) : (
                primary.label
              )}
              <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-7 font-semibold backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/10"
              >
                <LocationIcon className="h-5" />
                {secondary.short ? (
                  <>
                    <span className="sm:hidden">{secondary.short}</span>
                    <span className="hidden sm:inline">{secondary.label}</span>
                  </>
                ) : (
                  secondary.label
                )}
              </Link>
            )}
          </div>
        </div>

        <nav
          aria-label={aside.title}
          className="rounded-3xl border border-white/15 bg-white/[0.12] p-3 backdrop-blur-3xl backdrop-saturate-150 lg:p-4"
        >
          <p className="px-3 pb-2 pt-2 text-sm font-semibold text-white/70">{aside.title}</p>
          <ul>
            {aside.links.map((l, i) => (
              <li key={l.href + l.label}>
                <Link href={l.href} className="group flex items-center gap-4 rounded-2xl px-3 py-2.5 transition-colors hover:bg-white/10">
                  <span className="w-6 text-sm font-bold text-tt-orange-light">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-semibold">{l.label}</span>
                  <ArrowIcon className="size-4 -translate-x-1 opacity-50 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
