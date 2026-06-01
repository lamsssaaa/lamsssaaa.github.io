import { type Lang } from '../../lib/i18n'
import { projectsHeading, projects } from '../../data/content'
import { AdaptiveVideo } from '../AdaptiveVideo'
import styles from './Projects.module.css'

/**
 * "Travaux récents" — pinned horizontal swipe: on desktop the section pins and
 * the project panels slide sideways as you scroll (set up in MotionProvider via
 * GSAP ScrollTrigger). On mobile / reduced-motion it falls back to a clean
 * vertical stack. Each panel is a full-bleed adaptive video with overlay.
 */
const VIEW = { fr: 'Voir le projet', en: 'View project' } as const

export function Projects({ lang }: { lang: Lang }) {
  return (
    <section id="work" className="section" data-hsection>
      <div className="container">
        <span className="section-index">02 — {projectsHeading[lang]}</span>
        <h2 className="section-title">{projectsHeading[lang]}</h2>
      </div>

      <div className={styles.viewport}>
        <div className={styles.track} data-hscroll>
          {projects.map((p, i) => (
            <article key={p.name} className={styles.panel}>
              <div className={styles.media}>
                <AdaptiveVideo
                  high={p.videoHigh ?? '/video/hero-high.mp4'}
                  low={p.videoLow ?? '/video/hero-low.mp4'}
                  poster={p.poster ?? '/video/hero-poster.svg'}
                />
                <div className={styles.shade} />
              </div>
              <div className={styles.overlay}>
                <div className={styles.lead}>
                  <span className={styles.idx}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className={styles.name}>{p.name}</h3>
                  <p className={styles.line}>{p.line[lang]}</p>
                </div>
                <div className={styles.meta}>
                  <span className={styles.view}>{VIEW[lang]} →</span>
                  <div className={styles.metaRow}>
                    <span className={styles.client}>{p.client[lang]}</span>
                    <span className={styles.tag}>{p.tag[lang]}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
