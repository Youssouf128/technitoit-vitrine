import type { ElementType, ReactNode } from "react";

type Props = {
  /** Petit sur-titre orange (ex. « Nos prestations »). */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** `light` pour les sections sur fond sombre. */
  tone?: "dark" | "light";
  className?: string;
  as?: ElementType;
  id?: string;
};

/** Partie du titre mise en avant en orange. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-tt-orange">{children}</span>;
}

/** En-tête de section : sur-titre, titre fort et chapô optionnel. */
export function SectionTitle({ eyebrow, title, description, align = "left", tone = "dark", className = "", as: Tag = "h2", id }: Props) {
  const center = align === "center";
  return (
    <div className={`flex flex-col gap-4 ${center ? "items-center text-center" : "items-start"} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag
        id={id}
        className={`max-w-3xl text-[2rem] font-extrabold leading-[1.08] sm:text-4xl lg:text-[2.75rem] ${
          tone === "light" ? "text-white" : "text-tt-blue"
        }`}
      >
        {title}
      </Tag>
      {description && (
        <p className={`max-w-2xl text-base leading-relaxed sm:text-lg ${tone === "light" ? "text-white/70" : "text-tt-muted"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
