@AGENTS.md

# Portfolio — contexte projet (handoff)

> Ouvre Claude Code **dans ce dossier** (`~/portfolio`) pour travailler sur ce projet de façon isolée. Il est **séparé** de tout autre projet (notamment eclipse-gold) : son propre dépôt, sa propre config, son propre déploiement.

## 1. Objectif & nature
Site **portfolio personnel** d'**Ahmed Salam** (Genève), positionnement **growth / e-commerce / marketing digital**.
Design **inspiré du style** de stefandacey.com (sombre cinématographique, néon teal/magenta, grotesque bold, scroll fluide, sections « vortex » vidéo). **Ce n'est PAS un clone** : on reproduit des **techniques d'animation** et une **structure** génériques, avec le **contenu propre** d'Ahmed (placeholders à remplir). Aucun texte/visuel du site d'origine n'est copié.

## 2. Stack & emplacement
- **Next.js 16** (App Router, TypeScript), **CSS Modules**, `next/font` (Space Grotesk pour les titres, Inter pour le texte).
- Bilingue **FR/EN** : routes `/[lang]` (`/fr`, `/en`), `/` redirige vers `/fr`. i18n dans `lib/i18n.ts`.
- Dossier : `~/portfolio` — **hors iCloud** (≠ Bureau), donc les builds sont fiables (pas de corruption `.next`).
- Animations : **GSAP + ScrollTrigger** + **Lenis** (scroll fluide). 3D hero : **three + @react-three/fiber + drei + @react-three/postprocessing**.

## 3. Carte des fichiers
- `app/layout.tsx` — racine : polices, metadata, viewport/theme-color, manifest, no-flash thème, `<Analytics/>`.
- `app/[lang]/layout.tsx` — chrome : `<MotionProvider/>`, skip-link, `<Header/>`, `<main id="main-content">`, `<Footer/>`.
- `app/[lang]/page.tsx` — assemble les sections (ordre) : Hero → **Projects** → Services → Clients → Distinctions → About → VideoInterlude → Testimonials → Contact → BriefForm.
- `app/page.tsx` — stub redirect `/ → /fr` (client + `_redirects`).
- `data/content.ts` — **tout le contenu bilingue** (profile, services, projects, clients, distinctions, about+expériences, testimonials, contact). Placeholders marqués `〈…〉`.
- `lib/i18n.ts` — LANGS, UI nav. `lib/assets.ts` — résolveur de fond (voir §6).
- `components/` — `MotionProvider.tsx` (animations), `Hero3D.tsx` + `HeroVisual.tsx` (WebGL hero), `Header`, `Footer`, `AdaptiveVideo`, `Reveal`, `ThemeToggle`, `Analytics`, et `sections/` (Hero, Projects, Services, Clients, Distinctions, About, Testimonials, Contact, BriefForm, VideoInterlude).
- `public/videos/` — vidéos (hero, reels, **background-N.mp4**). `public/images/` — images (**work-N.webp** couvertures, **background-N.webp**).
- `app/globals.css` — design tokens (couleurs, néon `--neon-teal/--neon-magenta`, spacing, `.section/.container/.section-title`, `.ambient`, reveal).

## 4. La section « Travaux » (le gros du travail) — `components/sections/Projects.tsx` + `MotionProvider.tsx`
Effet « vortex » piloté par **une timeline GSAP épinglée** (desktop ≥ 760px ; mobile/`prefers-reduced-motion` = pile verticale simple). Réglages **actuels validés** :
- **3 couches** : (1) **fond plein écran** du projet actif qui se croise (crossfade, pic au centre) ; (2) **grand titre** en bas-gauche (`bottom: 5%`) ; (3) **cartes** flottantes.
- **Trajectoire d'une carte** : entre **bas-droite** (0%), **centrée pile au milieu** à 50% (`top:50%; translateY(-50%)`), sort **haut-gauche** (100%). Coupée **uniquement horizontalement** (jamais en haut/bas).
  - `ax = innerWidth/2 + cardW/4` (entrée/sortie par les côtés, ~¼ visible aux extrêmes).
  - `ay = (innerHeight - cardH)/2 * 0.9` (bornée → jamais coupée verticalement).
- **rotateY** : ±37,5° (de +37.5 à 50% = 0 à -37.5), perspective 1500px.
- **Chevauchement** : `STEP = 0.62` → quand un projet est à 50%, le précédent est à ~95% (sorti), le suivant pas encore entré.
- **Opacité** : 0% → 0, 20% → 1, 80% → 1, 100% → 0.
- **Fisheye** : approximation par **bombé** (scaleY > scaleX au centre). Vrai barrel/lens = filtre WebGL/SVG (non fait, plus lourd sur vidéo — à proposer si besoin).
- Carte : `width: min(60vw, 1000px)`, `height: min(58svh, 580px)`.
- Section épinglée : padding retiré + titre `02 / Travaux récents` passé en **overlay absolu** (`top: 88px`) pour que `.stage` colle au top.

## 5. Vidéo adaptative — `components/AdaptiveVideo.tsx`
Choisit haute/basse qualité ou poster seul selon la connexion (Network Information API `effectiveType`/`saveData`) + `prefers-reduced-motion` ; lazy (`preload=none`, charge à la vue), pause hors-écran.

## 6. Convention d'assets (résolveur build-time) — `lib/assets.ts`
Pour chaque projet N, le **fond** est résolu **au build** dans l'ordre :
1. `public/videos/background-N.mp4` (→ fond vidéo)
2. sinon `public/images/background-N.webp` (→ fond image)
3. sinon la **couverture** du projet (`poster`, ex. `public/images/work-N.webp`).
La **couverture du panneau** = `poster` du projet dans `data/content.ts`.
⚠️ Dossier vidéos = **`public/videos/`** (pluriel). Toutes les refs code sont en `/videos/`.
**Actuel** : projet n°2 → couverture `/images/work-2.webp` + fond vidéo `/videos/background-2.mp4` (le hero Eclipse Gold).
Après tout ajout de fichier dans `public/`, **rebuild** (`npm run build`) car résolu au build.

## 7. Build, run, déploiement
- **Dev** : `npm run dev`. **Build statique** : `npm run build` → `out/` (export 100% statique, voir `next.config.ts` `output:'export'`).
- **Aperçu local du build** : `npx serve out -l 4321` → http://localhost:4321/fr/ (utilisé pendant tout le dev car le déploiement public était bloqué).
- **Site statique** = aucune fonction serveur → ne peut pas tomber en 503. Déployable sur **n'importe quel hébergeur statique**.
- **Headers/redirects** statiques : `public/_headers`, `public/_redirects` (`/ → /fr`).
- **Déploiement** : un site Netlify `cute-churros-f3fc41` existait (https://cute-churros-f3fc41.netlify.app) mais le **plan gratuit Netlify a throttlé** (déploiements « Forbidden » + 503) après beaucoup de déploiements. À faire côté propriétaire : attendre le reset, **déposer `out/` en drag-drop** sur Netlify, OU **Cloudflare Pages / GitHub Pages**, OU connecter le repo GitHub pour CI. **Pas de remote git pour l'instant.**

## 8. À faire (reste)
- Remplacer le contenu placeholder `〈…〉` dans `data/content.ts` (nom de projets, accroches, clients, **bio**, **expériences/entreprises**, **email/contact**, chiffres des stats, témoignages).
- Ajouter les couvertures/fonds des autres projets (`work-N.webp`, `videos/background-N.mp4`).
- Ajouter les vidéos hero/reels (`public/videos/hero-high.mp4`, `reel-2-*.mp4`) si souhaité (sinon dégradé néon).
- Photo « À propos » (`about.photo`).
- Déployer (voir §7) ; éventuellement renommer le site + brancher un domaine.
- Analytics : poser `NEXT_PUBLIC_GA_ID` ou `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (le composant `Analytics` s'active tout seul).

## 9. Conventions / garde-fous
- Travail **technique** (structure, animations) reproduit librement ; **jamais** copier textes/images/vidéos d'un autre site. Contenu = celui d'Ahmed.
- Tout ajustement d'animation = éditer `MotionProvider.tsx` (paramètres) + `components/sections/Projects.module.css` (dimensions/positions).
- `prefers-reduced-motion` et fallback mobile doivent rester propres.
