import { type Lang } from '../../lib/i18n'
import { projectsHeading, projects } from '../../data/content'
import { AdaptiveVideo } from '../AdaptiveVideo'
import styles from './Projects.module.css'

/**
 * "Travaux récents" — each project travels a diagonal path as you scroll its
 * slot: 0% = bottom-right, 50% = centered, 100% = top-left, then the next
 * project comes in. Driven in MotionProvider (per-slot scrub). Mobile /
 * reduced-motion fall back to a clean vertical stack.
 */
const VIEW = { fr: 'Voir le projet', en: 'View project' } as const

export function Projects({ lang }: { lang: Lang }) {
  return (
    <section id="work" className="section">
      <div className="container">
        <span className="section-index">02 — {projectsHeading[lang]}</span>
        <h2 className="section-title">{projectsHeading[lang]}</h2>
      </div>

      <div className={styles.list}>
        {projects.map((p, i) => (
          <div key={p.name} className={styles.slot} data-slot>
            <div className={styles.sticky}>
              <article className={styles.rect} data-diag>
                <div className={styles.media}>
                  <AdaptiveVideo
                    high={p.videoHigh ?? '/video/hero-high.mp4'}
                    low={p.videoLow ?? '/video/hero-low.mp4'}
                    poster={p.poster ?? '/video/hero-poster.svg'}
                  />
                  <div className={styles.shade} />
                </div>
                <div className={styles.overlay}>
                  <span className={styles.idx}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className={styles.name}>{p.name}</h3>
                  <p className={styles.line}>{p.line[lang]}</p>
                  <div className={styles.meta}>
                    <span className={styles.client}>{p.client[lang]}</span>
                    <span className={styles.tag}>{p.tag[lang]}</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
