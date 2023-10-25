import type { CSSProperties } from 'react'

export type ReactVisualTypes = {

  image?: string
  video?: string
  placeholderData?: string

  expand?: boolean
  aspect?: number // An explict aspect ratio
  width?: number | string
  height?: number | string
  fit?: ObjectFitOption | ObjectFit
  position?: string

  priority?: boolean
  sizes?: string
  imageLoader?: Function

  paused?: boolean

  alt: string

  className?: string
  style?: CSSProperties
}

export type ObjectFitOption = 'cover' | 'contain'

// Deprecated
export enum ObjectFit {
  Cover = 'cover',
  Contain = 'contain',
}
