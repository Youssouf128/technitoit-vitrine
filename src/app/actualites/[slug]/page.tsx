import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ARTICLES_META } from "@/data/articles";
import { getArticle } from "@/lib/articles";
import { ArticleBreadcrumbs } from "@/components/articles/ArticleBreadcrumbs";
import { ArticleBlocks } from "@/components/articles/ArticleBlocks";
import { ArticleContactForm } from "@/components/articles/ArticleContactForm";
import { SITE } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ARTICLES_META.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const description =
    a.description || `${a.title} - Découvrez les actualités et conseils rénovation de Technitoit.`;
  return {
    title: a.metaTitle || a.title,
    description,
    alternates: { canonical: `/actualites/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description,
      publishedTime: a.date,
      images: a.heroImage ? [{ url: a.heroImage, width: a.heroW, height: a.heroH, alt: a.imageAlt }] : undefined,
    },
  };
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 30 30" className="size-4" aria-hidden>
      <circle cx="15" cy="15" r="13" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M15 8v7.5l5 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.h1,
    datePublished: a.date,
    image: a.heroImage ? `${SITE.url}${a.heroImage}` : undefined,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/favicon.ico` } },
    mainEntityOfPage: `${SITE.url}/actualites/${a.slug}`,
    description: a.description || undefined,
  };

  return (
    <>
      <section className="relative pb-20 pt-52">
        <div aria-hidden className="absolute left-0 top-0 -z-[1] h-[42rem] w-full bg-tt-grey-bg" />

        <article className="content-container border-b border-tt-grey-light pb-20">
          <ArticleBreadcrumbs
            className="mb-10 lg:mb-16"
            crumbs={[
              { label: "Accueil", href: "/" },
              { label: "Actualités", href: "/actualites" },
              { label: a.crumb },
            ]}
          />

          {a.tag && (
            <span className="mb-9 inline-block bg-tt-orange px-6 py-2.5 text-xs uppercase leading-none tracking-[.25em] text-white lg:px-11">
              {a.tag}
            </span>
          )}

          <div className="mb-6 flex flex-col lg:mb-28 lg:flex-row lg:justify-between">
            <h1 className="mb-9 text-4xl font-bold leading-none lg:mb-0 lg:min-h-[255px] lg:w-[600px] lg:text-6xl xl:w-[820px] xl:text-[85px]">
              {a.h1}
              <span className="text-tt-orange">.</span>
            </h1>
            {a.heroImage && (
              <div className="relative flex-1">
                <Image
                  src={a.heroImage}
                  alt={a.imageAlt}
                  width={a.heroW}
                  height={a.heroH}
                  priority
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="max-h-[360px] w-full object-contain lg:absolute lg:left-1/2 lg:top-28 lg:max-w-[420px] lg:-translate-x-1/2"
                />
              </div>
            )}
          </div>

          <div className="mx-auto w-full max-w-[850px]">
            <div className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-9">
              <p className="font-light">
                Publié le <time dateTime={a.date}>{a.publishedLabel}</time>
              </p>
              {a.readingTime && (
                <p className="flex items-center font-light">
                  <ClockIcon />
                  <span className="ml-2">Temps de lecture : {a.readingTime}</span>
                </p>
              )}
            </div>

            <div className="mt-16 lg:mt-28">
              <ArticleBlocks blocks={a.blocks} hasForm={a.hasForm} />

              {a.hasForm && (
                <div id="configurator-anchor" className="mt-11 scroll-mt-32">
                  <div className="h-fit w-full border border-tt-grey-light bg-white px-5 pb-12 pt-11 sm:px-12">
                    <p className="tnt-rich-text mb-10">
                      Remplissez le formulaire ci-dessous. Un conseiller traitera votre demande dans les meilleurs délais.
                    </p>
                    <h2 className="mb-6 flex items-baseline gap-3 text-2xl font-bold">
                      <span aria-hidden className="min-h-3 min-w-3 bg-tt-orange" />
                      Informations de contact
                    </h2>
                    <ArticleContactForm source={`/actualites/${a.slug}`} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </section>

    </>
  );
}
