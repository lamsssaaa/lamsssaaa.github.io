'use client'
import { useEffect, useState } from 'react'
import styles from './Header.module.css'

export function ThemeToggle({ label }: { label: string }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme')
    setTheme(current === 'light' ? 'light' : 'dark')
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {}
  }

  return (
    <button type="button" className={styles.iconBtn} onClick={toggle} aria-label={label} title={label}>
      {theme === 'dark' ? '☾' : '☀'}
    </button>
  )
}
