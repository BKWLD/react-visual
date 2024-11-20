import ReactVisual from '@react-visual/react'
import { ContentfulAsset, ContentfulVisualProps } from './types/contentfulVisualTypes'
import {
  contentfulModernFormats,
  defaultImageLoader,
  defaultVideoLoader
} from './lib/urlBuilding'
import {
  orientationMediaQueries,
  getImageAspect,
  responsiveAspectCalculator,
  hasResponsiveAssets,
  hasResponsiveAspects
} from './lib/aspectRatio'
import type { ReactNode } from 'react'

// Render a Visual using Contentful data
export default function ContentfulVisual(
  props: ContentfulVisualProps
): ReactNode {

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
        hasResponsiveAssets(src) ?
          orientationMediaQueries :
          undefined
      )}
      aspect={ aspect || (
        hasResponsiveAspects(src) ?
          responsiveAspectCalculator :
          getImageAspect(image || src?.image || src?.portraitImage)
      )}
      alt={
        alt
        || src?.alt
        || makeAssetAlt(src?.image)
        || makeAssetAlt(image)
        || makeAssetAlt(src?.video)
        || makeAssetAlt(video)
      }
    />
  )
}

// Use various asset fields to make the alt from automatically
function makeAssetAlt(asset: ContentfulAsset | undefined | null): string {
  if (!asset) return ''
  return asset.description || asset.title || asset.fileName || ''
}
