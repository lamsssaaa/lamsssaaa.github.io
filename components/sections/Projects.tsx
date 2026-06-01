import { type Lang } from '../../lib/i18n'
import { projectsHeading, projects } from '../../data/content'
import { AdaptiveVideo } from '../AdaptiveVideo'
import styles from './Projects.module.css'

/**
 * "Travaux récents" — full-width cinematic project blocks (one per row): a
 * full-bleed adaptive showcase video with the project name + concept line
 * overlaid. Drop files in /public/video/work-N-*.mp4; until then the neon
 * poster shows. Quality adapts to the visitor's connection.
 */
export function Projects({ lang }: { lang: Lang }) {
  return (
    <section id="work" className="section">
      <div className="container">
        <span className="section-index">02 — {projectsHeading[lang]}</span>
        <h2 className="section-title">{projectsHeading[lang]}</h2>
      </div>

      <div className={styles.stack}>
        {projects.map((p, i) => (
          <article key={p.name} className={styles.block} data-fx="rise">
            <div className={styles.media}>
              <AdaptiveVideo
                high={p.videoHigh ?? '/video/hero-high.mp4'}
                low={p.videoLow ?? '/video/hero-low.mp4'}
                poster={p.poster ?? '/video/hero-poster.svg'}
              />
              <div className={styles.shade} />
            </div>
            <div className={`container ${styles.overlay}`}>
              <div className={styles.lead}>
                <span className={styles.idx}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.name}>{p.name}</h3>
                <p className={styles.line}>{p.line[lang]}</p>
              </div>
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
