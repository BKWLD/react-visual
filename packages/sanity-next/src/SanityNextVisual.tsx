import type { ReactElement } from 'react'
import NextVisual from '@react-visual/next'
import { makeImageUrl, makeAssetUrl } from './lib/urlBuilding'
import {
  aspectRatioFromSource,
  altTextFromSource,
  objectPositionFromSource,
  placeholderFromSource,
} from './lib/sourceMapping'
import { SanityNextVisualProps } from './types/sanityNextVisualTypes'

export default function SanityNextVisual(
  props: SanityNextVisualProps
): ReactElement | null {

  // Destructure some props
  let {

    // Sources
    image,
    video,
    visual,

    // Props that may be calculated
    placeholderData,
    aspect,
    position,
    alt,
  } = props

  // If visual is provided, use it's sources
  if (visual?.image) image = visual.image
  if (visual?.video) video = visual.video
  if (visual?.alt) alt = visual?.alt

  // Render NextVisual instance
  return (
    <NextVisual

      // Passthrough most props
      {...props}

      // Props that are calculated from Sanity data (mostly images)
      image={ makeImageUrl(image) }
      video={ makeAssetUrl(video) }
      aspect={ aspect || aspectRatioFromSource(image) }
      position={ position || objectPositionFromSource(image) }
      alt={ alt || altTextFromSource(image) || altTextFromSource(video) }
      placeholderData={ placeholderData || placeholderFromSource(image) }
    />
  )
}
