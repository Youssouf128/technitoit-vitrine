import Image from "next/image";
import Link from "next/link";
import type { Crumb } from "@/lib/pages";

type Props = { title: string; crumbs: Crumb[]; image?: string; subtitle?: string };

export function Breadcrumbs({ crumbs, light }: { crumbs: Crumb[]; light?: boolean }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: c.href })),
  };
  return (
    <nav aria-label="Fil d'Ariane" className={`text-sm font-medium ${light ? "text-white/70" : "text-tt-muted"}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={light ? "text-white" : "font-semibold text-tt-blue"}>
                  {c.label}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="hover:text-tt-orange">
                    {c.label}
                  </Link>
                  <svg viewBox="0 0 12 12" aria-hidden className="size-2.5 opacity-50">
                    <path d="m4 2 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}

/** Bandeau de titre des pages internes. */
export function PageHero({ title, crumbs, image, subtitle }: Props) {
  if (!image) {
    return (
      <section className="relative isolate overflow-hidden bg-tt-stone">
        <div aria-hidden className="absolute -right-32 -top-32 -z-10 size-[420px] rounded-full bg-tt-orange/15 blur-[110px]" />
        <div className="content-container py-14 lg:py-20">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] md:text-6xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg text-tt-muted md:text-xl">{subtitle}</p>}
        </div>
      </section>
    );
  }
  return (
    <section className="relative isolate h-[440px] overflow-hidden bg-tt-navy text-white lg:h-[560px]">
      <Image src={image} alt="" fill preload sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-tt-navy/90 via-tt-navy/55 to-tt-navy/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-tt-navy/70 to-transparent" />
      <div className="content-container flex h-full flex-col justify-end pb-14 lg:pb-20">
        <Breadcrumbs crumbs={crumbs} light />
        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.03] md:text-7xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg text-white/80 md:text-xl">{subtitle}</p>}
      </div>
    </section>
  );
}
