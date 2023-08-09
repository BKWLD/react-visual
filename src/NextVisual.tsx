import Image from 'next/image'

import { NextVisualProps, ObjectFit } from '../types/nextVisualTypes'
import { makeImagePlaceholder } from './lib/placeholder'
import type { CSSProperties, ReactElement } from 'react'
import { fillStyles, transparentGif } from './lib/styles'

// Render a Sanity image via Next/Image
export function NextVisual({
  image, video,
  alt,
  expand, aspect, width, height,
  fit = ObjectFit.Cover, position,
  priority,
  placeholderData, sizes,
  className = '',
}: NextVisualProps): ReactElement | null {

  return (
    <VisualWrapper {...{
      expand,
      width,
      height,
      aspect,
      className, }} >

      {/* Render image */}
      { image && <VisualImage {...{
        src: image,
        sizes,
        alt,
        fit,
        position,
        priority,
        placeholderData,
      }} /> }

      {/* Render video element */}
      { video && <VisualVideo {...{
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

// Wraps media elements and applys layout and other functionality
function VisualWrapper({
  expand, width, height, aspect, children, dataAttributes, className
}: any): ReactElement {

  // Make the wrapper style.  If expanding, use normal fill rules. Otherwise,
  // apply width, height and aspect
  const styles = expand ? fillStyles : {
    position: 'relative', // For expanded elements
    width: typeof width == 'number' ? `${width}px` : width,
    height: typeof height == 'number' ? `${height}px` : height,
    aspectRatio: aspect,
    maxWidth: '100%', // Don't exceed container width
  } as CSSProperties

  // Render wrapping component
  return (
    <div
      data-cy='next-visual'
      className={ className }
      style={ styles }
      {...dataAttributes} >
      { children }
    </div>
  )
}

// An image rendered within the Visual
function VisualImage({
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

// An video rendered within the Visual
function VisualVideo({
  src, alt, fit, position, priority, noPoster
}: any): ReactElement {
  return (
    <video
      playsInline
      preload={ priority ? 'auto' : 'none' }
      aria-label={ alt }
      poster={ noPoster ? transparentGif : undefined }
      style={{
        ...fillStyles,
        objectFit: fit,
        objectPosition: position,
      }}>
      <source src={ src } />
    </video>
  )
}
