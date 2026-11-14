export const CONTACT_PRODUCTS = ["la toiture", "la façade", "l'isolation", "l'énergie"] as const;

export type ContactRequest = {
  lastName: string;
  firstName: string;
  postalCodeCity: string;
  phone: string;
  email: string;
  isOwner: "proprietaire" | "locataire";
  houseType: "maison" | "appartement";
  products: string[];
  comment: string;
  partnersConsent: boolean;
  source?: string;
};

export const PARTNERS_NOTICE =
  "Technitoit traite vos informations en toute confidentialité et peut les transmettre à ses partenaires professionnels de la rénovation de l'habitat afin de répondre à votre demande.";

/** Validation partagée client / serveur du formulaire de contact des articles. */
export function validateContact(c: Partial<ContactRequest>): Record<string, string> {
  const e: Record<string, string> = {};
  if (!c.lastName?.trim()) e.lastName = "Veuillez renseigner votre nom.";
  if (!/^\s*(?:0[1-9]|[1-8]\d|9[0-8])\d{3}\b/.test(c.postalCodeCity ?? "")) {
    e.postalCodeCity = "Veuillez saisir un code postal valide (ex. 49000 - Angers).";
  }
  if (!/^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/.test(c.phone?.trim() ?? "")) e.phone = "Numéro de téléphone invalide.";
  const email = (c.email ?? "").trim();
  if (email.length > 254 || !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(email)) e.email = "Adresse email invalide.";
  if (c.isOwner !== "proprietaire" && c.isOwner !== "locataire") e.isOwner = "Veuillez faire un choix.";
  if (c.houseType !== "maison" && c.houseType !== "appartement") e.houseType = "Veuillez faire un choix.";
  if (c.products && !c.products.every((p) => (CONTACT_PRODUCTS as readonly string[]).includes(p))) {
    e.products = "Choix invalide.";
  }
  if ((c.comment ?? "").length > 2000) e.comment = "2000 caractères maximum.";
  return e;
}
