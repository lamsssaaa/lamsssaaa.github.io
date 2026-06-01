import { type Lang } from '../../lib/i18n'
import { projectsHeading, projects } from '../../data/content'
import { AdaptiveVideo } from '../AdaptiveVideo'
import styles from './Projects.module.css'

/**
 * "Travaux récents" — the signature work grid. Each card holds an adaptive
 * showcase video (drop files in /public/video/work-N-*.mp4). Until then the
 * neon poster gradient shows. Quality adapts to the visitor's connection.
 */
export function Projects({ lang }: { lang: Lang }) {
  return (
    <section id="work" className="section">
      <div className="container">
        <span className="section-index">02 — {projectsHeading[lang]}</span>
        <h2 className="section-title">{projectsHeading[lang]}</h2>

        <div className={styles.grid}>
          {projects.map((p) => (
            <article key={p.name} className={styles.card} data-fx="rise">
              <div className={styles.media}>
                <AdaptiveVideo
                  high={p.videoHigh ?? '/video/hero-high.mp4'}
                  low={p.videoLow ?? '/video/hero-low.mp4'}
                  poster={p.poster ?? '/video/hero-poster.svg'}
                />
                <div className={styles.shade} />
              </div>
              <div className={styles.meta}>
                <h3 className={styles.name}>{p.name}</h3>
                <div className={styles.sub}>
                  <span className={styles.client}>{p.client[lang]}</span>
                  <span className={styles.tag}>{p.tag[lang]}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
