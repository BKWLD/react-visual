// import type { NextVisualProps } from '@react-visual/next'

export type SanityNextVisualProps = {

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
  // style?: CSSProperties
}

export enum ObjectFit {
  Cover = 'cover',
  Contain = 'contain',
}
