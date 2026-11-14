import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles-types";

export const formatShortDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

/** Carte d'article de la page /actualites (même rendu que l'original). */
export function ArticleCard({ article, priority }: { article: ArticleMeta; priority?: boolean }) {
  return (
    <article className="h-full border-b border-tt-grey-light pb-4">
      <Link href={`/actualites/${article.slug}`} className="group flex h-full flex-col">
        <div className="relative mb-6 h-[300px] overflow-hidden">
          {article.image && (
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {article.tag && (
            <p className="absolute bottom-4 left-4 bg-tt-blue px-6 py-2 text-sm tracking-[.1em] text-white">
              {article.tag.toUpperCase()}
            </p>
          )}
        </div>
        <p className="mb-2 inline-block text-2xl font-bold text-tt-orange">{article.title}</p>
        <p className="mt-auto font-light text-tt-grey-medium">Publié le {formatShortDate(article.date)}</p>
      </Link>
    </article>
  );
}
