import Image from "next/image";
import Link from "next/link";
import type { ArticleBlock } from "@/lib/articles-types";
import { EXPERIENCE_BADGES } from "@/data/site";
import { CloseIcon } from "@/components/ui/icons";

type Props = { blocks: ArticleBlock[]; hasForm: boolean };

/** Les ancres vers le formulaire renvoient vers la page devis si l'article n'en a pas. */
const resolveHref = (href: string, hasForm: boolean) =>
  href === "#configurator-anchor" && !hasForm ? "/devis-gratuit" : href;

function SmartLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function Rich({ html, className = "" }: { html: string; className?: string }) {
  // Contenu issu du CMS d'origine, assaini au moment de l'import (balises et attributs en liste blanche).
  return <div className={`tnt-rich-text ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

function Block({ block, hasForm }: { block: ArticleBlock; hasForm: boolean }) {
  switch (block.t) {
    case "rich":
      return <Rich html={block.html} className="mb-10" />;

    case "images": {
      const single = block.items.length === 1;
      return (
        <div
          className={
            single
              ? "mx-auto my-8 block w-fit max-w-full"
              : "my-8 flex flex-wrap items-center justify-center gap-10 lg:flex-nowrap"
          }
        >
          {block.items.map((img) => {
            const el = (
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                sizes="(min-width: 850px) 850px, 100vw"
                unoptimized={img.src.endsWith(".gif") || img.src.endsWith(".svg")}
                className={single ? "h-auto max-w-full" : "h-auto max-h-52 w-auto"}
              />
            );
            return img.href ? (
              <SmartLink key={img.src} href={img.href} className="block">
                {el}
              </SmartLink>
            ) : (
              <div key={img.src}>{el}</div>
            );
          })}
        </div>
      );
    }

    case "button":
      return (
        <div className="my-8 flex justify-center">
          <SmartLink
            href={resolveHref(block.href, hasForm)}
            className="btn-fill-orange inline-block px-5 py-2 text-center font-bold"
          >
            {block.label}
          </SmartLink>
        </div>
      );

    case "table":
      return (
        <div className="mb-10 overflow-hidden rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)]">
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0 text-left">
              {block.head.length > 0 && (
                <thead>
                  <tr>
                    {block.head.map((h) => (
                      <th key={h} className="bg-tt-orange px-2 py-2 text-center font-bold text-white">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i} className="odd:bg-white even:bg-tt-beige/30">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`px-2 py-5 ${i < block.rows.length - 1 ? "border-b border-tt-grey-light" : ""}`}
                        dangerouslySetInnerHTML={{ __html: cell }}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "accordion":
      return (
        <div className="mb-10">
          {block.items.map((item) => (
            <details
              key={item.title}
              className="tt-accordion border-b border-tt-grey-light bg-white px-8 py-8 transition-colors duration-300 open:bg-tt-grey-lighter"
            >
              <summary className="flex cursor-pointer list-none justify-between gap-4 text-lg font-bold">
                <span className="flex gap-2">
                  <span aria-hidden className="mt-2 h-2.5 min-w-2.5 bg-tt-orange" />
                  {item.title}
                </span>
                <span className="flex size-8 min-w-8 items-center justify-center text-tt-orange" aria-hidden>
                  <svg viewBox="0 0 32 32" className="tt-accordion-plus size-full">
                    <path d="M16 2v28M2 16h28" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <CloseIcon className="tt-accordion-close size-5" />
                </span>
              </summary>
              <Rich html={item.html} className="pt-4" />
            </details>
          ))}
        </div>
      );

    case "highlight":
      return (
        <aside className="my-10 flex flex-col gap-6 border border-tt-orange px-6 py-12 text-tt-orange sm:px-16 lg:px-32">
          <p className="text-3xl font-bold">{block.title}</p>
          <Rich html={block.html} className="text-lg" />
        </aside>
      );

    case "cta":
      return (
        <div className="mb-10 mt-11 flex flex-col-reverse overflow-hidden rounded-lg md:flex-row">
          <div className="relative h-[220px] w-full md:h-auto md:max-h-[260px] md:w-4/12">
            <Image src={block.image} alt={block.alt} fill sizes="(min-width: 768px) 300px, 100vw" className="object-cover" />
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-5 bg-tt-blue p-8 md:w-8/12 md:p-10">
            <p className="text-3xl font-bold text-white">{block.title}</p>
            <SmartLink href={resolveHref(block.href, hasForm)} className="btn-fill-orange inline-block px-5 py-2 font-bold">
              {block.label}
            </SmartLink>
          </div>
        </div>
      );

    case "video":
      return (
        <div className="relative mb-10 aspect-video w-full">
          <video src={block.src} controls preload="metadata" className="size-full" />
        </div>
      );

    case "trust":
      return (
        <div className="mt-11 flex h-fit w-full flex-col gap-14 border border-tt-grey-light bg-white px-5 pb-12 pt-11 sm:px-12">
          <div>
            <p className="text-4xl font-bold">Faites confiance</p>
            <p className="text-4xl font-thin">au leader de la rénovation</p>
            <ul className="relative ml-2 mt-8 flex flex-col gap-6 border-l border-tt-grey-light py-2 pl-6">
              {block.items.map((item) => (
                <li key={item} className="flex items-center">
                  <span aria-hidden className="absolute -left-1 min-h-2 min-w-2 bg-tt-orange" />
                  <p className="font-bold">{item}</p>
                </li>
              ))}
            </ul>
          </div>
          {block.image && (
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Image
                src={block.image}
                alt={block.alt || "Technitoit élu Meilleure Chaîne de magasins"}
                width={256}
                height={256}
                className="size-28 sm:size-32"
              />
              {block.html && <Rich html={block.html} className="text-sm" />}
            </div>
          )}
        </div>
      );

    case "badges":
      return (
        <div className="my-8 flex flex-wrap items-center justify-center gap-6">
          {EXPERIENCE_BADGES.map((b) => (
            <Image
              key={b.src}
              src={b.src}
              alt={b.alt}
              width={b.w}
              height={b.h}
              unoptimized={b.src.endsWith(".svg")}
              className="h-auto w-24 sm:w-28"
            />
          ))}
        </div>
      );
  }
}

export function ArticleBlocks({ blocks, hasForm }: Props) {
  return (
    <>
      {blocks.map((b, i) => (
        <Block key={i} block={b} hasForm={hasForm} />
      ))}
    </>
  );
}
