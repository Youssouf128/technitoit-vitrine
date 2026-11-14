import Image from "next/image";
import Link from "next/link";
import { ARTICLES_META } from "@/data/articles";
import { formatShortDate } from "@/components/articles/ArticleCard";

const LATEST = ARTICLES_META.slice(0, 3);
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowRight } from "@/components/ui/icons";

export function News() {
  return (
    <section aria-labelledby="news-title" className="content-container mb-32 mt-16">
      <div className="mb-10 flex flex-col justify-between lg:flex-row">
        <SectionTitle id="news-title" light="découvrez" bold="nos actualités" />
        <div className="w-full lg:w-1/2">
          <p className="mb-2 mt-4 font-light md:text-sm">
            Découvrez les dernières actualités, conseils et innovations de Technitoit. Suivez les tendances et avancées qui
            transforment le domaine de la rénovation !
          </p>
          <Link href="/actualites" className="group flex items-center gap-2 text-sm font-bold">
            <span>En voir plus</span>
            <ArrowRight className="size-4 stroke-[7px] text-tt-orange transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
        {LATEST.map((a) => (
          <li key={a.slug} className="w-[85%] flex-none snap-start md:w-auto">
            <Link href={`/actualites/${a.slug}`} className="group flex h-full flex-col justify-between">
              <div>
                <div className="relative h-[290px] w-full overflow-hidden">
                  <Image
                    src={a.image ?? "/images/home_hero.jpg"}
                    alt={a.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 85vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 m-4 bg-tt-blue px-4 py-3">
                    <p className="text-sm font-light tracking-widest text-white">{formatShortDate(a.date)}</p>
                  </div>
                </div>
                <p className="mt-4 text-xl font-bold text-tt-orange">{a.title}</p>
              </div>
              <div className="mt-4">
                <p className="mb-1 text-sm font-light">Temps - {a.readingTime}</p>
                <div className="h-px w-full bg-tt-grey-light transition-colors group-hover:bg-tt-orange" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
