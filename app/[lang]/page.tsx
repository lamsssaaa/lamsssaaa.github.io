import { notFound } from 'next/navigation'
import { isLang, type Lang } from '../../lib/i18n'
import { Hero } from '../../components/sections/Hero'
import { Projects } from '../../components/sections/Projects'
import { Services } from '../../components/sections/Services'
import { VideoInterlude } from '../../components/sections/VideoInterlude'
import { Clients } from '../../components/sections/Clients'
import { Distinctions } from '../../components/sections/Distinctions'
import { About } from '../../components/sections/About'
import { Testimonials } from '../../components/sections/Testimonials'
import { Contact } from '../../components/sections/Contact'
import { BriefForm } from '../../components/sections/BriefForm'

const COPY = {
  fr: { kicker: 'Méthode', caption: 'Une seule personne, de A à Z.' },
  en: { kicker: 'Method', caption: 'One person, end to end.' },
} as const

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const l = lang as Lang
  const c = COPY[l]
  return (
    <>
      <Hero lang={l} />
      <Projects lang={l} />
      <Services lang={l} />
      <Clients lang={l} />
      <Distinctions lang={l} />
      <About lang={l} />
      <VideoInterlude
        high="/videos/reel-2-high.mp4"
        low="/videos/reel-2-low.mp4"
        kicker={c.kicker}
        caption={c.caption}
      />
      <Testimonials lang={l} />
      <Contact lang={l} />
      <BriefForm lang={l} />
    </>
  )
}
