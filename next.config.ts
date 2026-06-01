import type { NextConfig } from 'next'

// Fully static export: no serverless functions → no cold starts, no 503s.
// Deployable on any static host (Netlify, Cloudflare Pages, GitHub Pages…).
// Security headers + caching live in public/_headers (set by the host).
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
}

export default nextConfig
