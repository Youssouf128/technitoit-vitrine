/** Nœuds des pages importées du CMS d'origine (voir src/data/pages/*.json). */
export type CmsElement = {
  t: string;
  c?: string;
  s?: string;
  a?: Record<string, string>;
  k?: CmsNode[];
};

export type CmsImage = { t: "img"; src: string; alt: string; c?: string; s?: string; w?: number; h?: number };
export type CmsVideo = { t: "video"; src: string; c?: string; auto?: boolean; loop?: boolean; muted?: boolean; controls?: boolean };

type Slide = { x: "beforeAfter"; before: string; after: string; w: number; h: number; ratio?: number };

export type CmsSpecial =
  | { x: "svg"; html: string }
  | { x: "jsonld"; json: string }
  | { x: "bg"; anchor: string; offset: string }
  | { x: "configurator" }
  | Slide
  | { x: "carousel"; slides: Slide[] }
  | { x: "accordion"; title: string; k: CmsNode[] };

export type CmsNode = string | CmsSpecial | CmsImage | CmsVideo | CmsElement;

export type CmsPage = {
  path: string;
  title: string;
  description: string;
  header: "transparent" | "white";
  tree: CmsNode[];
};
