import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { allGenericPaths } from "@/lib/pages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  const now = new Date();
  return ["/", "/devis-gratuit", "/agence", ...allGenericPaths()].map((path) => ({
    url: `${SITE.url}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
