import type { ReactVisualProps } from '@react-visual/react'

export type ContentfulVisualProps = {
  image?: ContentfulImageAsset
  video?: ContentfulAsset
  src?: ContentfulVisualEntry
  alt?: string // Can be inferrerd
} & Omit< ReactVisualProps, 'alt' | 'image' | 'video' >

export type ContentfulImageAsset = ContentfulAsset & {
  width: number
  height: number
}

export type ContentfulAsset = {
  title?: string
  description?: string
  fileName?: string
  url: string
}

export type ContentfulVisualEntry = {
  image?: ContentfulImageAsset
  portraitImage?: ContentfulImageAsset
  video?: ContentfulAsset
  portraitVideo?: ContentfulAsset
  alt: string
}
