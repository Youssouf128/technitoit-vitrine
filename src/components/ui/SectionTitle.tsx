import type { ElementType } from "react";

type Props = {
  light: string;
  bold: string;
  /** Affiche les deux parties sur une seule ligne à partir de `lg`. */
  inlineOnDesktop?: boolean;
  /** Masque le petit carré orange. */
  noSquare?: boolean;
  className?: string;
  as?: ElementType;
  id?: string;
};

/**
 * Titre de section signature : un petit carré orange suivi d'un titre
 * en deux graisses (« l'expérience » en extra-light / « Technitoit » en black).
 */
export function SectionTitle({ light, bold, inlineOnDesktop, noSquare, className = "", as: Tag = "h2", id }: Props) {
  return (
    <Tag id={id} className={`flex gap-5 text-[38px] leading-[43px] lg:text-5xl lg:leading-[1.05] xl:text-7xl ${className}`}>
      {!noSquare && (
        <span className="flex h-8.5 shrink-0 items-end xl:h-14" aria-hidden>
          <span className="size-3.5 bg-tt-orange" />
        </span>
      )}
      <span className={`flex flex-col ${inlineOnDesktop ? "lg:flex-row" : ""}`}>
        <span className="font-extralight">{light}</span>
        {inlineOnDesktop && <span className="hidden lg:inline">&nbsp;</span>}
        <span className="font-black">{bold}</span>
      </span>
    </Tag>
  );
}
