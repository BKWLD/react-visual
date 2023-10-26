import type { CSSProperties } from 'react'

export type ReactVisualTypes = {

  image?: string
  video?: string

  expand?: boolean
  aspect?: number // An explict aspect ratio
  width?: number | string
  height?: number | string
  fit?: ObjectFitOption | ObjectFit
  position?: string

  priority?: boolean
  sizes?: string
  imageLoader?: ImageLoader

  paused?: boolean

  alt: string

  className?: string
  style?: CSSProperties
}

export type ImageLoader = ({ src, width }: {
  src: string
  width: number
}) => string

export type ObjectFitOption = 'cover' | 'contain'

// Deprecated
export enum ObjectFit {
  Cover = 'cover',
  Contain = 'contain',
}
