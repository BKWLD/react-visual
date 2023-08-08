// import type { ImageProps } from 'next/image'

export type NextVisualProps = {

  image?: string
  video?: string

  alt: string

  expand?: boolean
  aspect?: number // An explict aspect ratio
  width?: number
  height?: number

  priority?: boolean // Forwarded to next/image

  placeholderData?: string
  sizes?: string // Forwarded to next/image
  fit?: ObjectFit
  position?: string

  className?: string
}

export enum ObjectFit {
  Cover = 'cover',
  Contain = 'contain',
}

export type NextImageProps = Omit<NextVisualProps, "video">


// export type NextVisualProps = {
// 	image?: string
// 	video?: string
// 	expand?: boolean
//   aspect?: number // An explict aspect ratio
// } & Omit<ImageProps, "src">

// export type NextImageProps = Omit<NextVisualProps, "video">
