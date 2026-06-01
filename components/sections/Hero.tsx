import { type Lang, UI } from '../../lib/i18n'
import { profile } from '../../data/content'
import { AdaptiveVideo } from '../AdaptiveVideo'
import styles from './Hero.module.css'

export function Hero({ lang }: { lang: Lang }) {
  const t = UI[lang]
  const lines = profile.headline[lang].split('\n')
  return (
    <section className={styles.hero} id="top">
      <div className="ambient" />
      <div className={styles.media}>
        <AdaptiveVideo high="/video/hero-high.mp4" low="/video/hero-low.mp4" poster="/video/hero-poster.svg" />
        <div className={styles.scrim} />
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.lead}>
          <p className={styles.role}>{profile.role[lang]}</p>
          <h1 className={styles.headline}>
            {lines.map((line, i) => (
              <span key={i} className={styles.line}>
                {line}
              </span>
            ))}
          </h1>
          <p className={styles.tagline}>{profile.tagline[lang]}</p>
        </div>

        <div className={styles.bottom}>
          <div className={styles.metaCol}>
            <span className={styles.location}>{profile.location[lang]}</span>
            <a href="#contact" className={styles.cta}>
              {t.nav.contact} →
            </a>
          </div>
          <ul className={styles.stats}>
            {profile.stats.map((s) => (
              <li key={s.label[lang]} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
