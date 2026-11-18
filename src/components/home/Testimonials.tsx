import Link from "next/link";
import { REVIEWS, SITE } from "@/data/site";
import { Accent, SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowIcon, QuoteIcon, StarIcon } from "@/components/ui/icons";

const formatRating = (r: number) => r.toLocaleString("fr-FR", { minimumFractionDigits: 1 });
const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Stars({ rating, className = "size-4" }: { rating: number; className?: string }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`Note ${formatRating(rating)} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i)) * 100;
        return (
          <span key={i} className={`relative ${className}`}>
            <StarIcon className="absolute inset-0 size-full text-tt-beige-dark" />
            <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill}%` }}>
              <StarIcon className={`${className} text-tt-orange`} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

/** Avis clients : note globale + mur d'avis défilant. */
export function Testimonials() {
  const row = [...REVIEWS, ...REVIEWS];
  return (
    <section aria-labelledby="reviews-title" className="overflow-hidden py-24 lg:py-32">
      <div className="content-container grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <SectionTitle
          id="reviews-title"
          eyebrow="Avis clients"
          title={
            <>
              Ils nous ont confié leur maison, <Accent>ils en parlent.</Accent>
            </>
          }
        />
        <div className="flex items-center gap-5 rounded-3xl border border-tt-line bg-white p-5 shadow-soft">
          <p className="text-5xl font-extrabold tracking-tight">
            {formatRating(SITE.rating)}
            <span className="text-2xl text-tt-muted">/5</span>
          </p>
          <div>
            <Stars rating={SITE.rating} className="size-5" />
            <Link href="/avis" className="group mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold hover:text-tt-orange">
              Voir tous les avis
              <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="group/marquee relative mt-14 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <ul className="flex w-max animate-marquee gap-5 group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none">
          {row.map((r, i) => (
            <li
              key={`${r.author}-${i}`}
              aria-hidden={i >= REVIEWS.length}
              className="relative flex w-[320px] shrink-0 flex-col rounded-3xl border border-tt-line bg-tt-stone p-7 sm:w-[380px]"
            >
              <QuoteIcon className="absolute right-7 top-7 h-7 text-tt-orange/15" />
              <p className="flex-1 pr-10 text-[17px] font-medium leading-relaxed">« {r.text} »</p>
              <div className="mt-6 flex items-center gap-3 border-t border-tt-line pt-5">
                <span className="grid size-11 place-items-center rounded-full bg-tt-blue text-sm font-bold text-white">
                  {initials(r.author)}
                </span>
                <div className="min-w-0">
                  <p className="font-bold">{r.author}</p>
                  <p className="truncate text-sm text-tt-muted">
                    {r.agency} · {r.date.replace(/^le /, "")}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
