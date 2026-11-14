import Link from "next/link";

type Crumb = { label: string; href?: string };

const Chevron = () => (
  <svg viewBox="0 0 3 10" className="h-[1em] w-[0.3em]" aria-hidden>
    <path
      fill="currentColor"
      d="M0.821406 8.81802L2.26289 5.18212C2.34342 4.98079 2.43603 4.73917 2.43603 4.54592C2.43603 4.35667 2.34342 4.10703 2.26289 3.90973L0.821406 0.273802C0.752954 0.104689 0.603973 0 0.446939 0C0.193272 0 0 0.189245 0 0.442915C0 0.567735 0.0684506 0.740878 0.112742 0.853616L1.69516 4.8479V4.24394L0.112742 8.23823C0.0684506 8.35095 0 8.52008 0 8.65293C0 8.90663 0.193272 9.09584 0.446939 9.09584C0.603973 9.09584 0.752954 8.99115 0.821406 8.81802Z"
    />
  </svg>
);

/** Fil d'Ariane « Accueil › Actualités › … » des pages actualités. */
export function ArticleBreadcrumbs({ crumbs, className = "" }: { crumbs: Crumb[]; className?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `https://www.technitoit.com${c.href === "/" ? "/" : c.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Fil d'Ariane" className={className}>
      <ol className="flex min-w-0 items-center">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.label} className={`flex min-w-0 items-center ${last ? "" : "shrink-0"}`}>
              {last || !c.href ? (
                <span aria-current={last ? "page" : undefined} className="truncate px-2 font-bold">
                  {c.label}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="text-nowrap px-2 font-light hover:text-tt-orange">
                    {c.label}
                  </Link>
                  <span className="flex items-center px-2 text-xs">
                    <Chevron />
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
