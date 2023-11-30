import type { ReactElement } from 'react'
import ReactVisual from '@react-visual/react'
import { ContentfulAsset, ContentfulImageAsset, ContentfulVisualEntry, ContentfulVisualProps } from './types/contentfulVisualTypes'
import type { AspectCalculator, ImageLoader, VideoLoader } from '@react-visual/react'

// Render a Visual using Contentful data
export default function ContentfulVisual(
  props: ContentfulVisualProps
): ReactElement | null {

  // Destructure some props
  const {
    image,
    video,
    src,
    aspect,
    imageLoader,
    videoLoader,
    sourceTypes,
    sourceMedia,
    alt,
  } = props

  // Is this a responsive instance
  const isResponsive = hasResponsiveAssets(src)

  // Make a Visual instance
  return (
    <ReactVisual

      // Passthrough most props
      {...props}

      // Props that have calculated fallbaks
      image={ image || src }
      video={ video || src }
      imageLoader={ imageLoader || defaultImageLoader }
      videoLoader={ videoLoader || defaultVideoLoader }
      sourceTypes={ sourceTypes || contentfulModernFormats }
      sourceMedia={ sourceMedia || (
        isResponsive ?
          orientationMediaQueries :
          undefined
      )}
      aspect={ aspect || (
        isResponsive ?
          responsiveAspectCalculator :
          getImageAspect(image || src?.image || src?.portraitImage)
      )}
      alt={ alt || src?.alt || makeAssetAlt(image) || makeAssetAlt(video)}
    />
  )
}

const defaultImageLoader: ImageLoader = ({ src, width, type, media }) => {

  // Use portrait image if it exists, otherwise fallback to landscape
  const url = media?.includes('portrait') && src.portraitImage ?
    src.portraitImage.url :
    src.image?.url || src.url

  // Make Contentful resizing instructions
  const query = new URLSearchParams({ w: String(width) })

  // Optionally set the format
  if (type?.includes('avif')) query.set('fm', 'avif')
  else if (type?.includes('webp')) query.set('fm', 'webp')

  // Make the query with formatting instructions
  return `${url}?${query}`
}

// Use portrait video from `src` prop or fallback to url
const defaultVideoLoader: VideoLoader = ({ src, media }) => {
  return media?.includes('portrait') && src.portraitVideo ?
    src.portraitVideo.url :
    src.video?.url || src.url
}

// Get the aspect ratio from an image asset if it exists
function getImageAspect(
  image: ContentfulImageAsset | undefined
): number | undefined {
  if (!image) return undefined
  return image.width / image.height
}

// Make the aspect ratio for responsive assets
const responsiveAspectCalculator: AspectCalculator = (
  { media, image, video }
) => {
  console.log('aspect calculator')
  return 1
}

// The types that Contentful's CDN can produce
const contentfulModernFormats = ['image/avif', 'image/webp']

// Check whether multiple orientations weMediae provided
function hasResponsiveAssets(src: ContentfulVisualEntry | undefined): boolean {
  if (!src) return false
  const hasLandscape = !!(src.image || src.video),
    hasPortrait = !!(src.portraitImage || src.portraitVideo)
  return hasLandscape && hasPortrait
}

// The media queries that are used for default responsive visuals
const orientationMediaQueries = [
  '(orientation:landscape)',
  '(orientation:portrait)',
]

// Use various asset fields to make the alt from automatically
function makeAssetAlt(asset: ContentfulAsset | undefined): string {
  if (!asset) return ''
  return asset.description || asset.title || asset.fileName || ''
}
