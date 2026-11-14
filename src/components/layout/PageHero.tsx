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
    <nav aria-label="Fil d'Ariane" className={`text-sm ${light ? "text-white/80" : "text-tt-grey-medium"}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={light ? "text-white" : "text-tt-blue"}>
                  {c.label}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="hover:text-tt-orange">
                    {c.label}
                  </Link>
                  <span aria-hidden className="text-tt-orange">
                    /
                  </span>
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
      <section className="bg-tt-grey-bg">
        <div className="content-container py-12 lg:py-16">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mt-6 max-w-4xl text-4xl font-bold md:text-6xl">
            {title}
            <span className="text-tt-orange">.</span>
          </h1>
          {subtitle && <p className="mt-4 max-w-2xl text-xl font-light">{subtitle}</p>}
        </div>
      </section>
    );
  }
  return (
    <section className="relative isolate h-[420px] text-white lg:h-[520px]">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-tt-blue/85 via-tt-blue/50 to-transparent" />
      <div className="content-container flex h-full flex-col justify-end pb-14">
        <Breadcrumbs crumbs={crumbs} light />
        <h1 className="mt-6 max-w-3xl text-4xl font-bold drop-shadow-lg md:text-7xl">
          {title}
          <span className="text-tt-orange">.</span>
        </h1>
        {subtitle && <p className="mt-4 max-w-2xl text-xl font-light">{subtitle}</p>}
      </div>
    </section>
  );
}
