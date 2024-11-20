import type { PictureImageProps } from './types/pictureImageTypes'
import type { ImageLoader, SourceMedia, SourceType } from './types/reactVisualTypes'
import { deviceSizes, imageSizes } from './lib/sizes'
import { makeSourceVariants } from './lib/sources'
import type { ReactNode } from 'react'

type ImageSrc = PictureImageProps['src']
type ImageSourceProps = {
  widths: number[]
  imageLoader: Required<PictureImageProps>['imageLoader']
  sizes: PictureImageProps['sizes']
  src: ImageSrc
  type?: SourceType
  media?: SourceMedia
}

export default function PictureImage(props: PictureImageProps): ReactNode {
  // Destructure props
  const {
    src,
    fit = 'cover',
    position,
    priority,
    sizes,
    imageLoader,
    sourceTypes,
    sourceMedia,
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

  // Make the img src url
  const srcUrl = makeSrcUrl(src, imageLoader)
  if (!srcUrl) return null

  // Make array or props that will be used to make <source>s.  A `null` type is
  // always added to create fallback sources for native mime-type of the
  // uploaded image. Additionally, this how a <source> is create to store the
  // srcset when no `sourceTypes` were specified.
  const sourceVariants = makeSourceVariants({ sourceTypes, sourceMedia })

  // Always wrap in picture element for standard DOM structure
  return (
    <picture>

      {/* Make <source>s */}
      {imageLoader && sourceVariants.map(({ type, media, key }) => (
        <Source key={ key } {...{
          widths: srcsetWidths,
          imageLoader, sizes, src, type, media
        }} />
      ))}

      {/* The main <img> */}
      <img
        style={{ ...layoutStyles, ...style }}
        src={ srcUrl }
        {...{ loading, alt, sizes }}
      />
    </picture>
  )
}

// Make the <img> src value, using imageLoader if the src is not a string.
// Using a 1920 width in this case.
function makeSrcUrl(
  src: ImageSrc,
  imageLoader: ImageLoader | undefined
): string {
  if (typeof src == 'string') return src
  if (!imageLoader) {
    throw "An `imageLoader` is required when `src` isn't a string"
  }
  return imageLoader({ src, width: 1920 })
}

// Make a source tag with srcset for the provided type and/or media attribute
function Source({
  widths,
  imageLoader,
  sizes,
  src,
  type,
  media,
}: ImageSourceProps): ReactNode {
  const srcSet = makeSrcSet(widths, imageLoader, { src, type, media });
  return <source {...{ type, media, srcSet, sizes }} />;
}

// Make a srcset string from an array of width integers using the imageLoader
// function. Params such as src, type, and media are passed to the loader
// function to customize the image returned.
function makeSrcSet(
  widths: number[],
  imageLoader: ImageLoader,
  params: {
    src: ImageSrc
    type?: SourceType
    media?: SourceMedia
  }
): string {
  return widths.map((width) => {
    return imageLoader({ width, ...params }) + ` ${width}w`
  }).join(', ')
}
