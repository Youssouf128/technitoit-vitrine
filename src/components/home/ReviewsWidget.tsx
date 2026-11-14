"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { REVIEWS, SITE } from "@/data/site";
import { ChevronLeftThin, QuoteIcon, StarIcon } from "@/components/ui/icons";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex justify-center gap-1.5" role="img" aria-label={`Note moyenne ${rating} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i)) * 100;
        return (
          <span
            key={i}
            className="relative flex size-4 items-center justify-center overflow-hidden rounded-full bg-[#DCD6CB] lg:size-[26px]"
          >
            <span className="absolute inset-y-0 left-0 bg-tt-orange" style={{ width: `${fill}%` }} />
            <StarIcon className="relative size-[10px] text-white lg:size-5" />
          </span>
        );
      })}
    </div>
  );
}

const formatRating = (r: number) => r.toLocaleString("fr-FR", { minimumFractionDigits: 1 });

/** Encart « avis clients » en bas du hero : note moyenne + avis défilants. */
export function ReviewsWidget() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const prev = () => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setIndex((i) => (i + 1) % REVIEWS.length);
  const review = REVIEWS[index];

  return (
    <div
      className="group relative w-48 bg-[#F4F4F4] text-tt-blue lg:w-72"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <QuoteIcon className="absolute -top-4 left-1/2 h-6 -translate-x-1/2 text-tt-grey-light lg:-top-8 lg:h-12" />

      <div className="relative pt-3 lg:pt-6">
        <div className="flex items-center justify-center gap-3 lg:flex-col lg:gap-1.5 lg:pb-3">
          <p className="text-center text-xl font-black text-tt-orange lg:text-2xl">{formatRating(SITE.rating)}/5</p>
          <Stars rating={SITE.rating} />
        </div>

        <div className="hidden min-h-[196px] px-2 pb-4 lg:block" aria-live="polite">
          <div key={index} className="animate-fade-in">
            <p className="mb-2 px-2 text-center text-tt-blue">{review.text}</p>
            <p className="mb-2 text-center font-black text-tt-orange">{review.author}</p>
            <p className="mb-2 text-center font-black text-black">{review.agency}</p>
            <p className="mb-2 text-center text-black">{review.date}</p>
          </div>
        </div>
        <Link
          href="/avis"
          className="block py-2 text-center text-xs font-bold tracking-[.2em] text-tt-blue underline-offset-4 hover:underline lg:hidden"
        >
          VOIR LES AVIS
        </Link>
      </div>

      <button
        type="button"
        aria-label="Avis précédent"
        onClick={prev}
        className="absolute right-full top-1/2 hidden h-52 w-5 -translate-y-1/2 items-center justify-center bg-white/30 opacity-0 transition-opacity hover:bg-white/60 focus:opacity-100 group-hover:opacity-100 lg:flex"
      >
        <ChevronLeftThin className="h-[22px] text-white" />
      </button>
      <button
        type="button"
        aria-label="Avis suivant"
        onClick={next}
        className="absolute left-full top-1/2 hidden h-52 w-5 -translate-y-1/2 items-center justify-center bg-white/30 opacity-0 transition-opacity hover:bg-white/60 focus:opacity-100 group-hover:opacity-100 lg:flex"
      >
        <ChevronLeftThin className="h-[22px] rotate-180 text-white" />
      </button>
    </div>
  );
}
