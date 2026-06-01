'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Smooth scrolling (Lenis) + scroll-driven animations (GSAP ScrollTrigger):
 *  - hero intro timeline on load ([data-anim])
 *  - parallax on [data-parallax] media (video/photo behind drifts slower)
 *  - DIAGONAL drift on [data-diagonal] (project rectangles glide diagonally)
 *  - 3D tilt + rise reveal on .section-title and [data-fx="rise"]
 *  - word-by-word reveal on [data-words] > span
 * Disabled under prefers-reduced-motion.
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
      // Hero intro on load.
      gsap.from('[data-anim]', { y: 48, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.15 })

      // Parallax: media drifts slower than the page (kept oversized so no gaps).
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.set(el, { scale: 1.25 })
        gsap.fromTo(
          el,
          { yPercent: -10 },
          { yPercent: 10, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })

      // Diagonal drift: the project rectangle glides diagonally as it passes.
      // Direction alternates per item for a dynamic feel.
      gsap.utils.toArray<HTMLElement>('[data-diagonal]').forEach((el, i) => {
        const dir = i % 2 === 0 ? 1 : -1
        gsap.fromTo(
          el,
          { xPercent: 7 * dir, yPercent: 16, opacity: 0.35 },
          {
            xPercent: -7 * dir,
            yPercent: -16,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: el.closest('article') ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
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

      // Word-by-word reveal.
      gsap.utils.toArray<HTMLElement>('[data-words]').forEach((el) => {
        gsap.from(el.querySelectorAll('span'), {
          yPercent: 110,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      })

      ScrollTrigger.refresh()
    })

    // Diagonal travel: each project card rides a diagonal as you scroll its
    // slot — 0% bottom-right, 50% centered, 100% top-left. Desktop only.
    const mm = gsap.matchMedia()
    mm.add('(min-width: 760px)', () => {
      const tweens = gsap.utils.toArray<HTMLElement>('[data-diag]').map((rect) => {
        const slot = rect.closest('[data-slot]') as HTMLElement | null
        return gsap.fromTo(
          rect,
          { x: () => window.innerWidth * 0.42, y: () => window.innerHeight * 0.45, rotateZ: 2 },
          {
            x: () => -window.innerWidth * 0.42,
            y: () => -window.innerHeight * 0.45,
            rotateZ: -2,
            ease: 'none',
            scrollTrigger: {
              trigger: slot ?? rect,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        )
      })
      return () => tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill() })
    })

    return () => {
      ctx.revert()
      mm.revert()
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return null
}
