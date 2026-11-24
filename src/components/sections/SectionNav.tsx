"use client";

import { useEffect, useState } from "react";

type Props = { items: readonly { id: string; label: string }[] };

/** Sommaire collant sous le header, qui suit la section en cours de lecture. */
export function SectionNav({ items }: Readonly<Props>) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Sommaire de la page" className="sticky top-16 z-40 border-b border-tt-line bg-white/90 backdrop-blur-xl lg:top-[76px]">
      <div className="content-container flex h-14 items-center">
        <ul className="-mx-5 flex flex-1 gap-1 overflow-x-auto px-5 [scrollbar-width:none] lg:mx-0 lg:px-0">
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={active === i.id ? "location" : undefined}
                className={`inline-flex h-9 items-center whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors ${
                  active === i.id ? "bg-tt-blue text-white" : "text-tt-muted hover:bg-tt-stone hover:text-tt-blue"
                }`}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
