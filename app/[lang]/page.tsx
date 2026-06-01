import { notFound } from 'next/navigation'
import { isLang, type Lang } from '../../lib/i18n'
import { Hero } from '../../components/sections/Hero'
import { Services } from '../../components/sections/Services'
import { VideoInterlude } from '../../components/sections/VideoInterlude'
import { Clients } from '../../components/sections/Clients'
import { Distinctions } from '../../components/sections/Distinctions'
import { About } from '../../components/sections/About'
import { Testimonials } from '../../components/sections/Testimonials'
import { Contact } from '../../components/sections/Contact'
import { BriefForm } from '../../components/sections/BriefForm'

export const revalidate = 3600

const COPY = {
  fr: {
    reel1Kicker: 'En images',
    reel1: 'Des marques qui décollent, de l’idée à la vente.',
    reel2Kicker: 'Méthode',
    reel2: 'Une seule personne, de A à Z.',
  },
  en: {
    reel1Kicker: 'In motion',
    reel1: 'Brands that take off — from idea to sale.',
    reel2Kicker: 'Method',
    reel2: 'One person, end to end.',
  },
} as const

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const l = lang as Lang
  const c = COPY[l]
  return (
    <>
      <Hero lang={l} />
      <Services lang={l} />
      <VideoInterlude
        id="reel"
        high="/video/reel-1-high.mp4"
        low="/video/reel-1-low.mp4"
        kicker={c.reel1Kicker}
        caption={c.reel1}
      />
      <Clients lang={l} />
      <Distinctions lang={l} />
      <About lang={l} />
      <VideoInterlude
        high="/video/reel-2-high.mp4"
        low="/video/reel-2-low.mp4"
        kicker={c.reel2Kicker}
        caption={c.reel2}
      />
      <Testimonials lang={l} />
      <Contact lang={l} />
      <BriefForm lang={l} />
    </>
  )
}
