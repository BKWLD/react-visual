import type { ReactElement } from 'react'
import type { pictureImageProps } from './types/pictureImageTypes'

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
    alt,
  } = props

  // Apply layout styles
  const style = {
    objectFit: fit,
    objectPosition: position
  }

  // Unless priority flag was set, lazy load the image
  const loading = priority ? undefined : 'lazy'

  // Always wrap in picture element for standard DOM structure
  return (
    <picture>
      <img {...{ src, style, loading, alt, sizes }} />
    </picture>
  )
}
