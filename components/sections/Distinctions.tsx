import type { Lang } from '../../lib/i18n'
import { distinctionsHeading, distinctions } from '../../data/content'
import { Reveal } from '../Reveal'
import styles from './Distinctions.module.css'

export function Distinctions({ lang }: { lang: Lang }) {
  return (
    <section id="distinctions" className="section">
      <div className="container">
        <span className="section-index">05 — {distinctionsHeading[lang]}</span>
        <h2 className="section-title">{distinctionsHeading[lang]}</h2>

        <ol className={styles.list}>
          {distinctions.map((item, i) => (
            <li key={`${item.year}-${i}`} className={styles.row}>
              <Reveal className={styles.reveal}>
                <span className={styles.year}>{item.year}</span>
                <div className={styles.body}>
                  <h3 className={styles.title}>{item.title[lang]}</h3>
                  <p className={styles.issuer}>{item.issuer[lang]}</p>
                  {item.detail ? <p className={styles.detail}>{item.detail[lang]}</p> : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
