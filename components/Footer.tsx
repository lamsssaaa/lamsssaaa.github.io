import { type Lang, UI } from '../lib/i18n'
import { profile, contact } from '../data/content'
import styles from './Footer.module.css'

export function Footer({ lang }: { lang: Lang }) {
  const t = UI[lang]
  const year = '2026'
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <p className={styles.name}>{profile.name}</p>
          <p className={styles.muted}>{profile.location[lang]}</p>
        </div>
        <div className={styles.right}>
          <a href={`mailto:${contact.email}`} className={styles.link}>
            {contact.email}
          </a>
          <a href="#top" className={styles.muted}>
            ↑ {t.backToTop}
          </a>
        </div>
      </div>
      <div className={`container ${styles.legal}`}>
        <span className={styles.muted}>© {year} {profile.name}</span>
      </div>
    </footer>
  )
}
