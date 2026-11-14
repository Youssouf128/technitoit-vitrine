// À n'importer que depuis des composants serveur : le contenu JSON (~450 Ko) ne doit pas partir dans le bundle client.
import { ARTICLES_META } from "@/data/articles";
import content from "@/data/articles-content.json";
import type { ArticleBlock, ArticleMeta } from "./articles-types";

export const ARTICLES_PER_PAGE = 9;

export function articleHref(slug: string) {
  return `/actualites/${slug}`;
}

export function getArticle(slug: string): (ArticleMeta & { blocks: ArticleBlock[] }) | null {
  const meta = ARTICLES_META.find((a) => a.slug === slug);
  if (!meta) return null;
  const blocks = (content as Record<string, ArticleBlock[]>)[slug] ?? [];
  return { ...meta, blocks };
}
