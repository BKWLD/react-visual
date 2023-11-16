import type { ReactElement } from 'react'
import type { PictureImageProps } from './types/pictureImageTypes'
import type { ImageLoader } from './types/reactVisualTypes'
import { deviceSizes, imageSizes } from './lib/sizes'

type ImageSrc = PictureImageProps['src']
type SourcesProps = Pick<PictureImageProps, 'src' | 'sizes'> &
  Required<Pick<PictureImageProps, 'imageLoader'>>

export default function PictureImage(
  props: PictureImageProps
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

  // Determine the widths to use for srcset. Include small widths only when
  // sizes is specified, like Next.js does
  const srcsetWidths = [
    ...(sizes && sizes != '100vw' ? imageSizes : []),
    ...deviceSizes,
  ]

  // Make the img srcset. When I had a single <source> with no type or media
  // attribute, the srcset would not affect the image loaded.  Thus, I'm
  // applying it to the img tag
  const srcSet = imageLoader && makeSrcSet(src, srcsetWidths, imageLoader)

  // Always wrap in picture element for standard DOM structure
  return (
    <picture>
      <img
        style={{ ...layoutStyles, ...style }}
        {...{ src, loading, alt, srcSet, sizes }}
      />
    </picture>
  )
}

// Make the array of Picture sources
function Sources({ src, sizes, imageLoader }: SourcesProps): ReactElement {

  // Include small widths only when sizes is specified, like Next.js does
  const widths = [
    ...(sizes && sizes != '100vw' ? imageSizes : []),
    ...deviceSizes,
  ]

  // Make the srcset
  const srcSet = makeSrcSet(src, widths, imageLoader)

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
    return imageLoader({ src, width }) + ` ${width}w`
  }).join(', ')

}
