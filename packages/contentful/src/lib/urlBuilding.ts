import type { ImageLoader, VideoLoader } from '@react-visual/react'

// The types that Contentful's CDN can produce
export const contentfulModernFormats = ['image/avif', 'image/webp']

// Produce Contentful image URls
export const defaultImageLoader: ImageLoader = ({
  src, width, type, media
}) => {

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
export const defaultVideoLoader: VideoLoader = ({ src, media }) => {
  return media?.includes('portrait') && src.portraitVideo ?
    src.portraitVideo.url :
    src.video?.url || src.url
}
