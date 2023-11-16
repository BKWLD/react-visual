import type { ReactElement } from 'react'
import type { PictureImageProps } from './types/pictureImageTypes'
import type { ImageLoader, SourceMedia, SourceType } from './types/reactVisualTypes'
import { deviceSizes, imageSizes } from './lib/sizes'

type ImageSrc = PictureImageProps['src']
type SourcesProps = {
  widths: number[]
  imageLoader: Required<PictureImageProps>['imageLoader']
  src: ImageSrc
  type?: SourceType
  media?: SourceMedia
}

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

  // Make the img srcset. When I had a single <source> with no type or media
  // attribute, the srcset would not affect the image loaded.  Thus, I'm
  // applying it to the img tag
  const srcSet = imageLoader && makeSrcSet(srcsetWidths, imageLoader, { src })

  // Additional sources to create
  const sourceVariants = makeSourceVariants(sourceTypes, sourceMedia)

  // Always wrap in picture element for standard DOM structure
  return (
    <picture>

      {/* Make <source>s */}
      {imageLoader && sourceVariants?.map(({ type, media, key }) => (
        <Source {...{
          key,
          widths: srcsetWidths,
          imageLoader, src, type, media
        }} />
      ))}

      {/* The main <img> */}
      <img
        style={{ ...layoutStyles, ...style }}
        {...{ src, loading, alt, srcSet, sizes }}
      />
    </picture>
  )
}

// Make an array of all the source variants to make. If these arrays are
// empty, I add an `undefined` so my ability to loop though isn't blocked.
function makeSourceVariants(
  sourceTypes: SourceType[] | undefined,
  sourceMedia: SourceMedia[] | undefined
): {
  type?: SourceType
  media?: SourceMedia
  key: string
}[] {
  const variants = []
  for (const type of (sourceTypes || [ undefined ])) {
    for (const media of (sourceMedia || [ undefined ])) {
      if (!type && !media) continue
      variants.push({
        type, media,
        key: `${type}-${media}` // Make a key for React looping
      })
    }
  }
  return variants
}

// Make a source tag with srcset for the provided type and/or media attribute
function Source({
   widths, imageLoader, src, type, media
}: SourcesProps): ReactElement {
  const srcSet = makeSrcSet(widths, imageLoader, { src, type, media })
  return (
    <source {...{ type, media, srcSet }} />
  )
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
