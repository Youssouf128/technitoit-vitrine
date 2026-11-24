import type { ReactNode } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";

type Props = { id: string; eyebrow: string; title: ReactNode; aside?: ReactNode; tone?: "dark" | "light" };

/** En-tête de section : titre à gauche, chapô aligné à droite sur grand écran. */
export function SectionHead({ id, eyebrow, title, aside, tone }: Readonly<Props>) {
  return (
    <div className="mb-12 flex flex-col justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
      <SectionTitle id={id} eyebrow={eyebrow} title={title} tone={tone} />
      {aside && (
        <p className={`max-w-md lg:text-right ${tone === "light" ? "text-white/70" : "text-tt-muted"}`}>{aside}</p>
      )}
    </div>
  );
}
