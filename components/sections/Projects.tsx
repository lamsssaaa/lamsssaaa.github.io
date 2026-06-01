import { type Lang } from '../../lib/i18n'
import { projectsHeading, projects } from '../../data/content'
import { AdaptiveVideo } from '../AdaptiveVideo'
import styles from './Projects.module.css'

/**
 * "Travaux récents" — desktop: the section pins and project cards ride a shared
 * diagonal timeline. Cards overlap (consecutive cards are 40% apart in their
 * local progress), so you see the previous (fading out top-left), the current
 * (centered, bright, bulged) and the next (fading in bottom-right) at once.
 * Opacity 0 → .2 → 1 → .2 → 0 and a fisheye-like scale bulge at center.
 * Driven in MotionProvider. Mobile / reduced-motion = vertical stack.
 */
const VIEW = { fr: 'Voir le projet', en: 'View project' } as const

export function Projects({ lang }: { lang: Lang }) {
  return (
    <section id="work" className="section" data-diag-section>
      <div className="container">
        <span className="section-index">02 — {projectsHeading[lang]}</span>
        <h2 className="section-title">{projectsHeading[lang]}</h2>
      </div>

      <div className={styles.stage} data-stage>
        {projects.map((p, i) => (
          <article key={p.name} className={styles.card} data-diag>
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
        ))}
      </div>
    </section>
  )
}
