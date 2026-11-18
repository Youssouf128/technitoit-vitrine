"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  before: string;
  after: string;
  width: number;
  height: number;
  label: string;
  /** Ratio largeur/hauteur imposé (sinon celui de l'image) */
  ratio?: number;
};

/** Comparateur avant / après piloté par un <input type="range"> (souris, tactile et clavier). */
export function BeforeAfterSlider({ before, after, width, height, label, ratio }: Props) {
  const [pos, setPos] = useState(50);

  return (
    <div className="ci-slider" style={{ aspectRatio: ratio ? String(ratio) : `${width} / ${height}` }}>
      <Image
        src={before}
        alt={`${label} - avant travaux`}
        fill
        sizes="(min-width: 768px) 768px, 100vw"
        className="object-cover"
        draggable={false}
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Image
          src={after}
          alt={`${label} - après travaux`}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 z-[2] rounded-full bg-tt-navy/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
        Avant
      </span>
      <span className="pointer-events-none absolute right-4 top-4 z-[2] rounded-full bg-tt-orange px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
        Après
      </span>

      <div className="ci-slider__divider" style={{ left: `${pos}%` }}>
        <div className="ci-slider__handle" />
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Comparer avant et après : ${label}`}
        className="absolute inset-0 z-[3] h-full w-full cursor-col-resize appearance-none opacity-0"
      />
    </div>
  );
}
