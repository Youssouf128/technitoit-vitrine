# Technitoit (Next.js)

Refonte du site [technitoit.com](https://www.technitoit.com/) en **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4**.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # build de production
```

## Structure

```
src/
  app/
    page.tsx                 Accueil
    actualites/              Liste des 72 articles (onglets par catégorie, pagination) + pages article
    [...slug]/page.tsx       Pages prestations, régions, départements, infos (générées statiquement)
    devis-gratuit/           Configurateur de devis plein écran
    agence/                  Recherche d'agence + carte des départements
    recherche/               Résultats de recherche
    api/devis/               POST – validation + réception des demandes de devis
    api/newsletter/          POST – inscription newsletter
    sitemap.ts, robots.ts    SEO
  components/
    layout/                  Header (méga-menu, header collant, tiroirs mobiles), Footer, PageHero…
    home/                    Hero, avis clients, avant/après, accordéon prestations, configurateur, actualités, presse, carte…
    ui/                      Logo SVG, icônes, titre de section
  data/
    site.ts                  Menus, avis, articles, logos presse, régions, liens du footer
    configurator.ts          Étapes et options du devis + validation partagée client/serveur
    france-map.ts            Tracés SVG des départements
    articles.ts              Métadonnées des 72 articles (titre, date, catégorie, image…)
    articles-content.json    Contenu des articles en blocs typés (texte riche, images, tableau, accordéon…)
    contact.ts               Formulaire de contact des articles + validation
  lib/pages.ts               Résolution des routes génériques (titres, fil d'Ariane)
public/images/               Visuels du site
```

## Pages reproduites depuis le CMS d'origine

`/renovation-toiture`, `/renovation-facade`, `/isolation`, `/energie` et `/amenagement-exterieur` sont des copies fidèles
des pages Storyblok d'origine : leur HTML a été converti en arbre JSON (`src/data/pages/*.json`, classes conservées)
puis rendu par `src/components/cms/CmsTree.tsx`. Les parties interactives sont remplacées par nos composants
(configurateur de devis, comparateur avant/après, accordéons, fond gris `ContainerBackground`).

Pour importer une autre page :

```bash
mkdir -p /tmp/cms && curl -sL https://www.technitoit.com/<slug> -o /tmp/cms/<slug>.html
python3 scripts/cms-import/convert_pages.py /tmp/cms src/data/pages <slug>
# puis : télécharger les images listées dans src/data/pages/_images.json vers public/images/pages/,
# ajouter le JSON dans src/lib/cms-pages.ts et le chemin dans src/data/cms-routes.ts
```

Les vidéos (30 à 45 Mo chacune) restent servies par le CDN d'origine.

## Contenus et intégrations à brancher

- **Devis / newsletter** : les routes `src/app/api/*` valident les données puis les journalisent. Ajoutez l'envoi vers votre CRM ou outil d'emailing à l'emplacement `TODO`.
- **Consentement cookies** : le bouton « CONSENTEMENT » du footer (`ConsentButton.tsx`) ouvre Didomi s'il est chargé.
- **Pages internes** : les pages prestations, articles et informations utilisent un gabarit commun. Leurs textes détaillés sont à compléter (ou à brancher sur un CMS, par ex. Storyblok).
- Les couleurs de la charte sont déclarées dans `src/app/globals.css` (`--color-tt-*`).
