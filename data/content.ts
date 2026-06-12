import type { Localized } from '../lib/i18n'

/**
 * All site content lives here, bilingual (fr/en).
 * Placeholder values are marked with 〈…〉 — replace them with your real
 * information. The structure mirrors a single-page portfolio in the style of
 * stefandacey.com: hero, services, clients, distinctions, about, testimonials,
 * contact, and a project-brief form.
 */

export interface ServiceItem {
  title: Localized<string>
  desc: Localized<string>
}

export interface ProjectItem {
  /** Project / case-study name. */
  name: string
  /** One-line concept / what you did (your own words). */
  line: Localized<string>
  client: Localized<string>
  tag: Localized<string>
  /** Live site URL — when set, the project card becomes a clickable link. */
  url?: string
  /** Showcase video (adaptive). Drop files in /public/video. Poster optional. */
  videoHigh?: string
  videoLow?: string
  poster?: string
}

export interface ClientItem {
  /** Company / brand name. */
  name: string
  /** Optional sector label. */
  sector?: Localized<string>
  /** Optional logo path under /public/logos (svg/png/webp). */
  logo?: string
}

export interface DistinctionItem {
  year: string
  title: Localized<string>
  issuer: Localized<string>
  detail?: Localized<string>
}

export interface ExperienceItem {
  period: string
  company: string
  role: Localized<string>
  detail: Localized<string>
}

export interface TestimonialItem {
  quote: Localized<string>
  name: string
  title: Localized<string>
  date?: string
}

// ── Profile / hero ──────────────────────────────────────────────────────────
export const profile = {
  name: 'Ahmed Salam',
  /** Short role line shown near the name. */
  role: {
    fr: 'Développeur web & créatif · sites · e-commerce · 3D',
    en: 'Web developer & creative · sites · e-commerce · 3D',
  } as Localized<string>,
  /** Big hero headline (keep it punchy, like "Décollage. À 360°."). */
  headline: {
    fr: 'Décollage.\nÀ 360°.',
    en: 'Lift-off.\n360°.',
  } as Localized<string>,
  /** One-line positioning under the headline. */
  tagline: {
    fr: 'Je conçois et je code des sites, boutiques et expériences 3D — du design au déploiement.',
    en: 'I design and code websites, stores and 3D experiences — from design to deployment.',
  } as Localized<string>,
  location: { fr: 'Genève, Suisse', en: 'Geneva, Switzerland' } as Localized<string>,
  /** Small badge line above the headline (your own words). */
  badge: { fr: 'Disponible pour vos projets', en: 'Available for new projects' } as Localized<string>,
  /** Primary hero call-to-action → jumps to the work section. */
  cta: { fr: 'Voir les travaux', en: 'View work' } as Localized<string>,
  /** Hero stat counters — edit the numbers to your real figures. */
  stats: [
    { value: '6+', label: { fr: 'Sites en ligne', en: 'Live sites' } },
    { value: '100', label: { fr: 'Score Lighthouse', en: 'Lighthouse score' } },
    { value: '3', label: { fr: 'Langues (FR·DE·IT)', en: 'Languages (FR·DE·IT)' } },
  ] as { value: string; label: Localized<string> }[],
}

// ── About ────────────────────────────────────────────────────────────────────
export const about = {
  heading: { fr: 'À propos', en: 'About' } as Localized<string>,
  body: {
    fr: [
      'Développeur web créatif basé à Genève. Je conçois et je code des sites modernes, des boutiques e-commerce et des expériences 3D/WebGL — de la première maquette jusqu’au déploiement.',
      'Ma stack : Next.js, React, Three.js / WebGPU et Stripe. J’aime les sites rapides (100/100 Lighthouse), soignés, accessibles et multilingues.',
    ],
    en: [
      'Creative web developer based in Geneva. I design and code modern websites, e-commerce stores and 3D/WebGL experiences — from the first mockup to deployment.',
      'My stack: Next.js, React, Three.js / WebGPU and Stripe. I love fast (100/100 Lighthouse), polished, accessible and multilingual sites.',
    ],
  } as Localized<string[]>,
  /** Profile photo under /public (e.g. /me.webp). Leave empty to hide. */
  photo: '',
  /** Short experience timeline (companies you worked with). */
  experience: [
    {
      period: '2023 — aujourd’hui',
      company: 'Freelance',
      role: { fr: 'Développeur web & créatif', en: 'Web developer & creative' },
      detail: {
        fr: 'Conception et développement de sites, boutiques et expériences 3D pour marques et indépendants.',
        en: 'Designing and building sites, stores and 3D experiences for brands and independents.',
      },
    },
    {
      period: '2022 — 2023',
      company: 'Projets indépendants',
      role: { fr: 'Développeur front-end', en: 'Front-end developer' },
      detail: {
        fr: 'Lancement de plusieurs sites (e-commerce, vitrines, 3D temps réel), du design au déploiement.',
        en: 'Shipped several sites (e-commerce, showcases, real-time 3D), from design to deployment.',
      },
    },
    {
      period: '2021 — 2022',
      company: 'Formation & premiers projets',
      role: { fr: 'Développeur web', en: 'Web developer' },
      detail: {
        fr: 'Apprentissage intensif (JavaScript, React, Next.js) et premières réalisations clients.',
        en: 'Intensive learning (JavaScript, React, Next.js) and first client work.',
      },
    },
  ] as ExperienceItem[],
}

// ── Services ──────────────────────────────────────────────────────────────────
export const servicesHeading = {
  fr: 'Conception & développement web. À 360°.',
  en: 'Web design & development. 360°.',
} as Localized<string>
export const services: ServiceItem[] = [
  {
    title: { fr: 'Sites sur-mesure', en: 'Custom websites' },
    desc: { fr: 'Conception et développement de sites rapides et soignés (Next.js, React).', en: 'Design and development of fast, polished sites (Next.js, React).' },
  },
  {
    title: { fr: 'Boutiques e-commerce', en: 'E-commerce stores' },
    desc: { fr: 'Storefronts performants, paiement Stripe, multilingue.', en: 'High-performance storefronts, Stripe checkout, multilingual.' },
  },
  {
    title: { fr: 'Expériences 3D / WebGL', en: '3D / WebGL experiences' },
    desc: { fr: 'Hero immersifs, particules et 3D temps réel (Three.js, WebGPU).', en: 'Immersive heroes, particles and real-time 3D (Three.js, WebGPU).' },
  },
  {
    title: { fr: 'Design & direction artistique', en: 'Design & art direction' },
    desc: { fr: 'UI soignée, identité de marque et animations au scroll.', en: 'Polished UI, brand identity and scroll animations.' },
  },
  {
    title: { fr: 'Performance & SEO', en: 'Performance & SEO' },
    desc: { fr: 'Sites 100/100 Lighthouse, accessibles et optimisés.', en: '100/100 Lighthouse sites, accessible and optimized.' },
  },
  {
    title: { fr: 'Déploiement & suivi', en: 'Deployment & support' },
    desc: { fr: 'Mise en ligne, hébergement et maintenance.', en: 'Go-live, hosting and maintenance.' },
  },
]

// ── Projects / recent work ────────────────────────────────────────────────────
export const projectsHeading = { fr: 'Travaux récents', en: 'Recent work' } as Localized<string>
export const projects: ProjectItem[] = [
  { name: '53 Questions Sur Mesure', line: { fr: 'Service de conseil business : 53 questions sur-mesure → rapport business hyper-personnalisé en 48 h. Brand neuve 2026, hero 3D en particules animées.', en: 'Business advisory service: 53 custom questions → a hyper-personalized business report in 48 hours. Brand new 2026, immersive 3D particle hero.' }, client: { fr: 'Projet propre', en: 'Own venture' }, tag: { fr: 'Saas & marque', en: 'SaaS & brand' }, url: 'https://lamsssaaa.github.io/business-sur-mesure/' },
  { name: 'DPO Romandie', line: { fr: 'Plateforme de conformité nLPD pour les PME romandes : site éditorial de niveau award (Lighthouse 100/100) avec médaille 3D temps réel en WebGL.', en: 'Swiss data-protection (nLPD) compliance platform for SMEs: award-grade editorial site (Lighthouse 100/100) with a real-time WebGL 3D seal.' }, client: { fr: 'Projet propre', en: 'Own venture' }, tag: { fr: 'Site & 3D', en: 'Web & 3D' }, url: 'https://lamsssaaa.github.io/dpo-sante/', poster: '/images/proj-dpo-sante.jpg' },
  { name: 'Eclipse Gold', line: { fr: 'Boutique de lunettes de soleil : storefront Next.js trilingue (FR/DE/IT), déployé en vitrine statique.', en: 'Sunglasses storefront: trilingual (FR/DE/IT) Next.js site, deployed as a static showcase.' }, client: { fr: 'Projet propre', en: 'Own venture' }, tag: { fr: 'E-commerce', en: 'E-commerce' }, url: 'https://lamsssaaa.github.io/eclipse-gold/', poster: '/images/proj-eclipse.png' },
  { name: 'MINU', line: { fr: 'Marque DTC d’un distributeur connecté pour chats (caméra intégrée) : site produit trilingue avec liste d’attente.', en: 'DTC brand for a connected cat feeder with a built-in camera: trilingual product site with a waitlist.' }, client: { fr: 'Projet propre', en: 'Own venture' }, tag: { fr: 'Marque & site', en: 'Brand & web' }, url: 'https://lamsssaaa.github.io/minu/', poster: '/images/proj-minu.png' },
  { name: 'Sevae', line: { fr: 'Coffre-fort numérique suisse du message-héritage : site v1 Next.js, direction artistique sobre, devis interactif en temps réel et confidentialité « zero-knowledge ».', en: 'Swiss digital vault for legacy messages: v1 Next.js site, restrained art direction, a real-time interactive quote and a zero-knowledge privacy promise.' }, client: { fr: 'Projet propre', en: 'Own venture' }, tag: { fr: 'Site & marque', en: 'Brand & web' }, url: 'https://lamsssaaa.github.io/sevae-site/', poster: '/images/proj-sevae.png' },
  { name: 'ORBE Studio', line: { fr: 'Vitrine d’agence « web studio » : hero WebGPU en temps réel (200 000 particules en compute GPGPU qui morphent sphère↔tore au scroll) + site de services complet.', en: 'Web-studio agency showcase: a real-time WebGPU hero (200k GPGPU compute particles morphing sphere↔torus on scroll) plus a full services site.' }, client: { fr: 'Projet propre', en: 'Own venture' }, tag: { fr: 'WebGPU & 3D', en: 'WebGPU & 3D' }, url: 'https://lamsssaaa.github.io/orbe-studio/', poster: '/images/proj-orbe.png' },
]

// ── Clients / companies worked with ───────────────────────────────────────────
export const clientsHeading = { fr: 'Ils m’ont fait confiance', en: 'Trusted by' } as Localized<string>
export const clients: ClientItem[] = [
  { name: 'Maison Lumen' },
  { name: 'Atelier Nord' },
  { name: 'Vela Studio' },
  { name: 'Helvetia Goods' },
  { name: 'Studio Onde' },
  { name: 'Brün & Co' },
  { name: 'Lac Léman Coffee' },
  { name: 'Nova Habitat' },
]

// ── Distinctions / results ─────────────────────────────────────────────────────
export const distinctionsHeading = { fr: 'Distinctions & résultats', en: 'Awards & results' } as Localized<string>
export const distinctions: DistinctionItem[] = [
  {
    year: '2025',
    title: { fr: 'Lighthouse 100/100', en: 'Lighthouse 100/100' },
    issuer: { fr: 'Performance · Accessibilité · SEO', en: 'Performance · Accessibility · SEO' },
    detail: { fr: 'Score parfait mesuré sur plusieurs projets (perf, a11y, SEO, best practices).', en: 'Perfect score measured across several projects (perf, a11y, SEO, best practices).' },
  },
  {
    year: '2025',
    title: { fr: 'Honorable Mention', en: 'Honorable Mention' },
    issuer: { fr: 'CSS Design Awards', en: 'CSS Design Awards' },
  },
  {
    year: '2024',
    title: { fr: 'Site of the Day (nominé)', en: 'Site of the Day (nominee)' },
    issuer: { fr: 'Awwwards', en: 'Awwwards' },
  },
]

// ── Testimonials ───────────────────────────────────────────────────────────────
export const testimonialsHeading = { fr: 'Témoignages', en: 'Testimonials' } as Localized<string>
export const testimonials: TestimonialItem[] = [
  {
    quote: { fr: 'Ahmed a transformé notre idée en une boutique en ligne qui convertit vraiment. Rapide, créatif et fiable.', en: 'Ahmed turned our idea into an online store that truly converts. Fast, creative and reliable.' },
    name: 'Camille Roux',
    title: { fr: 'Fondatrice, Maison Lumen', en: 'Founder, Maison Lumen' },
    date: '2025',
  },
  {
    quote: { fr: 'Le site 3D qu’il a livré a doublé le temps passé sur la page. Un vrai sens du détail.', en: 'The 3D site he delivered doubled time-on-page. A real eye for detail.' },
    name: 'Julien Favre',
    title: { fr: 'Directeur, Vela Studio', en: 'Director, Vela Studio' },
    date: '2025',
  },
  {
    quote: { fr: 'Travail soigné, délais tenus et un site ultra-rapide. Je recommande sans hésiter.', en: 'Polished work, on-time delivery and a lightning-fast site. Highly recommend.' },
    name: 'Sofia Bianchi',
    title: { fr: 'Responsable e-commerce, Helvetia Goods', en: 'E-commerce lead, Helvetia Goods' },
    date: '2024',
  },
]

// ── Contact ──────────────────────────────────────────────────────────────────
export const contact = {
  heading: { fr: 'Contact', en: 'Contact' } as Localized<string>,
  intro: {
    fr: 'Un projet, une question ? Parlons-en.',
    en: 'A project, a question? Let’s talk.',
  } as Localized<string>,
  email: 'ahmed.salam@hotmail.ch',
  phone: '+41 79 123 45 67',
  whatsapp: '+41 79 123 45 67',
  socials: [
    { label: 'GitHub', url: 'https://github.com/lamsssaaa' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/ahmed-salam' },
  ],
}

export const briefHeading = {
  fr: 'Décrivez votre projet',
  en: 'Describe your project',
} as Localized<string>
