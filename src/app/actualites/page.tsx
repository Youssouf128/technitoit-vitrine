import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ARTICLE_TAGS, ARTICLES_META } from "@/data/articles";
import { ArticleBreadcrumbs } from "@/components/articles/ArticleBreadcrumbs";
import { ArticlesList } from "@/components/articles/ArticlesList";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Découvrez les dernières actualités sur Technitoit : engagement, événementiel, recherche et développement, etc.",
  alternates: { canonical: "/actualites" },
};

export default function ActualitesPage() {
  return (
    <>
      <section className="relative isolate flex h-[440px] items-end overflow-hidden bg-tt-navy text-white md:h-[520px]">
        <Image
          src="/images/actualites-hero.png"
          alt="Vue aérienne d'une maison avec toiture en tuiles"
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-tt-navy/90 via-tt-navy/55 to-tt-navy/10" />
        <div className="content-container pb-14 lg:pb-20">
          <p className="eyebrow">Le journal Technitoit</p>
          <h1 className="mt-4 text-5xl font-extrabold md:text-7xl">Actualités &amp; conseils</h1>
          <p className="mt-5 max-w-xl text-lg text-white/75">
            Engagements, innovations, conseils travaux : suivez toute l’actualité de la rénovation de l’habitat.
          </p>
        </div>
      </section>

      <div className="content-container mb-10 mt-8 flex overflow-x-auto">
        <ArticleBreadcrumbs crumbs={[{ label: "Accueil", href: "/" }, { label: "Actualités" }]} />
      </div>

      <section aria-label="Liste des actualités">
        <Suspense fallback={<div className="content-container min-h-[60vh]" />}>
          <ArticlesList articles={ARTICLES_META} tags={ARTICLE_TAGS} />
        </Suspense>
      </section>
    </>
  );
}
