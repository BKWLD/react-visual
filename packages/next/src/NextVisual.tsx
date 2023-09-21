import Image from 'next/image'
import type { ReactElement } from 'react'

import { makeImagePlaceholder } from './lib/placeholder'
import {
  VisualWrapper,
  LazyVideo,
  collectDataAttributes,
} from '@react-visual/react'

import { NextVisualProps } from './types/nextVisualTypes'

// Render a Sanity image via Next/Image
export default function NextVisual(
  props: NextVisualProps
): ReactElement | null {

  // Destructure props
  const {
    image,
    video,
    placeholderData,
    expand,
    aspect,
    width,
    height,
    fit = 'cover',
    position,
    priority,
    sizes,
    imageLoader,
    playing,
    alt,
    className = '',
    style = {},
  } = props

  // If no asset, return nothing
  if (!image && !video) return null

  return (
    <VisualWrapper {...{
      expand,
      width,
      height,
      aspect,
      className,
      style,
      dataAttributes: collectDataAttributes(props),
    }}>

      {/* Render image */}
      { image && <NextImage {...{
        src: image,
        sizes,
        alt,
        fit,
        position,
        priority,
        loader: imageLoader,
        placeholderData,
      }} /> }

      {/* Render video element */}
      { video && <LazyVideo {...{
        src: video,
        alt,
        fit,
        position,
        priority,
        noPoster: !!image, // Use `image` as poster frame
        playing,
      }} /> }

    </VisualWrapper>
  )
}

// An image rendered within the Visual
function NextImage({
  src, sizes, alt, fit, position, priority, loader, placeholderData
}: any): ReactElement {
  return (
    <Image
      { ...{ src, sizes, priority, loader, alt } }
      fill
      style={{
        objectFit: fit,
        objectPosition: position,
      }}
      { ...makeImagePlaceholder(placeholderData) }
    />
  )
}

