"use client";

import { useState } from "react";
import { BEFORE_AFTER } from "@/data/site";
import { ArrowIcon } from "@/components/ui/icons";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

type Item = { before: string; after: string; w: number; h: number; label: string; ratio?: number };

export function BeforeAfterCarousel({ items = BEFORE_AFTER }: { items?: Item[] }) {
  const [index, setIndex] = useState(0);
  const count = items.length;
  const go = (i: number) => setIndex((i + count) % count);

  return (
    <div className="w-full" aria-roledescription="carrousel" aria-label="Réalisations avant / après">
      <div className="overflow-hidden rounded-3xl shadow-lift">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item, i) => (
            <div
              key={item.before}
              className="w-full flex-none"
              aria-hidden={i !== index}
              inert={i !== index}
              role="group"
              aria-roledescription="diapositive"
              aria-label={`${i + 1} sur ${count}`}
            >
              <BeforeAfterSlider
                before={item.before}
                after={item.after}
                width={item.w}
                height={item.h}
                label={item.label}
                ratio={item.ratio}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-5">
        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.before}
              type="button"
              aria-label={`Voir la réalisation ${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-tt-orange" : "w-2 bg-tt-blue/20 hover:bg-tt-blue/40"}`}
            />
          ))}
          <span className="ml-3 text-sm font-semibold text-tt-muted">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Réalisation précédente"
            onClick={() => go(index - 1)}
            className="grid size-12 place-items-center rounded-full border border-tt-blue/15 bg-white text-tt-blue transition-colors hover:border-tt-blue hover:bg-tt-blue hover:text-white"
          >
            <ArrowIcon className="size-5 rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Réalisation suivante"
            onClick={() => go(index + 1)}
            className="grid size-12 place-items-center rounded-full bg-tt-orange text-white transition-colors hover:bg-tt-orange-dark"
          >
            <ArrowIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
