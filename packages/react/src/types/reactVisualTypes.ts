import type { CSSProperties } from 'react'

// Sources can be simple strings or arbitrary objects
type AssetSrc = string | any

export type ReactVisualProps= {

  image?: AssetSrc
  video?: AssetSrc

  expand?: boolean
  aspect?: number // An explict aspect ratio
  width?: number | string
  height?: number | string
  fit?: ObjectFitOption | ObjectFit
  position?: string

  priority?: boolean
  sizes?: string
  imageLoader?: ImageLoader
  videoLoader?: VideoLoader
  sourceTypes?: SourceType[]
  sourceMedia?: SourceMedia[]

  paused?: boolean

  alt: string

  className?: string
  style?: CSSProperties
}

// The callback that is used to produce img URLs
export type ImageLoader = ({ src, width, type, media }: {
  src: AssetSrc
  width: number
  type?: SourceType
  media?: SourceMedia
}) => string

// The callback that is used to produce video URLs
export type VideoLoader = ({ src, media }: {
  src: AssetSrc
  media?: SourceMedia
}) => string

export type ObjectFitOption = 'cover' | 'contain'

export type SourceType = 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'image/avif'
  | 'image/webp'
  | string

export type SourceMedia = 'orientation:landscape'
  | 'orientation:portrait'
  | string

// Deprecated
export enum ObjectFit {
  Cover = 'cover',
  Contain = 'contain',
}
