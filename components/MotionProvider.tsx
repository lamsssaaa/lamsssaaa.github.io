'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Smooth scrolling (Lenis) + scroll-driven animations (GSAP ScrollTrigger):
 *  - hero intro timeline on load ([data-anim], ordered by DOM)
 *  - parallax on [data-parallax] media (depth as you scroll)
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
      gsap.from('[data-anim]', {
        y: 48,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.15,
      })

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

      // Word-by-word reveal.
      gsap.utils.toArray<HTMLElement>('[data-words]').forEach((el) => {
        const words = el.querySelectorAll('span')
        gsap.from(words, {
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

    // Pinned horizontal "swipe": the work section pins and its panels slide
    // sideways as you scroll. Desktop only; mobile keeps the vertical stack.
    const mm = gsap.matchMedia()
    mm.add('(min-width: 760px)', () => {
      const section = document.querySelector<HTMLElement>('[data-hsection]')
      const track = document.querySelector<HTMLElement>('[data-hscroll]')
      if (!section || !track) return
      section.setAttribute('data-h', 'on')
      const amount = () => track.scrollWidth - window.innerWidth
      const tween = gsap.to(track, {
        x: () => -amount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => '+=' + amount(),
          invalidateOnRefresh: true,
        },
      })
      return () => {
        section.removeAttribute('data-h')
        tween.scrollTrigger?.kill()
        tween.kill()
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
