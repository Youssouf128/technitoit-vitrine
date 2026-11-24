import Image from "next/image";
import Link from "next/link";
import { RichText } from "@/components/ui/RichText";
import { ArrowIcon } from "@/components/ui/icons";

export type Issue = { title: string; image: string; alt: string; text: string; href: string; cta: string; note?: string };

type Props = { items: Issue[]; badge?: string; quote?: boolean; ctaLabel?: string };

/** Grille de cartes « problème → solution ». 5 cartes : 3 + 2 équilibrées sur grand écran. */
export function IssueGrid({ items, badge = "Symptôme", quote = true, ctaLabel = "Notre solution" }: Readonly<Props>) {
  const five = items.length === 5;
  return (
    <ul className={`grid gap-5 md:grid-cols-2 lg:gap-6 ${five ? "lg:grid-cols-6" : "lg:grid-cols-3"}`}>
      {items.map((c, i) => (
        <li
          key={c.href + c.title}
          className={`reveal group relative flex flex-col overflow-hidden rounded-3xl border border-tt-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
            five ? (i < 3 ? "lg:col-span-2" : "lg:col-span-3") : ""
          }`}
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={c.image}
              alt={c.alt}
              fill
              sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-tt-blue backdrop-blur">
              {badge} {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-6 lg:p-7">
            <h3 className="text-xl font-extrabold leading-snug">{quote ? `« ${c.title} »` : c.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-tt-muted">
              <RichText text={c.text} />
            </p>
            {c.note && (
              <p className="mt-4 rounded-2xl bg-tt-stone p-4 text-sm leading-relaxed text-tt-muted">
                <RichText text={c.note} />
              </p>
            )}
            <div className="mt-auto pt-6">
              <Link
                href={c.href}
                className="flex items-center justify-between gap-3 border-t border-tt-line pt-5 text-sm font-bold after:absolute after:inset-0 after:content-['']"
              >
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[.14em] text-tt-muted">{ctaLabel}</span>
                  <span className="mt-0.5 block text-base text-tt-orange">{c.cta}</span>
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-tt-orange-soft text-tt-orange transition-colors group-hover:bg-tt-orange group-hover:text-white">
                  <ArrowIcon className="size-4" />
                </span>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
