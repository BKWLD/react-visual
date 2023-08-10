import Image from 'next/image'
import type { ReactElement } from 'react'

import { makeImagePlaceholder } from './lib/placeholder'
import {
  VisualWrapper,
  LazyVideo,
  collectDataAttributes,
} from 'react-visual'

import { NextVisualProps, ObjectFit } from './types/nextVisualTypes'

// Render a Sanity image via Next/Image
export function NextVisual(props: NextVisualProps): ReactElement | null {

  // Destructure props
  const {
    image,
    video,
    placeholderData,
    expand,
    aspect,
    width,
    height,
    fit = ObjectFit.Cover,
    position,
    priority,
    sizes,
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
        placeholderData,
      }} /> }

      {/* Render video element */}
      { video && <LazyVideo {...{
        src: video,
        alt,
        fit,
        position,
        priority,
        noPoster: !!image // Use `image` as poster frame
      }} /> }

    </VisualWrapper>
  )
}

// An image rendered within the Visual
function NextImage({
  src, sizes, alt, fit, position, priority, placeholderData
}: any): ReactElement {
  return (
    <Image
      { ...{ src, sizes, priority, alt } }
      fill
      style={{
        objectFit: fit,
        objectPosition: position,
      }}
      { ...makeImagePlaceholder(placeholderData) }
    />
  )
}

