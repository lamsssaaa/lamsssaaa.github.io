import { type Lang } from '../../lib/i18n'
import { servicesHeading, services } from '../../data/content'
import { Reveal } from '../Reveal'
import styles from './Services.module.css'

export function Services({ lang }: { lang: Lang }) {
  return (
    <section id="services" className="section">
      <div className="container">
        <span className="section-index">03 — {lang === 'fr' ? 'Services' : 'Services'}</span>
        <h2 className="section-title">{servicesHeading[lang]}</h2>

        <ol className={styles.list}>
          {services.map((service, i) => (
            <li key={i} className={styles.row}>
              <Reveal className={styles.inner}>
                <span className={styles.num} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.title}>{service.title[lang]}</h3>
                <p className={styles.desc}>{service.desc[lang]}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
