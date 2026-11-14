import options from "./configurator-options.json";

export type Choice = { value: string; label: string; icon: string };
export type Product = { id: string; label: string; icon: string };
export type Category = { id: string; label: string; icon: string; products: Product[] };

/** Options du configurateur, reprises telles quelles du site d'origine (libellés et illustrations). */
export const HOUSING: Choice[] = options.housing;
export const PROFILES: Choice[] = options.profiles;
export const CATEGORIES: Category[] = options.categories;
export const STEPS: { title: string; hint: string }[] = options.steps;

export const CONFIGURATOR_TEXTS = {
  title: "Demandez un devis pour vos travaux de rénovation",
  continue: "Continuer",
  back: "Retour",
  consentLabel: "Recevoir les offres de nos partenaires*",
  consentTerms:
    "*Technitoit traite vos informations en toute confidentialité et peut les transmettre à ses partenaires professionnels de la rénovation de l'habitat afin de répondre à votre demande.",
  postalCodeError: "Le code postal renseigné ne correspond pas à une saisie valide",
  endTitle: "Merci pour votre demande !",
  endSubtitle: "Nous allons vous contacter dans les meilleurs délais.",
};

export type QuoteRequest = {
  housing: string;
  area: string;
  categories: string[];
  /** id de catégorie -> ids de prestations */
  products: Record<string, string[]>;
  profile: string;
  gender: "madame" | "monsieur" | "";
  firstName: string;
  lastName: string;
  postalCode: string;
  phone: string;
  email: string;
  partnersConsent: boolean;
};

export const isPostalCode = (v: string) => /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/.test(v.trim());
export const isPhone = (v: string) => /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/.test(v.trim());
export const isEmail = (v: string) => {
  const e = v.trim();
  return e.length <= 254 && /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(e);
};
export const isPositiveInt = (v: string) => /^[1-9]\d{0,5}$/.test(v.trim());

/** Validation complète (côté serveur et avant envoi). Retourne un dictionnaire champ -> message. */
export function validateQuote(q: Partial<QuoteRequest>): Record<string, string> {
  const e: Record<string, string> = {};
  if (!HOUSING.some((h) => h.value === q.housing)) e.housing = "Type de logement invalide.";
  if (!isPositiveInt(q.area ?? "")) e.area = "Superficie invalide.";
  const cats = q.categories ?? [];
  if (!cats.length || !cats.every((c) => CATEGORIES.some((x) => x.id === c))) e.categories = "Sélectionnez au moins un type de travaux.";
  for (const c of cats) {
    const cat = CATEGORIES.find((x) => x.id === c);
    const chosen = q.products?.[c] ?? [];
    if (cat && (!chosen.length || !chosen.every((p) => cat.products.some((x) => x.id === p)))) {
      e[`products.${c}`] = `Sélectionnez au moins une prestation (${cat.label}).`;
    }
  }
  if (!PROFILES.some((p) => p.value === q.profile)) e.profile = "Profil invalide.";
  if (q.gender !== "madame" && q.gender !== "monsieur") e.gender = "Civilité requise.";
  if (!q.firstName?.trim()) e.firstName = "Prénom requis.";
  if (!q.lastName?.trim()) e.lastName = "Nom requis.";
  if (!isPostalCode(q.postalCode ?? "")) e.postalCode = CONFIGURATOR_TEXTS.postalCodeError;
  if (!isPhone(q.phone ?? "")) e.phone = "Numéro de téléphone invalide.";
  if (!isEmail(q.email ?? "")) e.email = "Adresse email invalide";
  return e;
}
