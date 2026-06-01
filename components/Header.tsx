'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { UI, otherLang, type Lang } from '../lib/i18n'
import { profile } from '../data/content'
import { ThemeToggle } from './ThemeToggle'
import styles from './Header.module.css'

const NAV = [
  { id: 'work', key: 'work' },
  { id: 'services', key: 'services' },
  { id: 'distinctions', key: 'distinctions' },
  { id: 'about', key: 'about' },
  { id: 'contact', key: 'contact' },
] as const

export function Header({ lang }: { lang: Lang }) {
  const t = UI[lang]
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.bar}`}>
        <Link href={`/${lang}`} className={styles.brand}>
          {profile.name}
        </Link>

        <nav className={styles.desktopNav} aria-label={t.nav.services}>
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={styles.navLink}>
              {t.nav[n.key]}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href={`/${otherLang(lang)}`} className={styles.langBtn} aria-label={t.toggleLang}>
            {otherLang(lang).toUpperCase()}
          </Link>
          <ThemeToggle label={t.toggleTheme} />
          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-label={open ? t.close : t.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <div className={styles.mobileNav}>
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={styles.mobileLink} onClick={() => setOpen(false)}>
              {t.nav[n.key]}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
