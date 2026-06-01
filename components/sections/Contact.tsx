import type { Lang } from '../../lib/i18n'
import { contact } from '../../data/content'
import styles from './Contact.module.css'

/**
 * Section 07 — Contact.
 *
 * Editorial contact section where the email address is the hero: a large
 * serif mailto link sitting under the intro statement, followed by a tidy
 * list of reachable channels (email, phone, WhatsApp and socials).
 */
export function Contact({ lang }: { lang: Lang }) {
  const waDigits = contact.whatsapp.replace(/\D/g, '')

  const channels = [
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { label: 'Téléphone / Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s+/g, '')}` },
    { label: 'WhatsApp', value: contact.whatsapp, href: `https://wa.me/${waDigits}`, external: true },
    ...contact.socials.map((s) => ({
      label: s.label,
      value: s.url.replace(/^https?:\/\/(www\.)?/, ''),
      href: s.url,
      external: true,
    })),
  ]

  return (
    <section id="contact" className="section">
      <div className="container">
        <span className="section-index">08 — {contact.heading[lang]}</span>

        <p className={styles.intro}>{contact.intro[lang]}</p>

        <a className={styles.emailHero} href={`mailto:${contact.email}`}>
          {contact.email}
        </a>

        <ul className={styles.channels}>
          {channels.map((c) => (
            <li key={c.label} className={styles.channel}>
              <span className={styles.channelLabel}>{c.label}</span>
              <a
                className={styles.channelLink}
                href={c.href}
                {...('external' in c && c.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <span className={styles.channelValue}>{c.value}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
