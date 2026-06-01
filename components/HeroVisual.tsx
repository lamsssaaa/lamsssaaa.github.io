'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// 3D scene is client-only and code-split: its bundle loads only when we decide
// the device/connection can handle it. Otherwise the neon ambient gradient
// (behind, in the Hero) is the graceful fallback — smooth everywhere.
const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false })

interface NetworkInformation {
  effectiveType?: string
  saveData?: boolean
}

export function HeroVisual() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection
    const lowData =
      conn?.saveData === true ||
      (conn?.effectiveType ? ['slow-2g', '2g', '3g'].includes(conn.effectiveType) : false)
    if (!reduced && !lowData) setEnabled(true)
  }, [])

  if (!enabled) return null
  return <Hero3D />
}
