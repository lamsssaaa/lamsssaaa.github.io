import type { CSSProperties } from 'react'
import { type Lang } from '../../lib/i18n'
import { projectsHeading, projects } from '../../data/content'
import { AdaptiveVideo } from '../AdaptiveVideo'
import styles from './Projects.module.css'

/**
 * "Travaux récents" — a 3D perspective carousel. On desktop the section pins
 * and the project cards rotate around a central axis (a turning "spiral
 * staircase") as you scroll, bringing a different project to the front each
 * time. Mobile / reduced-motion fall back to a clean vertical stack.
 * Set up in MotionProvider (pin + scrub rotateY).
 */
const VIEW = { fr: 'Voir le projet', en: 'View project' } as const

export function Projects({ lang }: { lang: Lang }) {
  return (
    <section id="work" className="section" data-carousel>
      <div className="container">
        <span className="section-index">02 — {projectsHeading[lang]}</span>
        <h2 className="section-title">{projectsHeading[lang]}</h2>
      </div>

      <div className={styles.stage}>
        <div className={styles.ring} data-ring style={{ ['--n' as string]: projects.length } as CSSProperties}>
          {projects.map((p, i) => (
            <article
              key={p.name}
              className={styles.card}
              style={{ ['--i' as string]: i } as CSSProperties}
            >
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
      </div>
    </section>
  )
}
