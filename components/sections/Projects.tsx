import type { CSSProperties } from 'react'
import { type Lang } from '../../lib/i18n'
import { projectsHeading, projects } from '../../data/content'
import { AdaptiveVideo } from '../AdaptiveVideo'
import { resolveProjectBg } from '../../lib/assets'
import styles from './Projects.module.css'

/**
 * "Travaux récents" — desktop "vortex": three layers driven by MotionProvider.
 *  1. full-bleed background of the active project (crossfades on scroll)
 *  2. a big bottom-left title for the active project
 *  3. floating project cards that arc through (diagonal + 3D rotateY + bulge)
 * Mobile / reduced-motion fall back to a clean vertical stack (cards only).
 */
const VIEW = { fr: 'Voir le projet', en: 'View project' } as const
const SCROLL = { fr: 'Faites défiler', en: 'Scroll' } as const

export function Projects({ lang }: { lang: Lang }) {
  const v = (i: number) => ({ ['--i' as string]: i }) as CSSProperties
  return (
    <section id="work" className="section" data-diag-section>
      <div className="container">
        <span className="section-index">02 — {projectsHeading[lang]}</span>
        <h2 className="section-title">{projectsHeading[lang]}</h2>
      </div>

      <div className={styles.stage} data-stage>
        {/* 1. Full-bleed backgrounds (one per project, crossfading). Resolved at
            build: /videos/background-N.mp4 → /images/background-N.webp → cover. */}
        {projects.map((p, i) => {
          const bg = resolveProjectBg(i + 1, p.poster ?? '/videos/hero-poster.svg')
          return (
            <div key={`bg-${i}`} className={styles.bg} data-bg style={v(i)}>
              {bg.video ? (
                <AdaptiveVideo high={bg.video} low={bg.video} poster={bg.image} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img className={styles.bgImg} src={bg.image} alt="" aria-hidden="true" />
              )}
              <div className={styles.bgShade} />
            </div>
          )
        })}

        {/* 2. Big bottom-left title for the active project. */}
        {projects.map((p, i) => (
          <div key={`t-${i}`} className={styles.bigTitle} data-bigtitle style={v(i)}>
            <h3 className={styles.bigName}>{p.name}</h3>
            <p className={styles.bigLine}>{p.line[lang]}</p>
          </div>
        ))}
        <span className={styles.scrollHint}>{SCROLL[lang]} — {VIEW[lang]}</span>

        {/* 3. Floating "vortex" cards. */}
        {projects.map((p, i) => (
          <article key={p.name} className={styles.card} data-diag style={v(i)}>
            <div className={styles.media}>
              <AdaptiveVideo high={p.videoHigh ?? '/videos/hero-high.mp4'} low={p.videoLow ?? '/videos/hero-low.mp4'} poster={p.poster ?? '/videos/hero-poster.svg'} />
              <div className={styles.shade} />
            </div>
            <div className={styles.overlay}>
              <span className={styles.idx}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.name}>{p.name}</h3>
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
