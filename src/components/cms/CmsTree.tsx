import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { createElement } from "react";
import type { CmsElement, CmsImage, CmsNode, CmsVideo } from "@/lib/cms-types";
import { QuoteConfigurator } from "@/components/home/QuoteConfigurator";
import { BeforeAfterSlider } from "@/components/home/BeforeAfterSlider";
import { BeforeAfterCarousel } from "@/components/home/BeforeAfterCarousel";
import { CloseIcon } from "@/components/ui/icons";
import { ContainerBackground } from "./ContainerBackground";

const ALLOWED_TAGS = new Set([
  "div", "section", "article", "aside", "header", "footer", "nav", "main", "p", "span", "strong", "b", "em", "i", "u",
  "small", "sup", "sub", "br", "hr", "a", "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "figure", "figcaption", "label", "dl", "dt", "dd", "search",
]);
const VOID_TAGS = new Set(["br", "hr"]);
const ATTR_RENAME: Record<string, string> = { for: "htmlFor", colspan: "colSpan", rowspan: "rowSpan" };

/** « a:b;--c:d » -> objet de style React (variables CSS conservées). */
function parseStyle(s?: string): CSSProperties | undefined {
  if (!s) return undefined;
  const out: Record<string, string> = {};
  for (const decl of s.split(";")) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    const value = decl.slice(i + 1).trim();
    if (!prop || !value) continue;
    out[prop.startsWith("--") ? prop : prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())] = value;
  }
  return out as CSSProperties;
}

function renderNode(node: CmsNode, key: number): ReactNode {
  if (typeof node === "string") return node;

  if ("x" in node) {
    switch (node.x) {
      case "svg":
        return <span key={key} className="contents" dangerouslySetInnerHTML={{ __html: node.html }} />;
      case "jsonld":
        return <script key={key} type="application/ld+json" dangerouslySetInnerHTML={{ __html: node.json }} />;
      case "bg":
        return <ContainerBackground key={key} anchor={node.anchor} offset={Number.parseInt(node.offset, 10) || 0} />;
      case "configurator":
        // Le conteneur d'origine (#configurator-anchor, h-[704px] lg:h-[512px]) est déjà dans l'arbre
        return <QuoteConfigurator key={key} />;
      case "beforeAfter":
        return <BeforeAfterSlider key={key} before={node.before} after={node.after} width={node.w} height={node.h} ratio={node.ratio} label="Rénovation" />;
      case "carousel":
        return (
          <BeforeAfterCarousel
            key={key}
            items={node.slides.map((s, i) => ({ before: s.before, after: s.after, w: s.w, h: s.h, ratio: s.ratio, label: `Réalisation ${i + 1}` }))}
          />
        );
      case "accordion":
        return (
          <details
            key={key}
            className="tt-accordion mb-3 rounded-2xl border border-tt-line bg-white px-6 py-5 transition-colors duration-300 open:border-tt-orange/30 open:bg-tt-stone lg:px-8 lg:py-6"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">
              <span>{node.title}</span>
              <span className="grid size-9 min-w-9 place-items-center rounded-full bg-tt-orange-soft text-tt-orange" aria-hidden>
                <svg viewBox="0 0 32 32" className="tt-accordion-plus size-3.5">
                  <path d="M16 2v28M2 16h28" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
                <CloseIcon className="tt-accordion-close size-3" />
              </span>
            </summary>
            <div className="pt-4">{renderChildren(node.k)}</div>
          </details>
        );
    }
  }

  if (node.t === "img") return renderImage(node as CmsImage, key);
  if (node.t === "video") return renderVideo(node as CmsVideo, key);
  return renderElement(node as CmsElement, key);
}

function renderImage(node: CmsImage, key: number): ReactNode {
  const style = parseStyle(node.s);
  if (node.w && node.h) {
    return (
      <Image
        key={key}
        src={node.src}
        alt={node.alt}
        width={Math.min(node.w, 1920)}
        height={Math.round((Math.min(node.w, 1920) / node.w) * node.h)}
        sizes={node.hero ? "100vw" : "(min-width: 1280px) 1280px, 100vw"}
        preload={node.hero}
        unoptimized={node.src.endsWith(".svg") || node.src.endsWith(".gif")}
        className={node.c}
        style={style}
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img key={key} src={node.src} alt={node.alt} className={node.c} style={style} loading="lazy" />;
}

function renderVideo(node: CmsVideo, key: number): ReactNode {
  return (
    <video
      key={key}
      src={node.src}
      className={node.c}
      controls={node.controls || !node.auto}
      autoPlay={node.auto}
      loop={node.loop}
      muted={node.muted || node.auto}
      playsInline
      preload="metadata"
      width="100%"
      height="100%"
    />
  );
}

function renderElement(node: CmsElement, key: number): ReactNode {
  const tag = ALLOWED_TAGS.has(node.t) ? node.t : "div";
  const props: Record<string, unknown> = { key, className: node.c, style: parseStyle(node.s) };
  for (const [k, v] of Object.entries(node.a ?? {})) props[ATTR_RENAME[k] ?? k] = v;

  if (tag === "a") {
    const href = String(node.a?.href ?? "#");
    const children = renderChildren(node.k);
    if (href.startsWith("/") && !href.startsWith("//")) {
      return (
        <Link key={key} href={href} className={node.c} style={props.style as CSSProperties} id={node.a?.id}>
          {children}
        </Link>
      );
    }
    const external = /^https?:/.test(href);
    return createElement(
      "a",
      { ...props, href, ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}) },
      children,
    );
  }

  if (VOID_TAGS.has(tag)) return createElement(tag, props);
  return createElement(tag, props, renderChildren(node.k));
}

function renderChildren(nodes?: CmsNode[]): ReactNode {
  if (!nodes?.length) return null;
  return nodes.map((n, i) => renderNode(n, i));
}

export function CmsTree({ nodes }: Readonly<{ nodes: CmsNode[] }>) {
  return <>{renderChildren(nodes)}</>;
}
