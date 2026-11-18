import Image from "next/image";
import { SITE } from "@/data/site";

const STATS = [
  { value: "+20", unit: "ans", label: "d'expertise en rénovation" },
  { value: String(SITE.agencies), unit: "agences", label: "partout en France" },
  { value: SITE.rating.toLocaleString("fr-FR", { minimumFractionDigits: 1 }), unit: "/5", label: "de satisfaction client" },
  { value: "100", unit: "%", label: "d'installateurs certifiés RGE*" },
];

const AWARDS = [
  {
    src: "/images/technitoit-meilleure-chaine-magasin-2026.png",
    alt: "technitoit élu meilleure chaîne de magasins de l'année, catégorie renovation de l'habitat",
  },
  {
    src: "/images/technitoit-meilleure-franchise-2026.png",
    alt: "technitoit élu meilleure franchise de l'année, catégorie renovation de l'habitat",
  },
];

/** Bandeau de chiffres clés qui chevauche le hero. */
export function Stats() {
  return (
    <section aria-label="Technitoit en chiffres" className="relative z-10 -mt-12 lg:-mt-16">
      <div className="content-container">
        <div className="grid items-center gap-6 rounded-3xl border border-tt-line bg-white p-6 shadow-lift sm:p-8 lg:grid-cols-[1fr_auto] lg:gap-10 lg:p-10">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-tt-line">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse lg:px-8 lg:first:pl-0">
                <dt className="mt-1 text-sm leading-snug text-tt-muted">{s.label}</dt>
                <dd className="text-4xl font-extrabold tracking-tight text-tt-blue lg:text-5xl">
                  {s.value}
                  <span className="ml-1 text-xl font-bold text-tt-orange lg:text-2xl">{s.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex items-center gap-3 border-t border-tt-line pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {AWARDS.map((a) => (
              <Image
                key={a.src}
                src={a.src}
                alt={a.alt}
                width={200}
                height={200}
                className="size-20 rounded-xl shadow-soft lg:size-24"
              />
            ))}
            <p className="ml-2 max-w-40 text-sm font-semibold leading-snug lg:hidden xl:block">
              Élue meilleure chaîne &amp; meilleure franchise de l&apos;année
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
