/** Contenu de la page /amenagement-exterieur (repris de la page CMS d'origine). Les segments entre ** sont mis en gras. */
import type { Issue } from "@/components/landing/IssueGrid";

export const EXTERIEUR_SECTIONS = [
  { id: "concept", label: "Concept" },
  { id: "solutions", label: "Solutions" },
  { id: "comparatif", label: "Comparatif" },
  { id: "avantages", label: "Avantages" },
  { id: "etapes", label: "Étapes" },
  { id: "financement", label: "Financement" },
  { id: "faq", label: "FAQ" },
] as const;

export const EXTERIEUR_FUNCTIONS = [
  { title: "Protection", text: "contre le soleil, la pluie ou le vent." },
  { title: "Confort thermique", text: "grâce à une gestion fine de la lumière et de la ventilation." },
  { title: "Production d’énergie", text: "quand la structure intègre des panneaux photovoltaïques." },
];

export const EXTERIEUR_SOLUTIONS: Issue[] = [
  {
    title: "Pergola photovoltaïque",
    image: "/images/pages/4e619a9c46-pergola-photovoltaique-technitoit.webp",
    alt: "Pergola Maïko photovoltaique Technitoit",
    text: "La **pergola photovoltaïque** combine une structure autoportée et des lames ou panneaux solaires, parfois orientables. Elle crée un coin de vie extérieur ombragé, connecté à la maison ou indépendant, avec une **production d’électricité** directement injectée dans le logement.",
    note: "**Pour qui ?** Les foyers qui veulent aménager une véritable pièce extérieure (repas, détente) tout en réduisant leur facture énergétique.",
    href: "/amenagement-exterieur/pergola-solaire",
    cta: "Notre pergola photovoltaïque",
  },
  {
    title: "L’îlot photovoltaïque",
    image: "/images/pages/f7eacc210b-pergola-autoportee-maiko-technitoit.webp",
    alt: "Pergola autoportée Maïko Technitoit",
    text: "L’**îlot photovoltaïque** est une structure indépendante, installée au milieu du jardin, près d’une piscine ou d’un espace détente éloigné de la maison. Il crée un point d’ombre autonome, esthétique, capable de produire de l’énergie même loin du bâtiment principal.",
    note: "**Pour qui ?** Les grands jardins où l’on souhaite créer un second espace de vie extérieur, sans dépendre de la structure de la maison.",
    href: "/amenagement-exterieur/pergola-autoportee",
    cta: "Notre îlot photovoltaïque",
  },
  {
    title: "Le carport solaire",
    image: "/images/pages/27cf991d0e-abri-voiture-solaire.webp",
    alt: "abri-voiture-solaire",
    text: "Le **carport solaire** est une structure de protection pour les véhicules équipée de panneaux photovoltaïques. Il protège les voitures des intempéries et du soleil tout en produisant une énergie renouvelable, utilisable pour alimenter la maison ou un véhicule électrique.",
    note: "**Pour qui ?** Les projets qui souhaitent combiner stationnement couvert, production d’énergie et mobilité électrique au sein d’une installation esthétique et fonctionnelle.",
    href: "/amenagement-exterieur/carport-solaire",
    cta: "Notre carport solaire",
  },
  {
    title: "La pergola bioclimatique",
    image: "/images/pages/b607fb9969-pergola-bioclimatique-technitoit.png",
    alt: "Pergola bioclimatique Technitoit",
    text: "La **pergola bioclimatique** utilise des lames orientables (et non des panneaux solaires) pour ajuster précisément l’ensoleillement, la ventilation et la protection contre la pluie. Ouverte, elle laisse circuler l’air ; fermée, elle protège intégralement l’espace.",
    note: "**Pour qui ?** Ceux qui priorisent le **confort thermique modulable** au fil des saisons, avant la production d’énergie.",
    href: "/amenagement-exterieur/pergola-bioclimatique",
    cta: "La pergola bioclimatique",
  },
  {
    title: "L’îlot bioclimatique",
    image: "/images/pages/45859f7ad3-pergola-autoportee-bioclimatique-premium.png",
    alt: "pergola autoportée bioclimatique premium technitoit",
    text: "L’**îlot bioclimatique** reprend le principe de la structure autonome de jardin, avec des lames orientables plutôt que des panneaux solaires. Il permet de créer une véritable extension de vie extérieure, ajustable selon la météo et les usages (repas, réception, détente).",
    note: "**Pour qui ?** Les projets qui veulent un espace extérieur polyvalent, à mi-chemin entre la pergola et le pool house.",
    href: "/amenagement-exterieur/pergola-bioclimatique",
    cta: "L’îlot bioclimatique",
  },
  {
    title: "L’auvent photovoltaïque",
    image: "/images/pages/2b0c238127-auvent-solaire.webp",
    alt: "auvent-solaire",
    text: "L’**auvent photovoltaïque** s’installe contre la façade, au-dessus d’une terrasse, d’une entrée ou d’un accès garage. Sa toiture intègre des panneaux solaires qui produisent de l’électricité en autoconsommation, tout en offrant un abri fixe et étanche.",
    note: "**Pour qui ?** Les propriétaires qui veulent protéger un espace attenant à la maison sans perdre de surface au sol, tout en valorisant une toiture déjà bien exposée au soleil.",
    href: "/amenagement-exterieur/auvent-solaire",
    cta: "Notre auvent photovoltaïque",
  },
];

export const EXTERIEUR_COMPARISON = {
  head: ["Solution", "Fonction principale", "Production d’énergie", "Emplacement type"],
  rows: [
    ["Auvent photovoltaïque", "Protection fixe + énergie", true, "Contre la façade"],
    ["Pergola photovoltaïque", "Ombrage + énergie", true, "Terrasse attenante ou autonome"],
    ["Îlot photovoltaïque", "Espace autonome + énergie", true, "Jardin, piscine"],
    ["Pergola bioclimatique", "Confort thermique modulable", false, "Terrasse attenante"],
    ["Îlot bioclimatique", "Espace de vie modulable", false, "Jardin"],
  ] as [string, string, boolean, string][],
};

export const EXTERIEUR_BENEFITS = [
  { title: "Confort thermique", text: "en été comme en mi-saison, grâce à un ombrage adapté." },
  { title: "Réduction de la facture d’électricité", text: "pour les versions photovoltaïques, via l’autoconsommation." },
  { title: "Valorisation patrimoniale", text: "de la maison, avec une structure durable et qualitative." },
  { title: "Garantie jusqu’à 10 ans", text: "sur nos installations, pour un projet fiable dans la durée." },
  { title: "Certification RGE", text: "de nos équipes, condition indispensable pour prétendre aux aides existantes." },
];

export const EXTERIEUR_STEPS = [
  { title: "Diagnostic gratuit", text: "de votre extérieur (exposition, surface, besoins)." },
  { title: "Devis personnalisé", text: "avec la solution la plus adaptée à votre configuration." },
  { title: "Installation", text: "par nos équipes certifiées RGE." },
  { title: "Suivi et garantie", text: "jusqu’à 10 ans sur l’ensemble de nos réalisations." },
];

export const EXTERIEUR_GUIDE = [
  {
    need: "Vous voulez protéger une terrasse **attenante à la maison** et produire de l’électricité",
    answer: "[Auvent](/amenagement-exterieur/auvent-solaire), pergola photovoltaïque ou [carport solaire](/amenagement-exterieur/carport-solaire)",
  },
  {
    need: "Vous voulez un espace **autonome dans le jardin**, avec ou sans production d’énergie",
    answer: "Îlot photovoltaïque ou îlot bioclimatique",
  },
  {
    need: "Vous priorisez le **confort thermique modulable** plutôt que la production solaire",
    answer: "Pergola bioclimatique",
  },
];

export const EXTERIEUR_FUNDING = [
  "une TVA réduite à 5,5 % reste applicable sous conditions, notamment pour les installations en autoconsommation ;",
  "le surplus d’électricité non consommé peut toujours être revendu, avec un tarif de rachat garanti sur 20 ans ;",
  "seul un professionnel certifié RGE permet d’accéder aux avantages fiscaux et tarifaires liés à une installation photovoltaïque.",
];

export const EXTERIEUR_FAQ = [
  {
    q: "Quelle est la différence entre une structure photovoltaïque et bioclimatique ?",
    a: "Une structure photovoltaïque intègre des panneaux solaires qui produisent de l’électricité. Une structure bioclimatique utilise des lames orientables pour gérer la lumière et la ventilation, sans production d’énergie.",
  },
  {
    q: "Peut-on installer un auvent photovoltaïque sans façade adaptée ?",
    a: "Un diagnostic préalable est nécessaire pour vérifier l’exposition et la solidité du support. Si la façade n’est pas adaptée, une pergola ou un îlot autonome peut être une alternative.",
  },
  {
    q: "Faut-il une autorisation pour installer une pergola photovoltaïque ?",
    a: "Selon la surface et la commune, une déclaration préalable de travaux peut être requise. Nos équipes vous accompagnent dans ces démarches administratives.",
  },
  {
    q: "Un îlot bioclimatique peut-il être fermé complètement ?",
    a: "Oui, les lames orientables permettent de fermer intégralement la structure en cas de pluie ou de vent, tout en conservant la possibilité de l’ouvrir dès que la météo le permet.",
  },
  {
    q: "Combien de temps dure l’installation d’une pergola photovoltaïque ?",
    a: "La durée varie selon la taille du projet et la configuration du terrain ; elle est précisée lors du devis personnalisé, après diagnostic.",
  },
  {
    q: "Les panneaux d’un auvent ou d’une pergola photovoltaïque sont-ils garantis ?",
    a: "Oui, nos installations bénéficient d’une garantie pouvant aller jusqu’à 10 ans, incluant le suivi technique.",
  },
];
