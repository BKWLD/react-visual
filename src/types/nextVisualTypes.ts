import type { CSSProperties } from 'react'

export type NextVisualProps = {

  image?: string
  video?: string
  placeholderData?: string

  expand?: boolean
  aspect?: number // An explict aspect ratio
  width?: number | string
  height?: number | string
  fit?: ObjectFit
  position?: string

  priority?: boolean
  sizes?: string

  alt: string

  className?: string
  style?: CSSProperties
}

export enum ObjectFit {
  Cover = 'cover',
  Contain = 'contain',
}
