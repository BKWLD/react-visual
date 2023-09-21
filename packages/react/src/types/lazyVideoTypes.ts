import type { CSSProperties } from 'react'

export type LazyVideoProps = {
  src: HTMLVideoElement['src']
  alt: string

  // Don't lazy load
  priority?: boolean

  // Use a transparent gif poster image
  noPoster?: boolean

  fit?: CSSProperties['objectFit']
  position?: CSSProperties['objectPosition']
}
