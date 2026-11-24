/** Contenu de la page /renovation-facade (repris de la page CMS d'origine). Les segments entre ** sont mis en gras. */
import type { Issue } from "@/components/landing/IssueGrid";

export const FACADE_SECTIONS = [
  { id: "role", label: "Pourquoi rénover" },
  { id: "avant_apres", label: "Avant / après" },
  { id: "expertise", label: "Expertise" },
  { id: "cout", label: "Coût" },
] as const;

export const FACADE_VIDEOS = {
  landscape: "https://a.storyblok.com/f/284071/x/ded596423e/facade-horizontale-2024.mp4",
  portrait: "https://a.storyblok.com/f/284071/x/598e22de79/facade-2024.mp4",
};

export const FACADE_ISSUES: Issue[] = [
  {
    title: "J’ai de la mousse sur ma façade",
    image: "/images/pages/9c53c4d720-mousse-facade.jpg",
    alt: "Mousse facade",
    text: "Des mousses ou des premières verdissures commencent à apparaître sur votre façade ? N’attendez pas que la situation empire et procédez à un démoussage de votre façade.",
    href: "/renovation-facade/demoussage-facade",
    cta: "Le démoussage façade",
  },
  {
    title: "J’ai de l’humidité sur mes murs",
    image: "/images/pages/939668d59a-humidite_facade.jpeg",
    alt: "Humidite facade",
    text: "Vous remarquez des traces d’humidité sur vos murs extérieurs ? Des fissures ou micro-fissures commencent à être visibles ? Tout cela peut être le signe d’un problème plus grave. Demandez votre étude gratuite rapidement.",
    href: "/renovation-facade/traitement-humidite",
    cta: "Le traitement d’humidité",
  },
  {
    title: "Je veux changer mon revêtement de façade",
    image: "/images/pages/9380b84117-changement-revetement-facade.jpg",
    alt: "mur en pierre",
    text: "Votre enduit est vieillissant ? Vos murs sont irréguliers et vous souhaiteriez les uniformiser ? Découvrez les solutions proposées par Technitoit pour un nouveau revêtement de façade.",
    href: "/renovation-facade/revetement-facade",
    cta: "Les revêtements de façade",
  },
  {
    title: "Je veux repeindre ma façade",
    image: "/images/pages/a2c5611d03-facade_chantier_hydrofuge_facade.jpg",
    alt: "Facade chantier hydrofuge facade",
    text: "La couleur de votre façade a perdu de son éclat ou vous souhaitez simplement une nouvelle couleur ? Technitoit vous propose l’hydrofuge façade, qui, en plus de **redonner vie à votre façade**, la protégera de longues années.",
    href: "/renovation-facade/hydrofuge-facade",
    cta: "L’hydrofuge façade",
  },
  {
    title: "Ma façade est sale",
    image: "/images/pages/a064e5b52f-facade_sale.jpeg",
    alt: "Facade sale",
    text: "Vous remarquez des traces de salissures ou de pollutions sur vos murs extérieurs ? Pourquoi ne pas procéder à un nettoyage complet de la façade ?",
    href: "/renovation-facade/nettoyage",
    cta: "Le nettoyage façade",
  },
];

export const FACADE_BEFORE_AFTER = [
  { before: "/images/pages/849db3f37d-facade_1_avant.jpeg", after: "/images/pages/55e9ce33a2-facade_1_apres.jpeg", w: 1536, h: 2048, ratio: 1, label: "Rénovation de façade 1" },
  { before: "/images/pages/aa300c6c0e-facade_2_avant.jpeg", after: "/images/pages/fbdc6224a2-facade_2_apres.jpeg", w: 1536, h: 2049, ratio: 1, label: "Rénovation de façade 2" },
  { before: "/images/pages/f89e7cf1f0-facade_3_avant.jpg", after: "/images/pages/4a0eda572c-facade_3_apres.jpg", w: 4000, h: 3000, ratio: 1, label: "Rénovation de façade 3" },
];
