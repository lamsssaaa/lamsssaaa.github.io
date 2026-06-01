import Image from 'next/image'
import { type Lang } from '../../lib/i18n'
import { about } from '../../data/content'
import styles from './About.module.css'

export function About({ lang }: { lang: Lang }) {
  const heading = about.heading[lang]
  const paragraphs = about.body[lang]
  const hasPhoto = typeof about.photo === 'string' && about.photo.length > 0
  const experienceHeading = lang === 'fr' ? 'Parcours' : 'Experience'

  return (
    <section id="about" className="section">
      <div className="container">
        <span className="section-index">05 — {heading}</span>
        <h2 className="section-title">{heading}</h2>

        <div className={styles.intro}>
          <div className={styles.bio}>
            {paragraphs.map((paragraph, i) => (
              <p key={i} className={i === 0 ? styles.lead : styles.body}>
                {paragraph}
              </p>
            ))}
          </div>

          {hasPhoto && (
            <figure className={styles.photo}>
              <Image
                src={about.photo}
                alt={heading}
                width={480}
                height={600}
                className={styles.photoImg}
                sizes="(max-width: 800px) 100vw, 480px"
              />
            </figure>
          )}
        </div>

        <div className={styles.experience}>
          <h3 className={styles.experienceHeading}>{experienceHeading}</h3>
          <ul className={styles.timeline}>
            {about.experience.map((item, i) => (
              <li key={i} className={styles.entry}>
                <span className={styles.period}>{item.period}</span>
                <div className={styles.entryBody}>
                  <span className={styles.company}>{item.company}</span>
                  <span className={`eyebrow ${styles.role}`}>{item.role[lang]}</span>
                  <p className={styles.detail}>{item.detail[lang]}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
