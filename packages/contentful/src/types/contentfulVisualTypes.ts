import type { ReactVisualProps } from '@react-visual/react'

export type ContentfulVisualProps = {
  image?: ContentfulImageAsset | null;
  video?: ContentfulAsset | null;
  src?: ContentfulVisualEntry | null;
  alt?: string; // Can be inferrerd
} & Omit<ReactVisualProps, "alt" | "image" | "video">;

export type ContentfulImageAsset = ContentfulAsset & {
  width: number
  height: number
}

export type ContentfulAsset = {
  title?: string | null
  description?: string // Was not nullable in my tests
  fileName?: string
  url: string
}

export type ContentfulVisualEntry = {
  image?: ContentfulImageAsset | null
  portraitImage?: ContentfulImageAsset | null
  video?: ContentfulAsset | null
  portraitVideo?: ContentfulAsset | null
  alt: string | null
};
