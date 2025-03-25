import type { ImageLoader, VideoLoader } from "@react-visual/react";

// The types that Contentful's CDN can produce
export const contentfulModernFormats = ["image/avif", "image/webp"];

// Produce Contentful image URls based on screen orientation
export const orientationBasedImageLoader: ImageLoader = ({
  src,
  width,
  type,
  media,
}) => {
  // Use portrait image if it exists, otherwise fallback to landscape
  const url =
    media?.includes("portrait") && src.portraitImage
      ? src.portraitImage.url
      : src.image?.url || src.url;

  // If no URL found, return nothing
  if (!url) return "";

  // Make the query with formatting instructions
  return `${url}?${makeImageQueryParams({ width, type })}`;
};

// Use portrait video from `src` prop or fallback to url based on screen
// orientation
export const orientationBasedVideoLoader: VideoLoader = ({ src, media }) => {
  return media?.includes("portrait") && src.portraitVideo
    ? src.portraitVideo.url
    : src.video?.url || src.url;
};

// Produce Contentful image URls based on viewport width
export const widthBasedImageLoader: ImageLoader = ({
  src,
  width,
  type,
  media,
}) => {
  // Use portrait image if it exists, otherwise fallback to landscape
  const url =
    media?.includes("max-width") && src.portraitImage
      ? src.portraitImage.url
      : src.image?.url || src.url;

  // If no URL found, return nothing
  if (!url) return "";

  // Make the query with formatting instructions
  return `${url}?${makeImageQueryParams({ width, type })}`;
};

// Use portrait video from `src` prop or fallback to url based on viewport width
export const widthBasedVideoLoader: VideoLoader = ({ src, media }) => {
  return media?.includes("max-width") && src.portraitVideo
    ? src.portraitVideo.url
    : src.video?.url || src.url;
};

// Helper to make the Contentful query params
export function makeImageQueryParams({
  width,
  type,
}: Pick<Parameters<ImageLoader>[0], "type" | "width">) {
  const query = new URLSearchParams({ w: String(width) });
  if (type?.includes("avif")) query.set("fm", "avif");
  else if (type?.includes("webp")) query.set("fm", "webp");
  return query;
}

// Backwards compatibility exports
export {
  orientationBasedImageLoader as defaultImageLoader,
  orientationBasedVideoLoader as defaultVideoLoader,
};
