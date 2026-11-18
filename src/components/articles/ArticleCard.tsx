import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles-types";

/** Espace insécable avant « ? ! : ; » (évite un signe orphelin en début de ligne). */
export const frenchSpacing = (s: string) => s.replace(/ ([?!:;»])/g, "\u00a0$1");

export const formatShortDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

/** Carte d'article de la page /actualites (même rendu que l'original). */
export function ArticleCard({ article, eager }: { article: ArticleMeta; eager?: boolean }) {
  return (
    <article className="h-full">
      <Link
        href={`/actualites/${article.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-tt-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {article.image && (
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              loading={eager ? "eager" : undefined}
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          {article.tag && (
            <p className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-tt-blue backdrop-blur">
              {article.tag}
            </p>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-sm text-tt-muted">Publié le {formatShortDate(article.date)}</p>
          <h2 className="mt-3 text-xl font-bold leading-snug transition-colors group-hover:text-tt-orange">{frenchSpacing(article.title)}</h2>
          <span className="mt-auto pt-6 text-sm font-bold text-tt-orange">Lire l’article →</span>
        </div>
      </Link>
    </article>
  );
}
