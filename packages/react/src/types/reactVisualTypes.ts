import type { CSSProperties } from 'react'

export type ReactVisualProps = {

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
  sourceTypes?: SourceType[]
  sourceMedia?: SourceMedia[]

  paused?: boolean

  alt: string

  className?: string
  style?: CSSProperties
}

export type ImageLoader = ({ src, width, type, media }: {
  src: string
  width: number
  type?: SourceType
  media?: SourceMedia
}) => string

export type ObjectFitOption = 'cover' | 'contain'

export type SourceType = 'image/jpeg' | 'image/png' | 'image/gif' |
  'image/avif' | 'image/webp' | string

export type SourceMedia = 'orientation:landscape' | 'orientation:portrait' | string

// Deprecated
export enum ObjectFit {
  Cover = 'cover',
  Contain = 'contain',
}
