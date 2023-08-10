import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Build the alt text from common places it may exist
export function altTextFromSource(
  source: SanityImageSource
): string {
  if (typeof source != 'object') return ''
  else if ('alt' in source) return source.alt
  else if ('title' in source) return source.title
  else if ('caption' in source) return source.caption
  return ''
}

// Figure out the aspect ratio from the source
export function aspectRatioFromSource(
  source: SanityImageSource
): number | null {
  if (typeof source != 'object' || !('asset' in source)) return null
  return source.asset.metadata?.dimensions?.aspectRatio
}

// Make object-position values from the hotspot data
export function objectPositionFromSource(
  source: SanityImageSource
): string | null {
  if (typeof source != 'object' || !('hotspot' in source)) return null
  const left = source.hotspot.x - source.crop.left + source.crop.right,
    top =  source.hotspot.y - source.crop.top + source.crop.bottom
  return `${left * 100}% ${(top) * 100}%`
}

// Use lqip to make placeholder props
export function placeholderFromSource(
  source: SanityImageSource
): string| null {
  if (typeof source != 'object' || !('asset' in source)) return null
  return source.asset?.metadata?.lqip
}
