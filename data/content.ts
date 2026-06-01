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
    fr: 'Growth & e-commerce · marketing digital',
    en: 'Growth & e-commerce · digital marketing',
  } as Localized<string>,
  /** Big hero headline (keep it punchy, like "Décollage. À 360°."). */
  headline: {
    fr: 'Décollage.\nÀ 360°.',
    en: 'Lift-off.\n360°.',
  } as Localized<string>,
  /** One-line positioning under the headline. */
  tagline: {
    fr: 'Plus rapide qu’une agence. Plus large qu’un freelance.',
    en: 'Faster than an agency. Broader than a freelancer.',
  } as Localized<string>,
  location: { fr: 'Genève, Suisse', en: 'Geneva, Switzerland' } as Localized<string>,
  /** Small badge line above the headline (your own words). */
  badge: { fr: 'Disponible pour vos projets', en: 'Available for new projects' } as Localized<string>,
  /** Primary hero call-to-action → jumps to the work section. */
  cta: { fr: 'Voir les travaux', en: 'View work' } as Localized<string>,
  /** Hero stat counters — edit the numbers to your real figures. */
  stats: [
    { value: '〈50〉+', label: { fr: 'Projets', en: 'Projects' } },
    { value: '〈30〉+', label: { fr: 'Clients', en: 'Clients' } },
    { value: '〈5〉+', label: { fr: 'Années', en: 'Years' } },
  ] as { value: string; label: Localized<string> }[],
}

// ── About ────────────────────────────────────────────────────────────────────
export const about = {
  heading: { fr: 'À propos', en: 'About' } as Localized<string>,
  body: {
    fr: [
      '〈Présente-toi en quelques phrases.〉 Plus de 〈X〉 ans à faire grandir des marques e-commerce : acquisition payante, conversion, contenu et automatisation. Une seule personne, de A à Z.',
      'J’aide les marques à passer d’une idée à des ventes réelles — boutique, publicité, tunnel de conversion et analytics inclus.',
    ],
    en: [
      '〈Introduce yourself in a few sentences.〉 Over 〈X〉 years growing e-commerce brands: paid acquisition, conversion, content and automation. One person, end to end.',
      'I help brands go from an idea to real sales — store, ads, conversion funnel and analytics included.',
    ],
  } as Localized<string[]>,
  /** Profile photo under /public (e.g. /me.webp). Leave empty to hide. */
  photo: '',
  /** Short experience timeline (companies you worked with). */
  experience: [
    {
      period: '2023 — 〈aujourd’hui〉',
      company: '〈Entreprise / Marque〉',
      role: { fr: 'Growth & e-commerce', en: 'Growth & e-commerce' },
      detail: {
        fr: '〈Ce que tu as fait : acquisition, +X% de CA, lancement de boutique…〉',
        en: '〈What you did: acquisition, +X% revenue, store launch…〉',
      },
    },
    {
      period: '2021 — 2023',
      company: '〈Entreprise〉',
      role: { fr: 'Marketing digital', en: 'Digital marketing' },
      detail: {
        fr: '〈Mission, résultats chiffrés.〉',
        en: '〈Scope, measurable results.〉',
      },
    },
    {
      period: '2019 — 2021',
      company: '〈Entreprise〉',
      role: { fr: 'Publicité & contenu', en: 'Ads & content' },
      detail: {
        fr: '〈Mission, résultats chiffrés.〉',
        en: '〈Scope, measurable results.〉',
      },
    },
  ] as ExperienceItem[],
}

// ── Services ──────────────────────────────────────────────────────────────────
export const servicesHeading = {
  fr: 'Tout le e-commerce. À 360°.',
  en: 'All of e-commerce. 360°.',
} as Localized<string>
export const services: ServiceItem[] = [
  {
    title: { fr: 'Vendre plus, partout', en: 'Sell more, everywhere' },
    desc: { fr: 'Acquisition payante pilotée par la donnée — Meta, Google, TikTok.', en: 'Data-driven paid acquisition — Meta, Google, TikTok.' },
  },
  {
    title: { fr: 'Une boutique qui convertit', en: 'A store that converts' },
    desc: { fr: 'Création et optimisation de boutique e-commerce (CRO, pages produit).', en: 'E-commerce store build & conversion optimization (CRO, product pages).' },
  },
  {
    title: { fr: 'Une marque mémorable', en: 'A brand that sticks' },
    desc: { fr: 'Identité, contenu et création publicitaire — vidéo incluse.', en: 'Identity, content and ad creative — video included.' },
  },
  {
    title: { fr: 'Percer sur les réseaux', en: 'Break out on social' },
    desc: { fr: 'Stratégie de contenu et formats qui captent l’attention.', en: 'Content strategy and formats that capture attention.' },
  },
  {
    title: { fr: 'L’IA à votre service', en: 'AI working for you' },
    desc: { fr: 'Automatisations et intégrations qui font gagner des heures.', en: 'Automations and integrations that save hours.' },
  },
  {
    title: { fr: 'Vos chiffres, au clair', en: 'Your numbers, clear' },
    desc: { fr: 'Analytics, tracking et reporting pour décider juste.', en: 'Analytics, tracking and reporting to decide well.' },
  },
]

// ── Projects / recent work ────────────────────────────────────────────────────
export const projectsHeading = { fr: 'Travaux récents', en: 'Recent work' } as Localized<string>
export const projects: ProjectItem[] = [
  { name: '〈Projet 1〉', line: { fr: '〈Une phrase qui résume le projet.〉', en: '〈A line that sums up the project.〉' }, client: { fr: '〈Client〉', en: '〈Client〉' }, tag: { fr: 'E-commerce', en: 'E-commerce' }, videoHigh: '/video/work-1-high.mp4', videoLow: '/video/work-1-low.mp4' },
  { name: '〈Projet 2〉', line: { fr: '〈Une phrase qui résume le projet.〉', en: '〈A line that sums up the project.〉' }, client: { fr: '〈Client〉', en: '〈Client〉' }, tag: { fr: 'Publicité', en: 'Advertising' }, videoHigh: '/video/work-2-high.mp4', videoLow: '/video/work-2-low.mp4' },
  { name: '〈Projet 3〉', line: { fr: '〈Une phrase qui résume le projet.〉', en: '〈A line that sums up the project.〉' }, client: { fr: '〈Client〉', en: '〈Client〉' }, tag: { fr: 'Site web', en: 'Website' }, videoHigh: '/video/work-3-high.mp4', videoLow: '/video/work-3-low.mp4' },
  { name: '〈Projet 4〉', line: { fr: '〈Une phrase qui résume le projet.〉', en: '〈A line that sums up the project.〉' }, client: { fr: '〈Client〉', en: '〈Client〉' }, tag: { fr: 'Contenu', en: 'Content' }, videoHigh: '/video/work-4-high.mp4', videoLow: '/video/work-4-low.mp4' },
  { name: '〈Projet 5〉', line: { fr: '〈Une phrase qui résume le projet.〉', en: '〈A line that sums up the project.〉' }, client: { fr: '〈Client〉', en: '〈Client〉' }, tag: { fr: 'Growth', en: 'Growth' }, videoHigh: '/video/work-5-high.mp4', videoLow: '/video/work-5-low.mp4' },
  { name: '〈Projet 6〉', line: { fr: '〈Une phrase qui résume le projet.〉', en: '〈A line that sums up the project.〉' }, client: { fr: '〈Client〉', en: '〈Client〉' }, tag: { fr: 'Branding', en: 'Branding' }, videoHigh: '/video/work-6-high.mp4', videoLow: '/video/work-6-low.mp4' },
]

// ── Clients / companies worked with ───────────────────────────────────────────
export const clientsHeading = { fr: 'Ils m’ont fait confiance', en: 'Trusted by' } as Localized<string>
export const clients: ClientItem[] = [
  { name: '〈Entreprise 1〉' },
  { name: '〈Entreprise 2〉' },
  { name: '〈Entreprise 3〉' },
  { name: '〈Entreprise 4〉' },
  { name: '〈Entreprise 5〉' },
  { name: '〈Entreprise 6〉' },
  { name: '〈Entreprise 7〉' },
  { name: '〈Entreprise 8〉' },
]

// ── Distinctions / results ─────────────────────────────────────────────────────
export const distinctionsHeading = { fr: 'Distinctions & résultats', en: 'Awards & results' } as Localized<string>
export const distinctions: DistinctionItem[] = [
  {
    year: '2025',
    title: { fr: '〈Prix / résultat marquant〉', en: '〈Award / key result〉' },
    issuer: { fr: '〈Organisme / marque〉', en: '〈Organization / brand〉' },
    detail: { fr: '〈Détail court.〉', en: '〈Short detail.〉' },
  },
  {
    year: '2024',
    title: { fr: '〈+X% de chiffre d’affaires〉', en: '〈+X% revenue〉' },
    issuer: { fr: '〈Marque〉', en: '〈Brand〉' },
  },
  {
    year: '2023',
    title: { fr: '〈Distinction / certification〉', en: '〈Award / certification〉' },
    issuer: { fr: '〈Organisme〉', en: '〈Organization〉' },
  },
]

// ── Testimonials ───────────────────────────────────────────────────────────────
export const testimonialsHeading = { fr: 'Témoignages', en: 'Testimonials' } as Localized<string>
export const testimonials: TestimonialItem[] = [
  {
    quote: { fr: '〈Citation client. Concret, chiffré si possible.〉', en: '〈Client quote. Concrete, with numbers if possible.〉' },
    name: '〈Prénom Nom〉',
    title: { fr: '〈Fonction, Entreprise〉', en: '〈Role, Company〉' },
    date: '2025',
  },
  {
    quote: { fr: '〈Citation client.〉', en: '〈Client quote.〉' },
    name: '〈Prénom Nom〉',
    title: { fr: '〈Fonction, Entreprise〉', en: '〈Role, Company〉' },
    date: '2024',
  },
  {
    quote: { fr: '〈Citation client.〉', en: '〈Client quote.〉' },
    name: '〈Prénom Nom〉',
    title: { fr: '〈Fonction, Entreprise〉', en: '〈Role, Company〉' },
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
  email: '〈ton@email.com〉',
  phone: '〈+41 …〉',
  whatsapp: '〈+41 …〉',
  socials: [
    { label: 'LinkedIn', url: '〈https://linkedin.com/in/…〉' },
    { label: 'Instagram', url: '〈https://instagram.com/…〉' },
  ],
}

export const briefHeading = {
  fr: 'Décrivez votre projet',
  en: 'Describe your project',
} as Localized<string>
