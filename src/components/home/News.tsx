import Image from "next/image";
import Link from "next/link";
import { ARTICLES_META } from "@/data/articles";
import { formatShortDate, frenchSpacing } from "@/components/articles/ArticleCard";
import { Accent, SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowIcon, ArrowUpRight } from "@/components/ui/icons";

const LATEST = ARTICLES_META.slice(0, 3);

export function News() {
  return (
    <section aria-labelledby="news-title" className="bg-tt-stone py-24 lg:py-32">
      <div className="content-container">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            id="news-title"
            eyebrow="Actualités & conseils"
            title={
              <>
                Le journal de <Accent>la rénovation.</Accent>
              </>
            }
          />
          <Link
            href="/actualites"
            className="group inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-full border border-tt-blue/15 bg-white px-6 font-semibold transition-colors hover:border-tt-blue hover:bg-tt-blue hover:text-white md:self-auto"
          >
            Toutes les actualités
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
          {LATEST.map((a) => (
            <li key={a.slug} className="w-[85%] flex-none snap-start md:w-auto">
              <Link
                href={`/actualites/${a.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-tt-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={a.image ?? "/images/home_hero.jpg"}
                    alt={a.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 85vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {a.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-tt-blue backdrop-blur">
                      {a.tag}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm text-tt-muted">
                    {formatShortDate(a.date)}
                    {a.readingTime && <> · {a.readingTime.replace(/(\d)\s*min/, "$1 min")} de lecture</>}
                  </p>
                  <h3 className="mt-3 text-xl font-bold leading-snug transition-colors group-hover:text-tt-orange">{frenchSpacing(a.title)}</h3>
                  <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-bold text-tt-orange">
                    Lire l’article
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
