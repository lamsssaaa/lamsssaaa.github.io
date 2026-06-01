import { notFound } from 'next/navigation'
import { isLang, type Lang } from '../../lib/i18n'
import { Hero } from '../../components/sections/Hero'
import { Services } from '../../components/sections/Services'
import { Clients } from '../../components/sections/Clients'
import { Distinctions } from '../../components/sections/Distinctions'
import { About } from '../../components/sections/About'
import { Testimonials } from '../../components/sections/Testimonials'
import { Contact } from '../../components/sections/Contact'
import { BriefForm } from '../../components/sections/BriefForm'

export const revalidate = 3600

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const l = lang as Lang
  return (
    <>
      <Hero lang={l} />
      <Services lang={l} />
      <Clients lang={l} />
      <Distinctions lang={l} />
      <About lang={l} />
      <Testimonials lang={l} />
      <Contact lang={l} />
      <BriefForm lang={l} />
    </>
  )
}
