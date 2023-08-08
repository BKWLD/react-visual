import Image from 'next/image'

import { NextVisualProps, ObjectFit } from '../types/nextVisualTypes'
import type { ImageProps } from 'next/image'
import type { CSSProperties, ReactElement } from 'react'

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

  // Return without error if no source
  if (!image && !video) return null

  // Render fixed size image because a width and height were supplied
  if (width && height) {
    if (image && !video) {
      return <FixedSizeImage {...{
        image, alt, width, height, priority, placeholderData, className
      }} />
    } else if (!image && video) {
      return <FixedSizeVideo {...{
        video, alt, width, height, priority, className
      }} />
    } else {
      return (
        <div
          data-cy='next-visual'
          style={{
            position: 'relative',
            display: 'inline-block',
            lineHeight: 0,
          }}
          className={ className }>
          <ExpandingImage {...{
            image, alt, priority, sizes: `${width}px`
          }} />
          <FixedSizeVideo {...{
            video, alt, width, height, priority, noPoster: true, style: {
              position: 'relative'
            }
          }} />
        </div>
      )
    }
  }

  // Render an expanding image
  if (expand) {
    if (image && !video) {
      return <ExpandingImage {...{
        image, alt, priority, sizes, fit, position, className
      }} />
    } else if (!image && video) {
      return <ExpandingVideo {...{
        video, alt, priority, fit, position, className
      }} />
    }
  }

  // Return an image that preserves the expact ratio
  if (aspect) {
    if (image && !video) {
      return (
        <AspectRespectingWrapper {...{ aspect, className }}>
          <ExpandingImage {...{
            image, alt, priority, sizes, fit, position
          }} />
        </AspectRespectingWrapper>
      )
    } else if (!image && video) {
      return (
        <AspectRespectingWrapper {...{ aspect, className }}>
          <ExpandingVideo {...{
            video, alt, priority, fit, position
          }} />
        </AspectRespectingWrapper>
      )
    }
  }

  // Should never be hit, but TypeScript wants this
  return null
}

// Make an image at a specific size
function FixedSizeImage({
  image, alt, width, height, priority, placeholderData, className = ''
}: any): ReactElement {
  return (
    <Image
      src={ image }
      width={ width }
      height={ height }
      priority={ priority }
      alt={ alt }
      className={ className }
      { ...makeImagePlaceholder(placeholderData) }
    />
  )
}

// Transparent gif to use own image as poster
// https://stackoverflow.com/a/13139830/59160
const transparentGif = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

// Make an video at a specific size
function FixedSizeVideo({
  video, alt, width, height, priority, noPoster, style, className = ''
}: any): ReactElement {
  return (
    <video
      playsInline
      width={ width }
      height={ height }
      preload={ priority }
      aria-label={ alt }
      poster={ noPoster ? transparentGif : undefined }
      style={ style }
      className={ className }>
      <source src={ video } />
    </video>
  )
}

// Render an image that expands to fill it's container
function ExpandingImage({
  image, alt, priority, sizes, placeholderData,
  fit = ObjectFit.Cover, position,
  className = ''
}: any): ReactElement {
  return (
    <Image
      src={ image }
      // loader={ makeImageLoader(source) }
      fill
      sizes={ sizes }
      priority={ priority }
      alt={ alt }
      className={ className }
      style={{
        objectFit: fit,
        objectPosition: position,
      }}
      { ...makeImagePlaceholder(placeholderData) }
    />
  )
}

// Make an image at a specific size, using the Sanity CDN to generate sizes
function ExpandingVideo({
  video, alt, priority, fit = ObjectFit.Cover, position, className = ''
}: any): ReactElement {

  // Mimic the styles that next/image sets when `fill` prop is applied
  const fillStyles = {
    position: 'absolute',
    height: '100%',
    width: '100%',
    inset: '0px',
  } as CSSProperties

  return (
    <video
      playsInline
      width='100%'
      height='100%'
      preload={ priority }
      aria-label={ alt }
      className={ className }
      style={{
        ...fillStyles,
        objectFit: fit,
        objectPosition: position,
      }}>
      <source src={ video } />
    </video>
  )
}

// Render wrapper element who is used to set the aspect ratio, when
// not expanding.
function AspectRespectingWrapper({
  aspect, children, className = ''
}: any): ReactElement {
  return (
    <div
      className={ className }
      style={{
        position: 'relative',
        aspectRatio: aspect,
      }}>
      { children }
    </div>
  )
}

// Make the placeholder props that next/image uses
function makeImagePlaceholder(
  placeholderData: ImageProps['blurDataURL']
): Pick<ImageProps, 'placeholder' | 'blurDataURL'> | null {
  if (!placeholderData) return null
  return {
    placeholder: 'blur',
    blurDataURL: placeholderData,
  }
}
