import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LANGS, isLang, type Lang } from '../../lib/i18n'
import { profile } from '../../data/content'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { SmoothScroll } from '../../components/SmoothScroll'

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const desc = lang === 'fr'
    ? 'Portfolio — growth, e-commerce et marketing digital.'
    : 'Portfolio — growth, e-commerce and digital marketing.'
  return {
    title: `${profile.name} — ${profile.role[lang]}`,
    description: desc,
    alternates: {
      languages: { fr: '/fr', en: '/en', 'x-default': '/fr' },
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const l = lang as Lang
  return (
    <>
      <SmoothScroll />
      <a href="#main" className="skip-link">
        {l === 'fr' ? 'Aller au contenu' : 'Skip to content'}
      </a>
      <Header lang={l} />
      <main id="main">{children}</main>
      <Footer lang={l} />
    </>
  )
}
