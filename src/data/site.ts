export type NavLink = { label: string; href: string };
export type NavCategory = { label: string; href: string; links: NavLink[] };

export const SITE = {
  name: "Technitoit",
  legalName: "SAS TECHNITOIT",
  url: "https://www.technitoit.com",
  address: "184 rue du Faubourg Saint-Honoré - 75008 Paris",
  foundingYear: 2002,
  agencies: 80,
  rating: 4.6,
};

export const NAVIGATION: NavCategory[] = [
  {
    label: "toiture",
    href: "/renovation-toiture",
    links: [
      { label: "Hydrofuge toiture", href: "/renovation-toiture/hydrofuge-toiture" },
      { label: "Démoussage toiture", href: "/renovation-toiture/demoussage-toiture" },
      { label: "Nettoyage toiture", href: "/renovation-toiture/nettoyage-toiture" },
      { label: "Nettoyage toiture amiante", href: "/renovation-toiture/nettoyage-toiture/nettoyage-toiture-amiante" },
      { label: "Réfection toiture", href: "/renovation-toiture/refection-toiture" },
      { label: "Traitement de bois de charpente", href: "/renovation-toiture/traitement-de-bois" },
      { label: "Accessoires et finitions toiture", href: "/renovation-toiture/accessoires-finitions" },
      { label: "Gouttière", href: "/renovation-toiture/accessoires-finitions/gouttieres" },
      { label: "Cache-moineau", href: "/renovation-toiture/accessoires-finitions/caches-moineaux" },
      { label: "Faitage", href: "/renovation-toiture/accessoires-finitions/faitage" },
      { label: "Bande de rive", href: "/renovation-toiture/accessoires-finitions/bande-de-rive" },
      { label: "Velux", href: "/renovation-toiture/accessoires-finitions/fenetre-de-toit-velux" },
      { label: "Noue", href: "/renovation-toiture/accessoires-finitions/noue-toiture" },
      { label: "Peinture toiture", href: "/renovation-toiture/peinture-toiture" },
      { label: "Solin", href: "/renovation-toiture/accessoires-finitions/solin" },
    ],
  },
  {
    label: "façade",
    href: "/renovation-facade",
    links: [
      { label: "Hydrofuge façade", href: "/renovation-facade/hydrofuge-facade" },
      { label: "Démoussage façade", href: "/renovation-facade/demoussage-facade" },
      { label: "Nettoyage façade", href: "/renovation-facade/nettoyage" },
      { label: "Ravalement de façade", href: "/renovation-facade/ravalement-de-facade" },
      { label: "Revêtement de façade", href: "/renovation-facade/revetement-facade" },
      { label: "Traitement d’humidité", href: "/renovation-facade/traitement-humidite" },
      { label: "Remontées capillaires", href: "/renovation-facade/traitement-humidite/remontees-capillaires" },
      { label: "Salpêtre", href: "/renovation-facade/traitement-humidite/salpetre" },
      { label: "Cave humide", href: "/renovation-facade/traitement-humidite/cave-humide" },
      { label: "Infiltrations d’eau", href: "/renovation-facade/traitement-humidite/infiltration-eau" },
      { label: "Nettoyage terrasse", href: "/renovation-facade/nettoyage-terrasse" },
    ],
  },
  {
    label: "isolation",
    href: "/isolation",
    links: [
      { label: "Isolation thermique intérieure", href: "/isolation/isolation-thermique-interieure" },
      { label: "Isolation thermique extérieure", href: "/isolation/isolation-thermique-exterieure" },
      { label: "Combles", href: "/isolation/combles" },
      { label: "Combles perdus", href: "/isolation/combles/perdus" },
      { label: "Combles aménageables", href: "/isolation/combles/amenageable" },
      { label: "Isolation sous-sol et vide-sanitaire", href: "/isolation/isolation-sous-sol" },
    ],
  },
  {
    label: "énergie",
    href: "/energie",
    links: [
      { label: "VMI", href: "/energie/vmi" },
      { label: "VMC simple flux", href: "/energie/vmc-simple-flux" },
      { label: "VMC double flux", href: "/energie/vmc-double-flux" },
      { label: "Pompe à chaleur air eau", href: "/energie/pompe-a-chaleur-air-eau" },
      { label: "Pompe à chaleur air air", href: "/energie/pompe-a-chaleur-air-air" },
      { label: "Panneaux solaires", href: "/energie/panneaux-solaires" },
      { label: "Chauffe eau thermodynamique", href: "/energie/chauffe-eau-thermodynamique" },
      { label: "Chauffage à inertie", href: "/energie/chauffage-inertie" },
      { label: "Chaudière à condensation", href: "/energie/chaudiere-a-condensation" },
      { label: "Adoucisseur d'eau", href: "/energie/adoucisseur-deau" },
      { label: "Purificateur d'air", href: "/energie/purificateur-dair" },
    ],
  },
  {
    label: "extérieur",
    href: "/amenagement-exterieur",
    links: [
      { label: "Pergola bioclimatique", href: "/amenagement-exterieur/pergola-bioclimatique" },
      { label: "Pergola solaire", href: "/amenagement-exterieur/pergola-solaire" },
      { label: "Pergola adossée", href: "/amenagement-exterieur/pergola-adossee" },
      { label: "Pergola autoportée", href: "/amenagement-exterieur/pergola-autoportee" },
      { label: "Carport solaire", href: "/amenagement-exterieur/carport-solaire" },
      { label: "Auvent solaire", href: "/amenagement-exterieur/auvent-solaire" },
    ],
  },
];

export const POPULAR_SEARCHES = [
  "Nettoyage toiture",
  "Aides financières",
  "Panneaux photovoltaïques",
  "Isolation",
  "Traitement d’humidité",
  "FAQ",
];

export const MOBILE_LINKS: NavLink[] = [
  { label: "TROUVER MON AGENCE", href: "/agence" },
  { label: "CONTACTEZ-NOUS", href: "/devis-gratuit" },
  { label: "LES AIDES", href: "/guides/aides-renovation" },
];

export type Review = { text: string; author: string; agency: string; date: string };

export const REVIEWS: Review[] = [
  { text: "Bon suivi des travaux ! Réactif et compétent ! Je recommande cette entreprise !", author: "Aimé Defot", agency: "Technitoit Guéret", date: "le 6 août 2024" },
  { text: "Travaux de traitement toiture avec vernis. Travaux réalisés en 2008 Ras", author: "Bernard Andre", agency: "Technitoit Nancy", date: "le 7 juin 2024" },
  { text: "Satisfait de la prestation.", author: "Chantal Leroux", agency: "Technitoit Les Sables d'Olonne", date: "le 18 juillet 2024" },
  { text: "Équipe réactive avec des prix corrects", author: "Didier Gentil", agency: "Technitoit Grenoble", date: "le 27 juillet 2024" },
  { text: "Je recommande cette entreprise une équipe bien sympathique bonne presta", author: "Franck Flahat", agency: "Technitoit Lorient", date: "le 30 juillet 2024" },
  { text: "Travail très soigné. Equipe dynamique et à l'écoute.", author: "Franck Lavoue", agency: "Technitoit Châteauroux", date: "le 26 juillet 2024" },
  { text: "Travail soigné et rapide.", author: "Jean-charles Rigout", agency: "Technitoit Bourg-en-Bresse", date: "le 23 juillet 2024" },
  { text: "Nettoyage et hydrofuge toiture et façade ton pierre effectués. Travail serieux.", author: "Linda Bouhenguel", agency: "Technitoit Saumur", date: "le 25 juillet 2024" },
];

export const EXPERIENCE_BADGES = [
  { src: "/images/entreprise_francaise.svg", alt: "Infographie montrant que Technitoit est une entreprise Française", w: 128, h: 126 },
  { src: "/images/80_agences.svg", alt: "Infographie montrant que Technitoit possède 80 agences en France", w: 126, h: 126 },
  { src: "/images/20_ans.svg", alt: "Infographie montrant de Technitoit a plus de 20 ans d'expérience en rénovation de l'habitat", w: 125, h: 126 },
  { src: "/images/technitoit-meilleure-chaine-magasin-2026.png", alt: "technitoit élu meilleure chaîne de magasins de l'année 2026, catégorie renovation de l'habitat", w: 200, h: 200 },
  { src: "/images/technitoit-meilleure-franchise-2026.png", alt: "technitoit élu meilleure franchise de l'année 2026, catégorie renovation de l'habitat", w: 200, h: 200, desktopOnly: true },
];

export const BEFORE_AFTER = [
  { before: "/images/avant-hydrofuge-toiture-technitoit.webp", after: "/images/toiture-apres-hydrofuge-technitoit.webp", w: 1104, h: 732, label: "Hydrofuge toiture" },
  { before: "/images/1_avant_desktop.webp", after: "/images/1_apres_desktop.webp", w: 1626, h: 1078, label: "Rénovation 1" },
  { before: "/images/2_avant_desktop.webp", after: "/images/2_apres_desktop.webp", w: 1626, h: 1078, label: "Rénovation 2" },
  { before: "/images/3_avant_desktop.webp", after: "/images/3_apres_desktop.webp", w: 1626, h: 1078, label: "Rénovation 3" },
];

export const PRESTATIONS = [
  {
    title: "Toiture",
    href: "/renovation-toiture",
    image: "/images/prestation_toiture.jpg",
    alt: "toiture en tuiles neuve",
    short: "Démoussage, hydrofuge, réfection",
    text: "Redonnez une seconde jeunesse à vos tuiles et ardoises grâce aux produits exclusifs de Technitoit, le spécialiste de la toiture en France.",
  },
  {
    title: "Façade",
    href: "/renovation-facade",
    image: "/images/prestation_facade.jpg",
    alt: "façade de maison rénovée",
    short: "Ravalement, nettoyage, humidité",
    text: "Éliminez efficacement les mousses, lichens, traces rouges, champignons, fissures, lézardes grâce aux services de rénovation de façade proposés par Technitoit. Confiez votre projet à notre expertise pour redonner à votre façade son éclat et sa protection d'origine.",
  },
  {
    title: "Isolation",
    href: "/isolation",
    image: "/images/prestation_isolation.jpg",
    alt: "isolation sous toiture",
    short: "Combles, murs, sous-sols",
    text: "Renforcez l'isolation de votre maison avec Technitoit pour réduire considérablement vos factures d'énergie tout en améliorant votre confort de vie.",
  },
  {
    title: "Énergie",
    href: "/energie",
    image: "/images/prestation_energie.jpg",
    alt: "panneaux solaires sur une maison de campagne",
    short: "Solaire, pompe à chaleur, VMC",
    text: "Explorez les solutions innovantes de Technitoit pour améliorer votre quotidien ou consommer moins d’énergie : système d’autoconsommation solaire, chauffage/ventilation, purificateur d’air, etc.",
  },
  {
    title: "Extérieur",
    href: "/amenagement-exterieur",
    image: "/images/pages/92d8c9ee7b-amenagement-exterieur-technitoit.webp",
    alt: "pergola bioclimatique installée sur une terrasse",
    short: "Pergolas, carports, auvents",
    text: "Profitez pleinement de votre extérieur avec nos pergolas bioclimatiques et solaires, carports et auvents : des aménagements élégants qui produisent aussi votre énergie.",
  },
];

export const PRESS_LOGOS = [
  { src: "/images/challenges.png", alt: "Logo Challenges, magazine hebdomadaire économique français", w: 512, h: 130 },
  { src: "/images/cnews.webp", alt: "Logo CNews, chaîne de télévision privée d'information française", w: 860, h: 218 },
  { src: "/images/forbes.webp", alt: "Logo Forbes, magazine économique américain fondé en 1917", w: 860, h: 409 },
  { src: "/images/france_3.webp", alt: "Logo France 3, chaîne de télévision généraliste française", w: 860, h: 162 },
  { src: "/images/le_figaro.webp", alt: "Logo Le Figaro, journal quotidien de la presse nationale française publié à Paris", w: 300, h: 38 },
  { src: "/images/les-echos.png", alt: "Logo Les Echos Solutions, plateforme de services aux entreprises", w: 162, h: 55 },
  { src: "/images/maisons_et_travaux.png", alt: "Logo Maison&Travaux, magazine de décoration bimestriel français créé en 1981", w: 436, h: 82 },
  { src: "/images/la_voix_du_nord.png", alt: "Logo de La Voix du Nord, quotidien régional du Nord de la France", w: 300, h: 100 },
  { src: "/images/la_tribune.png", alt: "Logo de La Tribune, journal économique et financier français", w: 256, h: 114 },
];

export const REGIONS: NavLink[] = [
  { label: "Auvergne-Rhône-Alpes", href: "/auvergne-rhone-alpes" },
  { label: "Bourgogne-Franche-Comté", href: "/bourgogne-franche-comte" },
  { label: "Bretagne", href: "/bretagne" },
  { label: "Centre-Val de Loire", href: "/centre-val-de-loire" },
  { label: "Grand Est", href: "/grand-est" },
  { label: "Hauts-de-France", href: "/hauts-de-france" },
  { label: "Ile-de-France", href: "/ile-de-france" },
  { label: "Normandie", href: "/normandie" },
  { label: "Nouvelle-Aquitaine", href: "/nouvelle-aquitaine" },
  { label: "Occitanie", href: "/occitanie" },
  { label: "Pays de la Loire", href: "/pays-de-la-loire" },
  { label: "Provence-Alpes-Côte d’Azur", href: "/provence-alpes-cote-d-azur" },
];

export const SOCIALS = [
  { name: "facebook", label: "Facebook", href: "https://www.facebook.com/technitoit" },
  { name: "instagram", label: "Instagram", href: "https://www.instagram.com/technitoit/" },
  { name: "x", label: "X (Twitter)", href: "https://twitter.com/technitoit" },
  { name: "youtube", label: "YouTube", href: "https://www.youtube.com/user/technitoit" },
  { name: "linkedin", label: "LinkedIn", href: "https://fr.linkedin.com/company/technitoit" },
  { name: "pinterest", label: "Pinterest", href: "https://www.pinterest.fr/technitoit/" },
] as const;

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "TECHNITOIT",
    links: [
      { label: "QUI SOMMES-NOUS ?", href: "/qui-sommes-nous" },
      { label: "NOS AGENCES", href: "/agence" },
      { label: "NOUS REJOINDRE", href: "/carriere" },
      { label: "ACTUALITÉS", href: "/actualites" },
      { label: "PRESSE", href: "/presse" },
    ],
  },
  {
    title: "BESOIN D'AIDE",
    links: [
      { label: "SAV", href: "/sav" },
      { label: "NOUS CONTACTER", href: "/contactez-nous" },
      { label: "FAQ", href: "/foire-aux-questions" },
      { label: "AIDES FINANCIÈRES", href: "/guides/aides-renovation" },
      { label: "AVIS CLIENTS", href: "/avis" },
    ],
  },
  {
    title: "INFORMATIONS",
    links: [
      { label: "CGU", href: "/cgu" },
      { label: "PLAN DU SITE", href: "/plan-du-site" },
      { label: "DANS VOTRE RÉGION", href: "/dans-votre-region" },
    ],
  },
];

export const FOOTER_LABELS = [
  { src: "/images/picto_3.png", alt: "Marquage CE", w: 49, h: 35 },
  { src: "/images/picto_4.png", alt: "Certification NF", w: 49, h: 35 },
  { src: "/images/picto_5.png", alt: "CSTB, le futur en construction", w: 80, h: 30 },
  { src: "/images/picto_6.png", alt: "RSA", w: 87, h: 45 },
  { src: "/images/logo_rge.png", alt: "Label RGE (Reconnu Garant de l'Environnement)", w: 385, h: 202 },
  { src: "/images/picto_8.png", alt: "PV CYCLE", w: 74, h: 45 },
];
