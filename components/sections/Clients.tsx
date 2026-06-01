import { type Lang } from '../../lib/i18n'
import { clientsHeading, clients } from '../../data/content'
import { Reveal } from '../Reveal'
import styles from './Clients.module.css'

export function Clients({ lang }: { lang: Lang }) {
  return (
    <section id="clients" className="section">
      <div className="container">
        <span className="section-index">03 — {clientsHeading[lang]}</span>
        <h2 className="section-title">{clientsHeading[lang]}</h2>

        <Reveal>
          <ul className={styles.grid}>
            {clients.map((client, i) => (
              <li key={i} className={styles.cell}>
                {client.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className={styles.logo} src={client.logo} alt={client.name} loading="lazy" />
                ) : (
                  <span className={styles.name}>{client.name}</span>
                )}
                {client.sector && <span className={styles.sector}>{client.sector[lang]}</span>}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
