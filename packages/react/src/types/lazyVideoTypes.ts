import type { CSSProperties } from 'react'

export type LazyVideoProps = {

  // Source props
  src: HTMLVideoElement['src']
  alt: string

  // Don't lazy load
  priority?: boolean

  // Use a transparent gif poster image
  noPoster?: boolean

  // Controls autoplaying and current playing state
  playing?: boolean

  // Display props
  fit?: CSSProperties['objectFit']
  position?: CSSProperties['objectPosition']
}
