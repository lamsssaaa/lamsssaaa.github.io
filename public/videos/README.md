# Hero video assets

Drop your hero background videos here. The adaptive player picks the right one
based on the visitor's connection (see `components/AdaptiveVideo.tsx`):

- `hero-high.mp4` — high quality, shown on fast connections (4G / Wi-Fi).
  Suggested: 1080p, H.264, ~3–5 Mbps, muted, a few seconds looping.
- `hero-low.mp4` — low quality, shown on 3G. Suggested: 720p or 480p, ~0.8–1.2 Mbps.
- `hero-poster.svg` (already here) — shown instantly and on very slow / data-saver
  connections (2G, Save-Data, reduced-motion). Replace with a real `hero-poster.jpg`
  (1600×900) if you prefer, and update the `poster` path in `components/sections/Hero.tsx`.

Until you add the mp4 files, the hero shows the poster/gradient — the site works fine.

Quick encode example (ffmpeg):
  ffmpeg -i source.mov -vf scale=1920:-2 -an -b:v 4M -movflags +faststart hero-high.mp4
  ffmpeg -i source.mov -vf scale=854:-2  -an -b:v 1M -movflags +faststart hero-low.mp4
