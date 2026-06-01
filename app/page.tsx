'use client'
import { useEffect } from 'react'
import { DEFAULT_LANG } from '../lib/i18n'

// Static root stub: the host's _redirects sends / → /fr server-side; this is the
// client-side fallback for any static host without redirect rules.
export default function RootPage() {
  const target = `/${DEFAULT_LANG}/`
  useEffect(() => {
    window.location.replace(target)
  }, [target])
  return (
    <a href={target} style={{ display: 'inline-block', padding: '2rem', color: 'var(--fg)' }}>
      Eclipse →
    </a>
  )
}
