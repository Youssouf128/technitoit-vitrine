// Pages reproduites à l'identique depuis le CMS d'origine (rendues par <CmsTree/>).
// À n'importer que côté serveur : chaque JSON pèse 20 à 75 Ko.
import type { CmsPage } from "./cms-types";
import renovationToiture from "@/data/pages/renovation-toiture.json";
import renovationFacade from "@/data/pages/renovation-facade.json";
import isolation from "@/data/pages/isolation.json";
import energie from "@/data/pages/energie.json";
import amenagementExterieur from "@/data/pages/amenagement-exterieur.json";

const PAGES = [renovationToiture, renovationFacade, isolation, energie, amenagementExterieur] as unknown as CmsPage[];

const BY_PATH = new Map(PAGES.map((p) => [p.path, p]));

export function getCmsPage(path: string): CmsPage | undefined {
  return BY_PATH.get(path);
}
