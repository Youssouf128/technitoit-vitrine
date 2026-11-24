/** Contenu de la page /renovation-toiture (repris de la page CMS d'origine). Les segments entre ** sont mis en gras. */

export const TOITURE_SECTIONS = [
  { id: "causes", label: "Causes" },
  { id: "prestations", label: "Prestations" },
  { id: "types_de_couverture", label: "Types de couverture" },
  { id: "cout", label: "Coût" },
  { id: "expertise", label: "Expertise" },
] as const;

export const TOITURE_VIDEOS = {
  landscape: "https://a.storyblok.com/f/284071/x/f391064154/toiture_video_landscape.mp4",
  portrait: "https://a.storyblok.com/f/284071/x/762367c5de/toiture_video_portrait.mp4",
};

export type ToitureCause = { title: string; image: string; alt: string; text: string; href: string; cta: string };

export const TOITURE_CAUSES: ToitureCause[] = [
  {
    title: "J’ai de la mousse sur ma toiture",
    image: "/images/pages/5d7558fba8-mousse.jpeg",
    alt: "Mousse",
    text: "Vous observez de la **mousse ou des verdissures sur votre toiture** ? Votre professionnel Technitoit vous conseille de réaliser un démoussage toiture avec un de ses experts.",
    href: "/renovation-toiture/demoussage-toiture",
    cta: "Le démoussage toiture",
  },
  {
    title: "J’ai une fuite dans mon toit",
    image: "/images/pages/6398efb5b7-fuite.jpg",
    alt: "Fuite",
    text: "Vous avez remarqué une **fuite dans votre toiture** ? Il peut s’agir de tuiles ou d’ardoises cassées qui laissent désormais l’eau s’y infiltrer. Faites venir un expert de la toiture pour analyser l’état de votre couverture afin de savoir si vous avez besoin d’une réfection complète.",
    href: "/renovation-toiture/refection-toiture",
    cta: "La réfection toiture",
  },
  {
    title: "Je veux rénover mes accessoires de toit",
    image: "/images/pages/185e0a74a1-accessoires_toit.jpg",
    alt: "Accessoires toit",
    text: "Une gouttière cassée, un cache-moineau endommagé, un faîtage à refaire ? **Technitoit remplace vos accessoires de toit** abîmés pour une finition impeccable et des accessoires fonctionnels pour le bien de votre toiture.",
    href: "/renovation-toiture/accessoires-finitions",
    cta: "Les accessoires de toit",
  },
  {
    title: "Je veux repeindre ma toiture",
    image: "/images/pages/31c58f881e-repeindre.jpg",
    alt: "Repeindre",
    text: "Vous souhaitez donner un coup de neuf à votre couverture ? Technitoit vous propose **l’hydrofuge toiture** : en plus de redonner son aspect d’antan à la toiture, celle-ci sera entièrement protégée de l’eau !",
    href: "/renovation-toiture/hydrofuge-toiture",
    cta: "L’hydrofuge toiture",
  },
  {
    title: "Ma toiture est sale",
    image: "/images/pages/1dc4978959-toiture-sale.jpg",
    alt: "Couvreur en train de nettoyer sa toiture",
    text: "Vous remarquez des traces de salissures voire des traces de verdissures sur votre toit ? Technitoit vous propose un **nettoyage complet de votre toiture**, comprenant également un traitement anti-verdissures.",
    href: "/renovation-toiture/nettoyage-toiture",
    cta: "Le nettoyage toiture",
  },
  {
    title: "J’ai des insectes dans ma charpente",
    image: "/images/pages/d5233ff403-insectes.jpeg",
    alt: "Insectes",
    text: "Vous avez observé la **présence de petits insectes dans votre charpente** ? Des trous ou de la vermoulure dans le bois ? Vous avez vite besoin d’un traitement curatif pour votre charpente !",
    href: "/renovation-toiture/traitement-de-bois",
    cta: "Le traitement de bois de charpente",
  },
];

export const TOITURE_PRESTATIONS = [
  { label: "Démoussage toiture", href: "/renovation-toiture/demoussage-toiture" },
  { label: "Nettoyage toiture", href: "/renovation-toiture/nettoyage-toiture" },
  { label: "Hydrofuge toiture", href: "/renovation-toiture/hydrofuge-toiture" },
  { label: "Réfection de toiture", href: "/renovation-toiture/refection-toiture" },
  { label: "Rénovation des accessoires de toit", href: "/renovation-toiture/accessoires-finitions" },
  { label: "Traitement de bois de charpente", href: "/renovation-toiture/traitement-de-bois" },
];

export type ToitureMaterial = {
  title: string;
  tag: string;
  image: string;
  alt: string;
  /** Paragraphes : texte avec ** pour le gras et [libellé](lien) pour les liens. */
  paragraphs: string[];
};

export const TOITURE_MATERIALS: ToitureMaterial[] = [
  {
    title: "Rénovation de toiture en tuile",
    tag: "Tuile",
    image: "/images/pages/e24a21eb92-toiture_tuile.jpg",
    alt: "Toiture tuile",
    paragraphs: [
      "Technitoit réalise **la rénovation de toiture en tuiles**. Comme tous les matériaux, malgré leur durabilité, les tuiles peuvent subir des dommages au fil du temps.",
      "Les techniciens Technitoit peuvent s’occuper de vos travaux de [rénovation de toiture en tuile](/actualites/quel-prix-pour-une-renovation-de-toiture-en-tuiles) : remplacement des tuiles endommagées, nettoyage de la toiture, application d’un hydrofuge toiture ou rénovation des accessoires de toit.",
    ],
  },
  {
    title: "Rénovation de toiture en ardoise",
    tag: "Ardoise",
    image: "/images/pages/e253a95c68-toiture-ardoise.jpg",
    alt: "maison avec une toiture en ardoise",
    paragraphs: [
      "L’ardoise, matériau noble et résistant, est sujette à l’usure naturelle et nécessite une attention particulière pour éviter les infiltrations d’eau. **La rénovation toiture ardoise** implique souvent le remplacement des ardoises fissurées ou manquantes et la révision des fixations.",
      "**La rénovation de toiture en ardoise** chez Technitoit passe aussi par son entretien et sa protection avec notamment l’application [d’un hydrofuge toiture](/actualites/renovation-de-toiture-quest-ce-quun-hydrofuge-ardoise).",
    ],
  },
  {
    title: "Rénovation de toiture fibro",
    tag: "Fibrociment",
    image: "/images/pages/11d6e08e44-toiture_ardoise_fibrociment.jpg",
    alt: "Toiture ardoise fibrociment",
    paragraphs: [
      "**La rénovation de toiture fibro ciment** nécessite une attention particulière notamment à cause de la présence potentielle d’amiante. Technitoit grâce à son système breveté (la cloche amiante) peut procéder en toute sécurité à la [rénovation de votre toiture en amiante](/renovation-toiture/nettoyage-toiture/nettoyage-toiture-amiante).",
      "**La rénovation de toiture fibro** inclut la vérification de l’état général du matériau, le remplacement des sections endommagées ou encore l’application de traitements protecteurs : anti-verdissures ou hydrofuge.",
    ],
  },
];

/** Facteurs de prix cités dans la section « coût ». */
export const TOITURE_PRICE_FACTORS = [
  "La prestation choisie",
  "L’état de votre logement",
  "La surface à rénover",
  "La présence d’une ligne électrique à proximité",
  "L’accessibilité et la hauteur de la maison",
];
