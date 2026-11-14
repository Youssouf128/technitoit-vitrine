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
      <section className="relative isolate flex h-128 items-end md:h-160 lg:h-176">
        <Image
          src="/images/actualites-hero.png"
          alt="Vue aérienne d'une maison avec toiture en tuiles"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="relative block w-4/5 bg-[#D9D9D9]/20 pb-14 pl-8 pt-16 text-white backdrop-blur-[2px] md:w-176 lg:ml-28 xl:ml-52">
          <h1 className="text-3xl font-bold leading-none drop-shadow-lg sm:text-5xl md:text-[85px]">
            Actualités<span className="text-tt-orange">.</span>
          </h1>
        </div>
      </section>

      <div className="content-container mb-16 mt-8 flex overflow-x-auto">
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
