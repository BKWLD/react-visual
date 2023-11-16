import type { ReactElement } from 'react'
import type { pictureImageProps } from './types/pictureImageTypes'
import type { ImageLoader } from './types/reactVisualTypes'
import { srcsetSizes } from './lib/sizes'
type ImageSrc = pictureImageProps['src']

export default function PictureImage(
  props: pictureImageProps
): ReactElement {

  // Destructure props
  const {
    src,
    fit = 'cover',
    position,
    priority,
    sizes,
    imageLoader,
    style,
    alt,
  } = props

  // Apply layout styles
  const layoutStyles = {
    objectFit: fit,
    objectPosition: position
  }

  // Unless priority flag was set, lazy load the image
  const loading = priority ? undefined : 'lazy'

  // Always wrap in picture element for standard DOM structure
  return (
    <picture>
      {imageLoader && <Sources {...{ src, imageLoader }} />}
      <img
        style={{ ...layoutStyles, ...style }}
        {...{ src, loading, alt, sizes }}
      />
    </picture>
  )
}

// Make the array of Picture sources
function Sources({ src, imageLoader }: {
  src: ImageSrc
  imageLoader: ImageLoader
}): ReactElement {

  // Make the srcset
  const srcSet = makeSrcSet(src, srcsetSizes, imageLoader)

  // Make the source
  return (
    <source {...{ srcSet }} />
  )

}

// Make a srcset string from an array of width integers using the imageLoader
// function
function makeSrcSet(
  src: ImageSrc,
  widths: number[],
  imageLoader: ImageLoader
): string {
  return widths.map((width) => {
    return imageLoader({ src, width }) + ` w${width}`
  }).join(', ')

}
