"use client";

import { useState } from "react";
import { BEFORE_AFTER } from "@/data/site";
import { ArrowRight } from "@/components/ui/icons";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

type Item = { before: string; after: string; w: number; h: number; label: string; ratio?: number };

export function BeforeAfterCarousel({ items = BEFORE_AFTER }: { items?: Item[] }) {
  const [index, setIndex] = useState(0);
  const count = items.length;
  const go = (i: number) => setIndex((i + count) % count);

  return (
    <div className="w-full" aria-roledescription="carrousel" aria-label="Réalisations avant / après">
      <div className="overflow-hidden">
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
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pl-3 pt-2">
        <div className="flex gap-2">
          {items.map((item, i) => (
            <button
              key={item.before}
              type="button"
              aria-label={`Voir la réalisation ${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={`size-3 rounded-full transition-colors ${i === index ? "border-2 border-tt-orange bg-white" : "bg-tt-grey-light hover:bg-tt-beige-dark"}`}
            />
          ))}
        </div>
        <div className="flex items-center">
          <button type="button" aria-label="Réalisation précédente" onClick={() => go(index - 1)}>
            <ArrowRight className="size-10 rotate-180 stroke-2 text-tt-grey-light transition-colors hover:text-tt-blue" />
          </button>
          <button type="button" aria-label="Réalisation suivante" onClick={() => go(index + 1)} className="mr-4">
            <ArrowRight className="size-16 stroke-2 text-tt-blue transition-colors hover:text-tt-orange" />
          </button>
        </div>
      </div>
    </div>
  );
}
