import type { CSSProperties } from 'react'

// Sources can be simple strings or arbitrary objects
type AssetSrc = string | any

// https://chat.openai.com/share/103de5c4-0af0-44c1-8f36-46743a0f964c
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
  imageLoader?: AssetLoader
  videoLoader?: AssetLoader
  sourceTypes?: SourceType[]
  sourceMedia?: SourceMedia[]

  paused?: boolean

  alt: string

  className?: string
  style?: CSSProperties
}

// The callback that is used to produce asset URL strings
export type AssetLoader = ({ src, width, type, media }: {
  src: AssetSrc
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
