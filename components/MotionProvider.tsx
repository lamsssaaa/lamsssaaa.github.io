'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Smooth scrolling (Lenis) + scroll-driven animations (GSAP ScrollTrigger):
 *  - parallax on [data-parallax] (depth as you scroll)
 *  - 3D tilt + rise reveal on .section-title and [data-fx="rise"]
 * Disabled under prefers-reduced-motion. Replaces the old SmoothScroll.
 */
export function MotionProvider() {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      // Parallax: media drifts slower than the page (kept oversized so no gaps).
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.set(el, { scale: 1.2 })
        gsap.fromTo(
          el,
          { yPercent: -9 },
          {
            yPercent: 9,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })

      // 3D tilt + rise reveal on headings and tagged blocks.
      gsap.utils.toArray<HTMLElement>('.section-title, [data-fx="rise"]').forEach((el) => {
        gsap.from(el, {
          y: 64,
          opacity: 0,
          rotateX: 14,
          transformPerspective: 900,
          transformOrigin: 'center top',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })

      ScrollTrigger.refresh()
    })

    return () => {
      ctx.revert()
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return null
}
