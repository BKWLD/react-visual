import createImageUrlBuilder from '@sanity/image-url'
import { getFileAsset, type SanityFileSource } from '@sanity/asset-utils'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import type { ImageLoader, ImageLoaderProps } from 'next/image'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { ObjectFit } from '@react-visual/next'

// Access ENV vars
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset = process.env.NEXT_PUBLIC_SANITY_DATASET as string

// Make an image builder instance from ENVs
const imageBuilder = createImageUrlBuilder({ projectId, dataset })

// Options for my helper methods
type imageUrlBuildingOptions = {
  width?: number
  height?: number
  fit?: ObjectFit
}

// Helper for making image URLs
export function makeImageUrl(
  source?: SanityImageSource,
  options?: imageUrlBuildingOptions
): string | undefined {
  if (!source) return undefined
  return getBuilderUrl(makeImageBuilder(source, options))
}

// Add common conventions when building URLs to images
export function makeImageBuilder(source: SanityImageSource, {
  width, height, fit = ObjectFit.Contain
}: imageUrlBuildingOptions = {}): ImageUrlBuilder {

  // Open up builder
  let builder = imageBuilder?.image(source).auto('format')

  // Map the ObjectFit values to Sanity image CDN equivalents. The default
  // is 'max'.
  // https://www.sanity.io/docs/image-urls#fit-45b29dc6f09f
  builder = builder.fit(fit == ObjectFit.Cover ? 'min' : 'max')

  // Conditionally add dimensions
  if (width) builder = builder.width(width)
  if (height) builder =  builder.height(height)

  // Return builder
  return builder
}

// Make a next/image url loader
export function makeImageLoader(
  source?: SanityImageSource
): ImageLoader | undefined {
  if (!source) return undefined
  return ({ width, quality }: ImageLoaderProps): string => {
    let builder = makeImageBuilder(source, { width })
    if (quality) builder = builder.quality(quality)
    return getBuilderUrl(builder)
  }
}

// Get the URL from an imageBuilder or gracefully fail.  This is to solve for
// issues I experienced in Sanity preview preview mode when uploading images.
// The `asset` property of the image source would be empty and this would
// cause the `imageBuilder` to fatally error.
function getBuilderUrl(builder: ImageUrlBuilder): string {
  try { return builder.url() }
  catch(e) {
    console.error(e)
    return ''
  }
}

// Return the URL of an asset
export function makeFileUrl(
  source?: SanityFileSource
):string | undefined {
  if (!source) return undefined
  const asset = getFileAsset(source, { projectId, dataset })
  if (asset) return asset.url
  return undefined
}
