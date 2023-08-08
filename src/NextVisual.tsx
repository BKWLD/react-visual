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

  // If the image was not de-referenced and we're not expanding it, then
  // next/image requires a width and height, so throw an error
  // if (!expand && !aspect && (!width || !height)) {
  //   throw `If not using the \`expand\` prop, you need to either set an explicit
  //     \`width\` and \`height\` (next/image requires this) or \'aspect\'.`
  // }

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
    return <AspectRespectingImage {...{
      image, alt, aspect, priority, sizes, className
    }} />
  }

  // Should never be hit, but TypeScript wants this
  return null
}

// Make an image at a specific size, using the Sanity CDN to generate sizes
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

// Make an image at a specific size, using the Sanity CDN to generate sizes
function FixedSizeVideo({
  video, alt, width, height, priority, className = ''
}: any): ReactElement {
  return (
    <video
      playsInline
      width={ width }
      height={ height }
      preload={ priority }
      aria-label={ alt }
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
function AspectRespectingImage({
  image, alt, aspect, priority, sizes, placeholderData, className = ''
}: any): ReactElement {
  return (
    <div
      className={ className }
      style={{
        position: 'relative',
        aspectRatio: aspect,
      }}>
      <ExpandingImage {...{
        image, alt, priority, sizes, placeholderData, className
      }} />
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
