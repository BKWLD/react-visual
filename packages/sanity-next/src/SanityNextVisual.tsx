import type { ReactElement } from 'react'
import NextVisual from '@react-visual/next'
import { urlForImage } from './lib/urlBuilding'
import {
  aspectRatioFromSource,
  altTextFromSource,
  objectPositionFromSource,
  placeholderFromSource,
} from './lib/sourceMapping'

export default function SanityNextVisual(
  props: any
): ReactElement | null {

  // Destructure some props
  const {

    // Sources
    image,
    video,

    // Props that may be calculated
    placeholderData,
    aspect,
    position,
    alt,
  } = props

  return (
    <NextVisual

      // Passthrough most props
      {...props}

      // Props that are calculated from Sanity data (mostly images)
      image={ urlForImage(image).url() }
      aspect={ aspect || aspectRatioFromSource(image) }
      position={ position || objectPositionFromSource(image) }
      alt={ alt || altTextFromSource(image) || altTextFromSource(video) }
      placeholderData={ placeholderData || placeholderFromSource(image) }
    />
  )
}
