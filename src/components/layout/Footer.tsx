import Image from "next/image";
import Link from "next/link";
import { FOOTER_COLUMNS, FOOTER_LABELS, SITE, SOCIALS } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SocialIcon } from "@/components/ui/icons";
import { NewsletterForm } from "./NewsletterForm";
import { ConsentButton } from "./ConsentButton";

export function SocialSection() {
  return (
    <section className="relative aspect-[.62] max-h-[800px] w-full overflow-clip sm:max-h-[900px] md:aspect-[2.95] md:max-h-none">
      <div className="absolute inset-0 -z-[1]">
        <Image
          src="/images/footer_first_section_bg_mobile.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom md:hidden"
        />
        <Image
          src="/images/footer_first_section_bg_desktop.jpg"
          alt="Techniman et les réseaux sociaux de Technitoit"
          fill
          sizes="100vw"
          className="hidden object-cover md:block"
        />
      </div>
      <div className="h-full px-4 sm:px-10 lg:container lg:mx-auto">
        <div className="flex h-full flex-col gap-6 pt-9 md:max-w-[40%] md:justify-center md:gap-4 md:pt-0 xl:max-w-[450px] xl:gap-9">
          <SectionTitle light="suivez-nous" bold="au quotidien" noSquare className="lg:!text-5xl xl:!text-6xl" />
          <p className="font-light md:text-lg xl:text-2xl">
            Découvrez nos derniers projets et restez informé des actualités de Technitoit en nous suivant sur les réseaux
            sociaux !
          </p>
          <ul className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Technitoit sur ${s.label}`}
                  className="block text-tt-blue transition-colors hover:text-tt-orange"
                >
                  <SocialIcon name={s.name} className={s.name === "x" || s.name === "pinterest" ? "size-6" : "size-8"} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();
  return (
    <>
      <footer className="bg-tt-beige px-4 py-14 sm:px-8 lg:px-0 lg:py-24">
        <div className="mb-20 flex flex-wrap justify-between gap-y-10 lg:flex-row lg:flex-nowrap lg:gap-x-8 lg:px-4 xl:container xl:mx-auto">
          <div className="w-full lg:mb-0 lg:w-auto">
            <p className="text-center text-sm tracking-[.25em] text-tt-orange lg:text-left">NEWSLETTER : RESTEZ INFORMÉS</p>
            <NewsletterForm />
            <div className="mt-16 flex justify-center lg:mt-8 lg:justify-start">
              <Logo className="w-full max-w-[260px] text-tt-orange" />
            </div>
            <p className="mt-3 text-center lg:text-left">
              <span className="block lg:inline">© {year} {SITE.legalName}</span>
              <span className="hidden lg:inline"> - </span>
              <span>{SITE.address}</span>
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="w-1/2 sm:w-auto lg:w-auto">
              <p className="mb-7 text-sm tracking-[.25em] text-tt-orange">{col.title}</p>
              <ul className="flex flex-col gap-4 lg:gap-8">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-tt-orange">
                      {l.label}
                    </Link>
                  </li>
                ))}
                {col.title === "INFORMATIONS" && (
                  <li>
                    <ConsentButton />
                  </li>
                )}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 lg:px-4 xl:container xl:mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Image
              src="/images/technitoit-meilleure-chaine-magasin-2026.png"
              alt="technitoit élu meilleure chaîne de magasins de l'année 2026, catégorie renovation de l'habitat"
              width={200}
              height={200}
              className="h-20 w-auto"
            />
            <Image
              src="/images/technitoit-meilleure-franchise-2026.png"
              alt="technitoit élu meilleure franchise de l'année 2026, catégorie renovation de l'habitat"
              width={200}
              height={200}
              className="h-20 w-auto"
            />
            {FOOTER_LABELS.map((l) => (
              <Image key={l.src} src={l.src} alt={l.alt} width={l.w} height={l.h} className="h-11 w-auto object-contain" />
            ))}
          </div>
          <p className="text-center text-sm font-light">
            * Tous les professionnels installateurs sélectionnés par TECHNITOIT pour les différentes prestations proposées
            sont certifiées RGE
          </p>
        </div>
      </footer>
    </>
  );
}
