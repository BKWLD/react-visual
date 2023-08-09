import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

import { NextVisualProps, ObjectFit } from './types/nextVisualTypes'
import { makeImagePlaceholder } from './lib/placeholder'
import type { CSSProperties, ReactElement } from 'react'
import { fillStyles, transparentGif } from './lib/styles'
import { collectDataAttributes } from './lib/attributes'

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
  expand, width, height, aspect, children, className, style, dataAttributes
}: any): ReactElement {

  // Make the wrapper style.  If expanding, use normal fill rules. Otherwise,
  // apply width, height and aspect
  const layoutStyles = expand ? fillStyles : {
    position: 'relative', // For expanded elements
    width: typeof width == 'number' ? `${width}px` : width,
    height: typeof height == 'number' ? `${height}px` : height,
    aspectRatio: aspect,
    maxWidth: '100%', // Don't exceed container width
  } as CSSProperties

  // Render wrapping component
  return (
    <div
      className={ className }
      style={{ ...layoutStyles, ...style }}
      { ...dataAttributes } >
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

  // Watch for in viewport to load video unless using priority
  const { ref, inView } = useInView({
    skip: priority
  })

  // Simplify logic for whether to load sources
  const shouldLoad = priority || inView

  return (
    <video

      // Props that allow us to autoplay videos like a gif
      playsInline
      autoPlay
      muted
      loop

      // Load a transparent gif as a poster if an `image` was specified so
      // the image is used as poster rather than the first frame of video. This
      // lets us all use responsive poster images (via `next/image`).
      poster={ noPoster ? transparentGif : undefined }

      // Straightforward props
      ref={ref}
      preload={ shouldLoad ? 'auto' : 'none' }
      aria-label={ alt }
      style={{
        ...fillStyles,
        objectFit: fit,
        objectPosition: position,
      }}>

      {/* Implement lazy loading by not adding the source until ready */}
      { shouldLoad && <source src={ src } /> }
    </video>
  )
}
