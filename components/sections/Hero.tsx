import { type Lang } from '../../lib/i18n'
import { profile } from '../../data/content'
import { HeroVisual } from '../HeroVisual'
import styles from './Hero.module.css'

export function Hero({ lang }: { lang: Lang }) {
  const lines = profile.headline[lang].split('\n')
  return (
    <section className={styles.hero} id="top">
      <div className="ambient" />
      <div className={styles.media}>
        <HeroVisual />
        <div className={styles.scrim} />
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.lead}>
          <p className={styles.role}>
            <span aria-hidden="true">↳ </span>
            {profile.badge[lang]}
          </p>
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
            <a href="#work" className={styles.cta}>
              {profile.cta[lang]} →
            </a>
            <span className={styles.location}>{profile.location[lang]}</span>
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
