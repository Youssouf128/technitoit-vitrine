import { FOOTER_COLUMNS, MOBILE_LINKS, NAVIGATION, PRESTATIONS, REGIONS, type NavCategory, type NavLink } from "@/data/site";
import { departments } from "@/data/france-map";
import { DEPARTMENT_NAMES } from "@/data/departments";

export type Crumb = { label: string; href: string };

export type ResolvedPage =
  | { kind: "category"; title: string; category: NavCategory; image: string; intro: string; crumbs: Crumb[] }
  | { kind: "service"; title: string; category: NavCategory; image: string; crumbs: Crumb[] }
  | { kind: "region"; title: string; region: NavLink; departments: { label: string; href: string }[]; crumbs: Crumb[] }
  | { kind: "department"; title: string; region?: NavLink; number: string; crumbs: Crumb[] }
  | { kind: "info"; title: string; crumbs: Crumb[] };

const HOME: Crumb = { label: "Accueil", href: "/" };

const CATEGORY_IMAGE: Record<string, string> = {
  "/renovation-toiture": "/images/prestation_toiture.jpg",
  "/renovation-facade": "/images/prestation_facade.jpg",
  "/isolation": "/images/prestation_isolation.jpg",
  "/energie": "/images/prestation_energie.jpg",
  "/amenagement-exterieur": "/images/1_apres_desktop.webp",
};

const CATEGORY_INTRO: Record<string, string> = {
  "/amenagement-exterieur":
    "Pergolas bioclimatiques ou solaires, carports et auvents : Technitoit vous accompagne pour aménager vos espaces extérieurs avec des solutions durables, esthétiques et sur-mesure.",
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function categoryTitle(cat: NavCategory) {
  return cat.href === "/amenagement-exterieur" ? "Aménagement extérieur" : capitalize(cat.label);
}

export function resolvePage(path: string): ResolvedPage | null {
  for (const cat of NAVIGATION) {
    const catCrumb = { label: categoryTitle(cat), href: cat.href };
    if (cat.href === path) {
      const prestation = PRESTATIONS.find((p) => p.href === cat.href);
      return {
        kind: "category",
        title: cat.href.startsWith("/renovation") ? `Rénovation ${cat.label}` : categoryTitle(cat),
        category: cat,
        image: CATEGORY_IMAGE[cat.href],
        intro: prestation?.text ?? CATEGORY_INTRO[cat.href] ?? "",
        crumbs: [HOME, catCrumb],
      };
    }
    const link = cat.links.find((l) => l.href === path);
    if (link) {
      return {
        kind: "service",
        title: link.label,
        category: cat,
        image: CATEGORY_IMAGE[cat.href],
        crumbs: [HOME, catCrumb, { label: link.label, href: link.href }],
      };
    }
  }

  const region = REGIONS.find((r) => r.href === path);
  if (region) {
    return {
      kind: "region",
      title: `Technitoit en ${region.label}`,
      region,
      departments: departments
        .filter((d) => d.href?.startsWith(`${region.href}/`))
        .map((d) => ({ label: `${DEPARTMENT_NAMES[d.n] ?? d.n} (${d.n})`, href: d.href! }))
        .sort((a, b) => a.label.localeCompare(b.label, "fr")),
      crumbs: [HOME, { label: "Nos agences", href: "/agence" }, region],
    };
  }

  const dep = departments.find((d) => d.href === path);
  if (dep) {
    const parent = REGIONS.find((r) => path.startsWith(`${r.href}/`));
    const name = DEPARTMENT_NAMES[dep.n] ?? dep.n;
    return {
      kind: "department",
      title: `Technitoit ${name} (${dep.n})`,
      region: parent,
      number: dep.n,
      crumbs: [HOME, { label: "Nos agences", href: "/agence" }, ...(parent ? [parent] : []), { label: name, href: path }],
    };
  }

  const infoLinks = [...FOOTER_COLUMNS.flatMap((c) => c.links), ...MOBILE_LINKS];
  const info = infoLinks.find((l) => l.href === path);
  if (info) {
    const title = capitalize(info.label.toLowerCase());
    return { kind: "info", title, crumbs: [HOME, { label: title, href: path }] };
  }

  return null;
}

/** Tous les chemins servis par la route générique `[...slug]`. */
export function allGenericPaths(): string[] {
  const reserved = new Set(["/", "/agence", "/devis-gratuit", "/recherche", "/actualites"]);
  const paths = new Set<string>([
    ...NAVIGATION.flatMap((c) => [c.href, ...c.links.map((l) => l.href)]),
    ...REGIONS.map((r) => r.href),
    ...departments.flatMap((d) => (d.href ? [d.href] : [])),
    ...FOOTER_COLUMNS.flatMap((c) => c.links.map((l) => l.href)),
    ...MOBILE_LINKS.map((l) => l.href),
  ]);
  return [...paths].filter((p) => !reserved.has(p));
}
