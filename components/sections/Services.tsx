import { type Lang } from '../../lib/i18n'
import { servicesHeading, services } from '../../data/content'
import { Reveal } from '../Reveal'
import styles from './Services.module.css'

export function Services({ lang }: { lang: Lang }) {
  return (
    <section id="services" className="section">
      <div className="container">
        <span className="section-index">02 — {servicesHeading[lang]}</span>
        <h2 className="section-title">{servicesHeading[lang]}</h2>

        <ol className={styles.list}>
          {services.map((service, i) => (
            <li key={i} className={styles.row}>
              <Reveal className={styles.inner}>
                <span className={styles.num} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className={styles.problem}>{service.problem[lang]}</p>
                <p className={styles.solution}>{service.solution[lang]}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
