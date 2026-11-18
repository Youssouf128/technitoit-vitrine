import Image from "next/image";
import Link from "next/link";
import { NAVIGATION, PRESTATIONS } from "@/data/site";
import { Accent, SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowIcon, ArrowUpRight } from "@/components/ui/icons";

export function Prestations() {
  return (
    <section aria-labelledby="prestations-title" className="py-24 lg:py-32">
      <div className="content-container">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
          <SectionTitle
            id="prestations-title"
            eyebrow="Nos prestations"
            title={
              <>
                Toute la rénovation de votre maison, <Accent>sous un même toit.</Accent>
              </>
            }
          />
          <p className="max-w-md text-tt-muted lg:text-right">
            Du diagnostic à la fin du chantier, nos équipes prennent en charge chaque étape de votre projet, avec des
            produits et des techniques éprouvés.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5">
          {PRESTATIONS.map((p, i) => {
            const featured = i === 0;
            const links = NAVIGATION.find((n) => n.href === p.href)?.links.slice(0, 3) ?? [];
            return (
              <li
                key={p.href}
                className={`reveal group relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden rounded-3xl bg-tt-navy text-white ${
                  featured ? "sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:min-h-[640px]" : "lg:min-h-0"
                }`}
              >
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes={featured ? "(min-width: 1024px) 33vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                  className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-tt-navy via-tt-navy/55 to-tt-navy/0" />

                <span className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-tt-orange">
                  <ArrowUpRight className="size-5" />
                </span>

                <div className="p-6 lg:p-7">
                  <h3 className={`font-extrabold ${featured ? "text-3xl lg:text-4xl" : "text-2xl"}`}>
                    {/* Le lien couvre toute la carte */}
                    <Link href={p.href} className="after:absolute after:inset-0 after:content-['']">
                      {p.title}
                    </Link>
                  </h3>
                  <p className={`mt-2 text-white/75 ${featured ? "max-w-sm text-base" : "line-clamp-2 text-sm"}`}>
                    {featured ? p.text : p.short}
                  </p>
                  {featured && (
                    <ul className="relative z-10 mt-6 flex flex-wrap gap-2">
                      {links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            className="inline-flex rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm backdrop-blur-md transition-colors hover:border-tt-orange hover:bg-tt-orange"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link
            href="/devis-gratuit"
            className="group inline-flex items-center gap-2 font-bold text-tt-blue transition-colors hover:text-tt-orange"
          >
            Vous ne savez pas par où commencer ? Faites-vous conseiller gratuitement
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
