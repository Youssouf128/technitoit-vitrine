import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { QuoteSection } from "@/components/layout/QuoteSection";
import { AgencySearch } from "@/components/home/AgencySearch";
import { ArrowRight } from "@/components/ui/icons";
import { SITE } from "@/data/site";
import { allGenericPaths, categoryTitle, resolvePage, type ResolvedPage } from "@/lib/pages";
import { getCmsPage } from "@/lib/cms-pages";
import { CmsTree } from "@/components/cms/CmsTree";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return allGenericPaths().map((p) => ({ slug: p.slice(1).split("/") }));
}

const toPath = (slug: string[]) => `/${slug.map(decodeURIComponent).join("/")}`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = toPath(slug);
  const cms = getCmsPage(path);
  if (cms) return { title: cms.title, description: cms.description, alternates: { canonical: path } };
  const page = resolvePage(path);
  if (!page) return {};
  return {
    title: page.title,
    description: `${page.title} avec Technitoit, leader de la rénovation de l'habitat en France depuis ${SITE.foundingYear}. Devis gratuit dans l'une de nos ${SITE.agencies} agences.`,
    alternates: { canonical: path },
  };
}

const WHY_US = [
  { title: "+20 ans d'expérience", text: `Depuis ${SITE.foundingYear}, nos équipes accompagnent les particuliers dans la rénovation de leur habitat.` },
  { title: `${SITE.agencies} agences`, text: "Un réseau présent partout en France pour un interlocuteur proche de chez vous." },
  { title: "Installateurs RGE", text: "Des professionnels certifiés RGE pour vous permettre de bénéficier des aides à la rénovation." },
  { title: "Devis gratuit", text: "Un conseiller étudie votre projet et vous remet un devis détaillé, sans engagement." },
];

function WhyUs() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {WHY_US.map((w) => (
        <li key={w.title} className="border-l-4 border-tt-orange bg-white p-6 shadow-sm">
          <p className="mb-2 text-xl font-bold">{w.title}</p>
          <p className="font-light">{w.text}</p>
        </li>
      ))}
    </ul>
  );
}

function LinkGrid({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            className="group flex h-full items-center justify-between gap-4 border border-tt-grey-light bg-white px-6 py-5 text-lg font-bold transition-colors hover:border-tt-orange hover:text-tt-orange"
          >
            {l.label}
            <ArrowRight className="size-8 shrink-0 stroke-[4px] text-tt-orange transition-transform group-hover:translate-x-1" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Body({ page }: { page: ResolvedPage }) {
  switch (page.kind) {
    case "category":
      return (
        <>
          <section className="content-container py-16 lg:py-24">
            <p className="mb-14 max-w-3xl text-2xl font-light">{page.intro}</p>
            <h2 className="mb-8 text-3xl font-black">
              Nos prestations {page.category.label}
              <span className="text-tt-orange">.</span>
            </h2>
            <LinkGrid links={page.category.links} />
          </section>
          <section className="bg-tt-beige py-16">
            <div className="content-container">
              <WhyUs />
            </div>
          </section>
        </>
      );
    case "service": {
      const siblings = page.category.links.filter((l) => l.label !== page.title).slice(0, 6);
      return (
        <>
          <section className="content-container grid gap-14 py-16 lg:grid-cols-[1fr_380px] lg:py-24">
            <div className="tt-prose">
              <p>
                Vous envisagez des travaux de type <strong className="font-bold">{page.title.toLowerCase()}</strong> ?
                Technitoit, leader de la rénovation de l&apos;habitat en France, vous accompagne de l&apos;étude de votre
                projet jusqu&apos;à la fin du chantier.
              </p>
              <h2>Un accompagnement de A à Z</h2>
              <ul>
                <li>Visite et diagnostic à domicile par un conseiller de votre agence.</li>
                <li>Devis détaillé et gratuit, sans engagement.</li>
                <li>Travaux réalisés par des équipes qualifiées et des installateurs certifiés RGE.</li>
                <li>Suivi de chantier et service après-vente.</li>
              </ul>
              <h2>Des aides pour financer vos travaux</h2>
              <p>
                Selon la nature de vos travaux et votre situation, vous pouvez bénéficier d&apos;aides financières à la
                rénovation. Nos conseillers vous orientent pour constituer votre dossier.{" "}
                <Link href="/guides/aides-renovation" className="font-bold text-tt-orange hover:underline">
                  Découvrir les aides
                </Link>
              </p>
            </div>
            <aside className="h-fit bg-tt-blue p-8 text-white">
              <p className="mb-2 text-sm tracking-[.25em] text-tt-orange">DEVIS GRATUIT</p>
              <p className="mb-6 text-2xl font-bold">Un projet de {page.title.toLowerCase()} ?</p>
              <Link href="#configurator-anchor" className="btn-fill-orange inline-block px-6 py-3 font-bold">
                Demander un devis
              </Link>
              <div className="my-8 h-px bg-white/20" />
              <p className="mb-3 font-bold">Voir aussi</p>
              <ul className="space-y-2 font-light">
                {siblings.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-tt-orange">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={page.category.href} className="font-bold text-tt-orange hover:underline">
                    Toutes les prestations {categoryTitle(page.category).toLowerCase()}
                  </Link>
                </li>
              </ul>
            </aside>
          </section>
          <section className="bg-tt-beige py-16">
            <div className="content-container">
              <WhyUs />
            </div>
          </section>
        </>
      );
    }
    case "region":
      return (
        <section className="content-container py-16 lg:py-24">
          <p className="mb-10 max-w-3xl text-2xl font-light">
            Retrouvez les départements de la région {page.region.label} couverts par le réseau Technitoit et contactez
            l&apos;agence la plus proche de chez vous.
          </p>
          <div className="mb-14 max-w-xl">
            <AgencySearch />
          </div>
          <LinkGrid links={page.departments} />
        </section>
      );
    case "department":
      return (
        <section className="content-container py-16 lg:py-24">
          <p className="mb-10 max-w-3xl text-2xl font-light">
            Vous habitez dans le département {page.number} ? Une agence Technitoit intervient près de chez vous pour vos
            travaux de toiture, façade, isolation et énergie.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#configurator-anchor" className="btn-fill-orange inline-block px-6 py-3 font-bold">
              Demander un devis gratuit
            </Link>
            {page.region && (
              <Link href={page.region.href} className="btn-outline-orange inline-block px-6 py-3">
                Autres départements en {page.region.label}
              </Link>
            )}
          </div>
        </section>
      );
    case "info":
      return (
        <section className="content-container py-16 lg:py-24">
          <div className="tt-prose max-w-3xl">
            <p>Cette page est en cours de rédaction. Pour toute question, n&apos;hésitez pas à nous contacter.</p>
          </div>
          <Link href="/devis-gratuit" className="btn-fill-orange mt-6 inline-block px-6 py-3 font-bold">
            Nous contacter
          </Link>
        </section>
      );
  }
}

export default async function GenericPage({ params }: Props) {
  const { slug } = await params;
  const cms = getCmsPage(toPath(slug));
  if (cms) return <CmsTree nodes={cms.tree} />;
  const page = resolvePage(toPath(slug));
  if (!page) notFound();

  const image = page.kind === "category" || page.kind === "service" ? page.image : undefined;
  const showQuote = page.kind !== "info";

  return (
    <>
      <PageHero title={page.title} crumbs={page.crumbs} image={image} />
      <Body page={page} />
      {showQuote && <QuoteSection />}
    </>
  );
}
