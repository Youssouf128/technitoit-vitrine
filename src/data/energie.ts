/** Contenu de la page /energie (repris de la page CMS d'origine). Les segments entre ** sont mis en gras. */

export type EnergyTheme = "chauffage" | "solaire" | "air" | "eau";

export const ENERGY_THEMES: { id: EnergyTheme; label: string }[] = [
  { id: "chauffage", label: "Chauffage & eau chaude" },
  { id: "solaire", label: "Solaire" },
  { id: "air", label: "Qualité de l’air" },
  { id: "eau", label: "Traitement de l’eau" },
];

export type EnergySolution = {
  title: string;
  /** Libellé court (listes de liens) */
  label: string;
  theme: EnergyTheme;
  href: string;
  image: string;
  alt: string;
  text: string[];
};

export const ENERGY_SOLUTIONS: EnergySolution[] = [
  {
    title: "Installer une pompe à chaleur air/eau",
    theme: "chauffage",
    href: "/energie/pompe-a-chaleur-air-eau",
    label: "Pompe à chaleur air/eau",
    image: "/images/pages/c4c2ef33f2-pompe-chaleur-air-air.jpg",
    alt: "technicien en train d'installer l'unité extérieure d'une PAC air/air",
    text: [
      "La pompe à chaleur air-eau est une solution écologique et économique pour chauffer votre maison. Elle puise les calories présentes dans l’air extérieur pour les transformer en chaleur, ensuite diffusée dans votre système de chauffage central ou pour chauffer votre eau sanitaire. Adaptée à tous les climats, elle fonctionne même par temps froid. Une PAC air/eau réduit votre consommation énergétique et permet de diminuer vos factures.",
    ],
  },
  {
    title: "Faites le choix d’une pompe à chaleur air/air",
    theme: "chauffage",
    href: "/energie/pompe-a-chaleur-air-air",
    label: "Pompe à chaleur air/air",
    image: "/images/pages/24927b0251-pac-air-air.jpg",
    alt: "unité intérieure pac",
    text: [
      "La pompe à chaleur air-air, également appelée climatisation réversible, capte les calories de l’air extérieur pour les transformer en chaleur et les diffuser à l’intérieur de votre logement via des unités de ventilation (appelées splits). En été, ce système peut inverser son fonctionnement pour rafraîchir votre maison. Une pompe à chaleur air/air est la solution pour améliorer votre confort tout au long de l’année et **réduire vos dépenses énergétiques**.",
    ],
  },
  {
    title: "Optez pour des panneaux solaires",
    theme: "solaire",
    href: "/energie/panneaux-solaires",
    label: "Panneaux solaires",
    image: "/images/pages/19d1acdfda-panneaux_solaires.jpg",
    alt: "Panneaux solaires",
    text: [
      "Les panneaux solaires transforment l’énergie solaire en électricité grâce à des cellules en silicium. En les installant sur votre toit, vous pouvez produire votre propre électricité, réduisant ainsi votre dépendance aux fournisseurs et vos factures énergétiques. Les excédents peuvent être revendus au réseau, générant un revenu complémentaire. Choisir les panneaux photovoltaïques, c’est investir dans une source d’**énergie renouvelable** et inépuisable.",
    ],
  },
  {
    title: "Une ventilation mécanique par insufflation",
    theme: "air",
    href: "/energie/vmi",
    label: "VMI (ventilation par insufflation)",
    image: "/images/pages/b3ea8d8f28-vmi.jpg",
    alt: "Vmi",
    text: [
      "La ventilation mécanique par insufflation (VMI) insuffle de l’air neuf filtré dans votre maison, améliorant ainsi la qualité de l’air intérieur. Elle élimine les polluants et l’humidité, tout en assurant un renouvellement constant de l’air. Facile à installer, la VMI contribue à un environnement intérieur sain et confortable, tout en réduisant les besoins de chauffage.",
    ],
  },
  {
    title: "Une chaudière à condensation",
    theme: "chauffage",
    href: "/energie/chaudiere-a-condensation",
    label: "Chaudière à condensation",
    image: "/images/pages/5aab998195-installation_chaudiere.jpeg",
    alt: "Installation chaudiere",
    text: [
      "La chaudière à condensation est une technologie qui récupère la chaleur contenue dans les fumées de combustion. Elle permet ainsi de réduire la consommation de gaz et les émissions de CO2. Investir dans une chaudière à condensation, c’est choisir une solution performante et respectueuse de l’environnement.",
    ],
  },
  {
    title: "Un chauffage à inertie",
    theme: "chauffage",
    href: "/energie/chauffage-inertie",
    label: "Chauffage à inertie",
    image: "/images/pages/848769f3a4-chauffage_inertie.jpg",
    alt: "Chauffage inertie",
    text: [
      "Le chauffage à inertie utilise des matériaux réfractaires pour emmagasiner la chaleur et la diffuser progressivement, assurant une température constante et confortable. Il est **économe en énergie** et facile à installer, sans nécessiter de gros travaux. Ce système est idéal pour un chauffage efficace et régulier, tout en réduisant les coûts énergétiques.",
    ],
  },
  {
    title: "L’installation d’une VMC simple ou double flux",
    theme: "air",
    href: "/energie/vmc-simple-flux",
    label: "VMC simple ou double flux",
    image: "/images/pages/5c3f2d03b9-vmc.jpeg",
    alt: "Vmc",
    text: [
      "La Ventilation Mécanique Contrôlée (VMC) assure une ventilation efficace de votre maison en renouvelant l’air intérieur. En version simple flux, elle extrait l’air vicié des pièces humides et de l’air frais s’introduit naturellement de l’extérieur, améliorant la qualité de l’air et limitant les déperditions de chaleur.",
      "La VMC double-flux va plus loin en récupérant la chaleur de l’air extrait pour réchauffer l’air entrant, offrant des **économies d’énergie** significatives tout en filtrant les polluants. Ces systèmes contribuent à un environnement intérieur sain et confortable.",
    ],
  },
  {
    title: "Et pourquoi pas un chauffe-eau thermodynamique ?",
    theme: "chauffage",
    href: "/energie/chauffe-eau-thermodynamique",
    label: "Chauffe-eau thermodynamique",
    image: "/images/pages/37567d3137-ballon_thermodynamique.jpg",
    alt: "Ballon thermodynamique",
    text: [
      "Aussi appelé ballon thermodynamique, le chauffe-eau thermodynamique utilise les calories de l’air ambiant pour chauffer votre eau sanitaire. Équipé d’une petite pompe à chaleur intégrée, il consomme beaucoup **moins d’énergie** qu’un chauffe-eau électrique classique. Il fonctionne même avec des températures extérieures basses, et il permet de réaliser d’importantes économies sur vos **factures d’énergie**. Le chauffe-eau thermodynamique est une solution innovante, économique et écologique pour répondre à vos besoins en eau chaude.",
    ],
  },
  {
    title: "Un adoucisseur d’eau",
    theme: "eau",
    href: "/energie/adoucisseur-deau",
    label: "Adoucisseur d’eau",
    image: "/images/pages/d0d28c85db-adoucisseur_eau.jpeg",
    alt: "Adoucisseur eau",
    text: [
      "L’adoucisseur d’eau est un appareil indispensable pour lutter contre le calcaire présent dans l’eau. En réduisant la dureté de l’eau, il protège vos installations sanitaires et vos appareils électroménagers, prolongeant ainsi leur durée de vie. Il contribue également à une peau plus douce et à des cheveux moins desséchés après la douche. Facile à installer, l’adoucisseur d’eau permet de réaliser des économies sur les produits ménagers et les réparations dues aux dépôts calcaires. C’est un investissement pour améliorer la qualité de l’eau de votre domicile et votre confort au quotidien.",
    ],
  },
  {
    title: "Un purificateur d’air",
    theme: "air",
    href: "/energie/purificateur-dair",
    label: "Purificateur d’air",
    image: "/images/pages/8314700324-purificateur_air.jpg",
    alt: "Purificateur air",
    text: [
      "Le purificateur d’air est un appareil conçu pour améliorer la qualité de l’air intérieur en éliminant les polluants, allergènes, bactéries et virus. Grâce à ses filtres performants, il capture les particules fines et les gaz nocifs, contribuant à un environnement plus sain. Particulièrement utile pour les personnes souffrant d’allergies ou de problèmes respiratoires, il permet un air pur et plus frais dans toute la maison. Le purificateur d’air est la solution pour créer un espace de vie plus agréable et protéger la santé de toute votre famille.",
    ],
  },
];

export const ENERGY_VIDEOS = {
  landscape: "https://a.storyblok.com/f/284071/x/7d4ef548ea/energie_video_landscape.mp4",
  portrait: "https://a.storyblok.com/f/284071/x/c1e247e104/energie_video_portrait.mp4",
};
