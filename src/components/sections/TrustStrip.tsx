import Image from "next/image";

const BADGES = [
  { src: "/images/entreprise_francaise.svg", alt: "Entreprise française", w: 128, h: 126 },
  { src: "/images/80_agences.svg", alt: "80 agences en France", w: 126, h: 126 },
  { src: "/images/20_ans.svg", alt: "Plus de 20 ans à vos côtés", w: 125, h: 126 },
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

/** Bandeau labels + distinctions + France Rénov', placé juste sous le hero. */
export function TrustStrip() {
  return (
    <section aria-label="Nos garanties" className="pt-12 lg:pt-16">
      <div className="content-container">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-tt-line bg-white p-6 shadow-lift sm:p-8 lg:flex-row lg:justify-between lg:gap-10 lg:px-10">
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
            {BADGES.map((b) => (
              <Image key={b.src} src={b.src} alt={b.alt} width={b.w} height={b.h} unoptimized className="size-16 lg:size-20" />
            ))}
            {AWARDS.map((a) => (
              <Image key={a.src} src={a.src} alt={a.alt} width={200} height={200} className="size-16 rounded-xl lg:size-20" />
            ))}
          </div>
          <a
            href="https://france-renov.gouv.fr/servicepublic"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full max-w-sm shrink-0 overflow-hidden rounded-2xl border border-tt-line p-1.5 transition-shadow hover:shadow-soft"
          >
            <Image
              src="/images/bandeau_france_renov__website_700x150px.png"
              alt="Avant de vous engager, le service public vous informe gratuitement pour préparer et sécuriser votre projet : france-renov.gouv.fr"
              width={701}
              height={151}
              className="h-auto w-full"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
