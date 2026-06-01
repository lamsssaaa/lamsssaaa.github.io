import { AdaptiveVideo } from '../AdaptiveVideo'
import styles from './VideoInterlude.module.css'

/**
 * Full-bleed cinematic video section (the "3D / showreel" parts).
 * Drop your rendered .mp4 clips at the given paths; until then the poster /
 * neon gradient shows. Quality adapts to the visitor's connection.
 */
export function VideoInterlude({
  id,
  high,
  low,
  poster = '/video/hero-poster.svg',
  caption,
  kicker,
}: {
  id?: string
  high: string
  low: string
  poster?: string
  caption: string
  kicker?: string
}) {
  return (
    <section className={styles.interlude} id={id}>
      <div className="ambient" />
      <div className={styles.media}>
        <AdaptiveVideo high={high} low={low} poster={poster} />
        <div className={styles.scrim} />
      </div>
      <div className={`container ${styles.content}`}>
        {kicker && <span className={styles.kicker}>{kicker}</span>}
        <p className={styles.caption}>{caption}</p>
      </div>
    </section>
  )
}
