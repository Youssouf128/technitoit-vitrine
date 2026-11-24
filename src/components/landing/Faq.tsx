import { CloseIcon } from "@/components/ui/icons";

/** FAQ en accordéon natif (<details>), avec données structurées FAQPage. */
export function Faq({ items }: Readonly<{ items: { q: string; a: string }[] }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
  return (
    <div className="space-y-3">
      {items.map((i) => (
        <details
          key={i.q}
          className="tt-accordion group rounded-2xl border border-tt-line bg-white px-6 py-5 transition-colors open:border-tt-orange/30 open:bg-tt-stone lg:px-7"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">
            {i.q}
            <span className="grid size-9 min-w-9 place-items-center rounded-full bg-tt-orange-soft text-tt-orange" aria-hidden>
              <svg viewBox="0 0 32 32" className="tt-accordion-plus size-3.5">
                <path d="M16 2v28M2 16h28" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
              <CloseIcon className="tt-accordion-close size-3" />
            </span>
          </summary>
          <p className="pt-4 leading-relaxed text-tt-muted">{i.a}</p>
        </details>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
