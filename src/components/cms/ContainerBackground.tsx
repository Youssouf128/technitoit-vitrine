"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fond gris clair qui part de son conteneur et descend jusqu'au milieu de l'élément `anchorId`
 * (reproduit le composant du site d'origine).
 */
export function ContainerBackground({ anchor, offset = 0 }: { anchor: string; offset?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const compute = () => {
      const el = ref.current;
      const target = document.getElementById(anchor);
      if (!el || !target) return;
      const a = target.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      setHeight(Math.max(0, a.top + a.height / 2 + offset - b.top));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(document.body);
    window.addEventListener("load", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", compute);
    };
  }, [anchor, offset]);

  return <div ref={ref} aria-hidden className="absolute left-0 top-0 -z-10 w-full bg-[#F2F2F2]" style={{ height }} />;
}
