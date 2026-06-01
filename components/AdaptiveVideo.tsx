'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './AdaptiveVideo.module.css'

type Mode = 'high' | 'low' | 'off'

interface NetworkInformation extends EventTarget {
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g'
  saveData?: boolean
}

/**
 * Background video that adapts to the visitor's connection:
 *  - fast (4g / unknown)  → high-quality source
 *  - 3g                   → low-quality source
 *  - 2g / save-data / reduced-motion → poster image only (no video download)
 * The video is lazy (preload="none"), only loads/plays when on screen, and
 * pauses when scrolled away — smooth, no wasted bandwidth.
 */
export function AdaptiveVideo({
  high,
  low,
  poster,
  className,
}: {
  high: string
  low: string
  poster: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [mode, setMode] = useState<Mode>('high')
  const [inView, setInView] = useState(false)

  // Decide quality from the Network Information API + user preferences.
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection

    const decide = (): Mode => {
      if (reduced) return 'off'
      if (conn?.saveData) return 'off'
      const et = conn?.effectiveType
      if (et === 'slow-2g' || et === '2g') return 'off'
      if (et === '3g') return 'low'
      return 'high'
    }

    setMode(decide())
    const onChange = () => setMode(decide())
    conn?.addEventListener?.('change', onChange)
    return () => conn?.removeEventListener?.('change', onChange)
  }, [])

  // Only mount/play the video when it scrolls into view; pause when it leaves.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [mode])

  const src = mode === 'low' ? low : high

  if (mode === 'off') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={poster} alt="" aria-hidden="true" className={`${styles.media} ${className ?? ''}`} />
    )
  }

  return (
    <video
      ref={ref}
      className={`${styles.media} ${className ?? ''}`}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      // Load the chosen source only once the element is in view.
      src={inView ? src : undefined}
    />
  )
}
