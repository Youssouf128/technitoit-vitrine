"use client";

import Image from "next/image";
import { useState } from "react";
import { ENERGY_VIDEOS } from "@/data/energie";
import { PlayIcon } from "@/components/ui/icons";

/** Vidéo de présentation : vignette légère, la vidéo n'est chargée qu'au clic. */
export function EnergyVideo() {
  const [src, setSrc] = useState<string | null>(null);

  function play() {
    const portrait = window.matchMedia("(max-width: 767px)").matches;
    setSrc(portrait ? ENERGY_VIDEOS.portrait : ENERGY_VIDEOS.landscape);
  }

  return (
    <div className="relative aspect-[9/14] overflow-hidden rounded-3xl bg-tt-navy shadow-lift md:aspect-video">
      {src ? (
        <video src={src} className="size-full object-cover" controls autoPlay playsInline />
      ) : (
        <button type="button" onClick={play} className="group absolute inset-0 isolate text-white" aria-label="Lire la vidéo de présentation">
          <Image
            src="/images/pages/19d1acdfda-panneaux_solaires.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-tt-navy/85 via-tt-navy/30 to-tt-navy/10" />
          <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-tt-orange shadow-glow transition-transform duration-300 group-hover:scale-110">
            <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-tt-orange/40 motion-reduce:animate-none" />
            <PlayIcon className="relative ml-1 size-8" />
          </span>
          <span className="absolute bottom-6 left-6 text-left">
            <span className="block text-xs font-bold uppercase tracking-[.18em] text-tt-orange-light">En vidéo</span>
            <span className="mt-1 block text-lg font-bold">La rénovation énergétique avec Technitoit</span>
          </span>
        </button>
      )}
    </div>
  );
}
