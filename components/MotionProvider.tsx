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

    // Diagonal "spiral" timeline: the work section pins and project cards ride
    // a shared timeline, staggered so consecutive cards are 0.4 apart in local
    // progress (at 50% the previous is at 90%, the next at 10%). Each card goes
    // bottom-right → center → top-left, with an opacity curve (0→.2→1→.2→0) and
    // a fisheye-like scale bulge at center. Desktop only.
    const mm = gsap.matchMedia()
    mm.add('(min-width: 760px)', () => {
      const section = document.querySelector<HTMLElement>('[data-diag-section]')
      const cards = gsap.utils.toArray<HTMLElement>('[data-diag]')
      const bgs = gsap.utils.toArray<HTMLElement>('[data-bg]')
      const titles = gsap.utils.toArray<HTMLElement>('[data-bigtitle]')
      if (!section || !cards.length) return
      section.setAttribute('data-on', '')
      const STEP = 0.4
      const total = (cards.length - 1) * STEP + 1
      const ax = () => window.innerWidth * 0.36

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => '+=' + window.innerHeight * total,
          invalidateOnRefresh: true,
        },
      })

      cards.forEach((card, i) => {
        const at = i * STEP
        // Vertical amplitude tied to card WIDTH: neighbours (0.4 apart) sit
        // ~25% of a card width apart vertically (staircase offset).
        const ay = () => (card.offsetWidth || 600) * 0.3125
        // Diagonal position + 3D flip. Linear rotateY ramp that reads as 65° at
        // -10%, 0° at 50%, -65° at 110% → ~±54° at the visible edges.
        tl.fromTo(
          card,
          { xPercent: -50, yPercent: -50, x: () => ax(), y: () => ay(), rotationY: 54, transformPerspective: 1200, transformOrigin: 'center center' },
          { xPercent: -50, yPercent: -50, x: () => -ax(), y: () => -ay(), rotationY: -54, transformPerspective: 1200, ease: 'none', duration: 1 },
          at,
        )
        // Opacity curve + fisheye bulge (taller than wide → bigger top/bottom).
        const e = 'none'
        tl.set(card, { opacity: 0, scaleX: 0.66, scaleY: 0.66, borderRadius: 16, zIndex: 1 }, at)
        tl.to(card, { opacity: 0.2, scaleX: 0.8, scaleY: 0.85, zIndex: 2, duration: 0.1, ease: e }, at)
        tl.to(card, { opacity: 1, scaleX: 1.12, scaleY: 1.32, borderRadius: 48, zIndex: 10, duration: 0.3, ease: e }, at + 0.1)
        tl.to(card, { scaleX: 1.15, scaleY: 1.38, duration: 0.2, ease: e }, at + 0.4) // hold opacity 1 (40–60%)
        tl.to(card, { opacity: 0.2, scaleX: 0.8, scaleY: 0.85, borderRadius: 16, zIndex: 2, duration: 0.3, ease: e }, at + 0.6)
        tl.to(card, { opacity: 0, scaleX: 0.66, scaleY: 0.66, duration: 0.1, ease: e }, at + 0.9)

        // Full-bleed background of the active project (crossfade, peak at center).
        const bg = bgs[i]
        if (bg) {
          tl.set(bg, { opacity: 0, zIndex: 0 }, at)
          tl.to(bg, { opacity: 1, zIndex: 1, duration: 0.5, ease: 'power1.inOut' }, at)
          tl.to(bg, { opacity: 0, zIndex: 0, duration: 0.5, ease: 'power1.inOut' }, at + 0.5)
        }
        // Big bottom-left title for the active project.
        const title = titles[i]
        if (title) {
          tl.set(title, { opacity: 0, y: 50 }, at)
          tl.to(title, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, at + 0.1)
          tl.to(title, { opacity: 0, y: -40, duration: 0.3, ease: 'power2.in' }, at + 0.6)
        }
      })

      return () => {
        section.removeAttribute('data-on')
        tl.scrollTrigger?.kill()
        tl.kill()
      }
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
