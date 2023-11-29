import Image from 'next/image'
import type { ReactElement } from 'react'

import ReactVisual, {
  collectDataAttributes,
} from '@react-visual/react'

import { ContentfulVisualProps } from './types/contentfulVisualTypes'

// Render a Sanity image via Next/Image
export default function NextVisual(
  props: ContentfulVisualProps
): ReactElement | null {

  // Destructure props
  const {
    image,
    video,
    expand,
    aspect,
    width,
    height,
    fit = 'cover',
    position,
    priority,
    sizes,
    imageLoader,
    paused,
    alt,
    className = '',
    style = {},
  } = props

  // If no asset, return nothing
  if (!image && !video) return null

  return (
    <ReactVisual { ...props } />
  )
}
