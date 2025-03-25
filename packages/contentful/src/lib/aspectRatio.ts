import type {
  ContentfulImageAsset,
  ContentfulVisualEntry,
} from "../types/contentfulVisualTypes";
import type { AspectCalculator } from "@react-visual/react";

// The media queries that are used for default responsive visuals
export const orientationMediaQueries = [
  "(orientation:landscape)",
  "(orientation:portrait)",
];

// Get the aspect ratio from an image asset if it exists
export function getImageAspect(
  image: ContentfulImageAsset | undefined | null,
): number | undefined {
  if (!image) return undefined;
  return image.width / image.height;
}

// Make the aspect ratio for responsive assets.
export const responsiveAspectCalculator: AspectCalculator = ({
  media,
  image: src,
}) => {
  if (media?.includes("portrait")) {
    return (src.portraitImage.width / src.portraitImage.height) as number;
  } else {
    return (src.image.width / src.image.height) as number;
  }
};

// Check whether multiple orientations were provided
export function hasResponsiveAssets(
  src: ContentfulVisualEntry | undefined | null,
): boolean {
  if (!src) return false;
  const hasLandscape = !!(src.image || src.video),
    hasPortrait = !!(src.portraitImage || src.portraitVideo);
  return hasLandscape && hasPortrait;
}

// Check whether multiple aspect ratios were provided
export function hasResponsiveAspects(
  src: ContentfulVisualEntry | undefined | null,
): boolean {
  if (!src) return false;
  const hasLandscapeAspect = !!(src.image?.width && src.image?.height),
    hasPortraitAspect = !!(
      src.portraitImage?.width && src.portraitImage?.height
    );
  return hasLandscapeAspect && hasPortraitAspect;
}
