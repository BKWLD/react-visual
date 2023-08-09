export type NextVisualProps = {

  image?: string
  video?: string

  alt: string

  expand?: boolean
  aspect?: number // An explict aspect ratio
  width?: number | string
  height?: number | string

  priority?: boolean // Forwarded to next/image

  placeholderData?: string
  sizes?: string // Forwarded to next/image
  fit?: ObjectFit
  position?: string

  className?: string

  dataCy?: string
}

export enum ObjectFit {
  Cover = 'cover',
  Contain = 'contain',
}
