import type { Lang } from '../../lib/i18n'
import { testimonialsHeading, testimonials } from '../../data/content'
import { Reveal } from '../Reveal'
import styles from './Testimonials.module.css'

export function Testimonials({ lang }: { lang: Lang }) {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <span className="section-index">06 — {testimonialsHeading[lang]}</span>
        <h2 className="section-title">{testimonialsHeading[lang]}</h2>

        <Reveal>
          <ul
            className={styles.track}
            tabIndex={0}
            role="list"
            aria-label={testimonialsHeading[lang]}
          >
            {testimonials.map((item, i) => (
              <li key={`${item.name}-${i}`} className={styles.card}>
                <figure className={styles.figure}>
                  <blockquote className={styles.quote}>{item.quote[lang]}</blockquote>
                  <figcaption className={styles.caption}>
                    <span className={styles.name}>{item.name}</span>
                    <span className={styles.title}>{item.title[lang]}</span>
                    {item.date ? <span className={styles.date}>{item.date}</span> : null}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
