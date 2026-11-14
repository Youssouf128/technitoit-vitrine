export type ArticleMeta = {
  slug: string;
  /** Titre affiché dans les listes */
  title: string;
  /** Libellé court du fil d'Ariane */
  crumb: string;
  /** Titre H1 de la page article */
  h1: string;
  metaTitle: string;
  description: string;
  /** Date ISO (AAAA-MM-JJ) */
  date: string;
  /** Date longue telle qu'affichée (« 12 octobre 2026 ») */
  publishedLabel: string;
  readingTime: string;
  tag: string;
  tags: string[];
  image: string | null;
  imageAlt: string;
  heroImage: string | null;
  heroW: number;
  heroH: number;
  /** Affiche le formulaire de contact en bas de l'article */
  hasForm: boolean;
};

export type ArticleImage = { src: string; alt: string; w: number; h: number; href?: string };

export type ArticleBlock =
  | { t: "rich"; html: string }
  | { t: "images"; items: ArticleImage[] }
  | { t: "button"; label: string; href: string }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "accordion"; items: { title: string; html: string }[] }
  | { t: "highlight"; title: string; html: string }
  | { t: "cta"; image: string; alt: string; title: string; label: string; href: string }
  | { t: "video"; src: string }
  | { t: "badges" }
  | { t: "trust"; items: string[]; image?: string; alt?: string; w?: number; h?: number; html: string };
