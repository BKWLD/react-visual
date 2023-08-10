import createImageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import type { ImageLoader } from 'next/image'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { ObjectFit } from '@react-visual/next'

// Make an image builder instance from ENVs
console.log('NEXT_PUBLIC_SANITY_PROJECT_ID', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
})

// Add common conventions when building URLs to images
export function urlForImage(source: SanityImageSource, {
  width, height, fit = ObjectFit.Contain
}: {
  width?: number
  height?: number
  fit?: ObjectFit
} = {}): ImageUrlBuilder {

  // Open up builder
  const builder = imageBuilder?.image(source).auto('format')

  // Map the ObjectFit values to Sanity image CDN equivalents. The default
  // is 'max'.
  // https://www.sanity.io/docs/image-urls#fit-45b29dc6f09f
  builder.fit(fit == ObjectFit.Cover ? 'min' : 'max')

  // Conditionally add dimensions
  if (width) builder.width(width)
  if (height) builder.height(height)

  // Return builder
  return builder
}

// Make a next/image url loader
export function makeImageLoader(source: SanityImageSource): ImageLoader {
  return ({ width, quality }) => {
    const builder = urlForImage(source).width(width)
    if (quality) builder.quality(quality)
    return builder.url()
  }
}
