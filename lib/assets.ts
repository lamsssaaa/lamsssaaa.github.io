import { existsSync } from 'fs'
import { join } from 'path'

const PUBLIC = join(process.cwd(), 'public')

export interface ResolvedBg {
  /** Background video path if one exists, else null. */
  video: string | null
  /** Background image to use (background-N.webp, else the fallback cover). */
  image: string
}

/**
 * Resolves a project's background at build time, in order of preference:
 *  1. /videos/background-{n}.mp4   (if the file exists → use as video)
 *  2. /images/background-{n}.webp  (else, if it exists → use as image)
 *  3. fallback                     (else, the project's cover image)
 * Runs server-side during the static export; the chosen path is baked in.
 */
export function resolveProjectBg(n: number, fallback: string): ResolvedBg {
  const hasVideo = existsSync(join(PUBLIC, 'videos', `background-${n}.mp4`))
  if (hasVideo) {
    const image = existsSync(join(PUBLIC, 'images', `background-${n}.webp`))
      ? `/images/background-${n}.webp`
      : fallback
    return { video: `/videos/background-${n}.mp4`, image }
  }
  const hasImage = existsSync(join(PUBLIC, 'images', `background-${n}.webp`))
  return { video: null, image: hasImage ? `/images/background-${n}.webp` : fallback }
}
