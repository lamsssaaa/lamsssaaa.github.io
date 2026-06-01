import type { Localized } from '../lib/i18n'

/**
 * All site content lives here, bilingual (fr/en).
 * Placeholder values are marked with 〈…〉 — replace them with your real
 * information. The structure mirrors a single-page portfolio in the style of
 * stefandacey.com: hero, services, clients, distinctions, about, testimonials,
 * contact, and a project-brief form.
 */

export interface ServiceItem {
  problem: Localized<string>
  solution: Localized<string>
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
  name: '〈Ton Nom〉',
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
export const servicesHeading = { fr: 'Services', en: 'Services' } as Localized<string>
export const services: ServiceItem[] = [
  {
    problem: { fr: 'Des ventes qui stagnent.', en: 'Sales that have plateaued.' },
    solution: { fr: 'Acquisition payante (Meta, Google, TikTok) pilotée par la donnée.', en: 'Data-driven paid acquisition (Meta, Google, TikTok).' },
  },
  {
    problem: { fr: 'Un site qui ne convertit pas.', en: 'A site that doesn’t convert.' },
    solution: { fr: 'Optimisation du tunnel et des pages produit (CRO).', en: 'Funnel & product-page optimization (CRO).' },
  },
  {
    problem: { fr: 'Pas de boutique en ligne.', en: 'No online store yet.' },
    solution: { fr: 'Création de boutique e-commerce rapide et performante.', en: 'Fast, high-performance e-commerce store build.' },
  },
  {
    problem: { fr: 'Du contenu qui ne sort pas.', en: 'Content that never ships.' },
    solution: { fr: 'Production de contenu & créa publicitaire (vidéo incluse).', en: 'Content & ad-creative production (video included).' },
  },
  {
    problem: { fr: 'Des tâches répétitives.', en: 'Repetitive manual work.' },
    solution: { fr: 'Automatisation & intégrations (IA, e-mails, CRM).', en: 'Automation & integrations (AI, email, CRM).' },
  },
  {
    problem: { fr: 'Aucune visibilité sur les chiffres.', en: 'No visibility on the numbers.' },
    solution: { fr: 'Analytics, tracking et reporting clairs.', en: 'Clear analytics, tracking and reporting.' },
  },
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
