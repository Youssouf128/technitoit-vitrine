import Image from "next/image";
import Link from "next/link";
import { FOOTER_COLUMNS, FOOTER_LABELS, SITE, SOCIALS } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/icons";
import { NewsletterForm } from "./NewsletterForm";
import { ConsentButton } from "./ConsentButton";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

const capitalize = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

export async function Footer() {
  const year = await currentYear();
  return (
    <footer className="relative isolate overflow-hidden bg-tt-navy text-white">
      <div aria-hidden className="absolute -bottom-40 -left-40 -z-10 size-[520px] rounded-full bg-tt-orange/10 blur-[140px]" />

      <div className="content-container pb-10 pt-20 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)] lg:gap-20">
          {/* Marque + newsletter */}
          <div>
            <Link href="/" aria-label="Technitoit - accueil" className="inline-block">
              <Logo className="w-44 text-white" />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-white/60">
              Leader de la rénovation de l’habitat en France depuis {SITE.foundingYear} : toiture, façade, isolation,
              énergie et aménagement extérieur.
            </p>

            <div className="mt-10">
              <p className="font-bold">Restez informé</p>
              <p className="mt-1 text-sm text-white/60">Conseils, nouveautés et actualités, une fois par mois.</p>
              <NewsletterForm />
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Technitoit sur ${s.label}`}
                    className="grid size-11 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-tt-orange hover:bg-tt-orange hover:text-white"
                  >
                    <SocialIcon name={s.name} className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {FOOTER_COLUMNS.map((col) => (
              <nav key={col.title} aria-label={capitalize(col.title)}>
                <p className="mb-5 text-xs font-bold uppercase tracking-[.18em] text-tt-orange">{capitalize(col.title)}</p>
                <ul className="flex flex-col gap-3.5 text-[15px]">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-white/70 transition-colors hover:text-white">
                        {l.label === "CGU" || l.label === "FAQ" || l.label === "SAV" ? l.label : capitalize(l.label)}
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
        </div>

        {/* Labels et certifications */}
        <div className="mt-16 flex flex-col items-center gap-6 rounded-3xl bg-white px-6 py-6 text-tt-blue lg:flex-row lg:justify-between lg:px-10">
          <p className="text-sm font-bold">Labels &amp; distinctions</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Image
              src="/images/technitoit-meilleure-chaine-magasin-2026.png"
              alt="technitoit élu meilleure chaîne de magasins de l'année, catégorie renovation de l'habitat"
              width={200}
              height={200}
              className="size-14 rounded-lg"
            />
            <Image
              src="/images/technitoit-meilleure-franchise-2026.png"
              alt="technitoit élu meilleure franchise de l'année, catégorie renovation de l'habitat"
              width={200}
              height={200}
              className="size-14 rounded-lg"
            />
            {FOOTER_LABELS.map((l) => (
              <Image key={l.src} src={l.src} alt={l.alt} width={l.w} height={l.h} className="h-9 w-auto object-contain" />
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/50 lg:flex-row lg:justify-between">
          <p>
            © {year} {SITE.legalName} · {SITE.address}
          </p>
          <p className="max-w-xl lg:text-right">
            * Tous les professionnels installateurs sélectionnés par Technitoit pour les différentes prestations proposées
            sont certifiés RGE.
          </p>
        </div>
      </div>
    </footer>
  );
}
