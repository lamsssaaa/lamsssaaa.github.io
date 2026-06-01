import { type Lang } from '../../lib/i18n'
import { clientsHeading, clients } from '../../data/content'
import styles from './Clients.module.css'

export function Clients({ lang }: { lang: Lang }) {
  // Duplicate the list so the marquee loops seamlessly.
  const loop = [...clients, ...clients]
  return (
    <section id="clients" className="section">
      <div className="container">
        <span className="section-index">04 — {clientsHeading[lang]}</span>
        <h2 className="section-title">{clientsHeading[lang]}</h2>
      </div>

      <div className={styles.marquee} aria-label={clientsHeading[lang]}>
        <ul className={styles.track}>
          {loop.map((client, i) => (
            <li key={i} className={styles.chip} aria-hidden={i >= clients.length}>
              {client.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className={styles.logo} src={client.logo} alt={client.name} loading="lazy" />
              ) : (
                <span className={styles.name}>{client.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
