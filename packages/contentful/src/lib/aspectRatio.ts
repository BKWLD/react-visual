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
  if (!image || image.width == null || image.height == null) return undefined;
  return image.width / image.height;
}

// Return aspect ratio for responsive assets using orientation media queries
export const orientationBasedAspectCalculator: AspectCalculator = ({
  media,
  image: src,
}) => {
  if (media?.includes("portrait")) {
    return src.portraitImage.width / src.portraitImage.height;
  } else {
    return src.image.width / src.image.height;
  }
};

// Return aspect ratio for responsive assets using viewport width media queries
export const widthBasedAspectCalculator: AspectCalculator = ({
  media,
  image: src,
}) => {
  if (media?.includes("max-width")) {
    return src.portraitImage.width / src.portraitImage.height;
  } else {
    return src.image.width / src.image.height;
  }
};

// Check whether multiple orientations were provided
export function hasResponsiveAssets(
  src: ContentfulVisualEntry | undefined | null,
): boolean {
  if (!src) return false;
  const hasLandscape = Boolean(src.image || src.video),
    hasPortrait = Boolean(src.portraitImage || src.portraitVideo);
  return hasLandscape && hasPortrait;
}

// Check whether multiple aspect ratios were provided
export function hasResponsiveAspects(
  src: ContentfulVisualEntry | undefined | null,
): boolean {
  if (!src) return false;
  const hasLandscapeAspect = Boolean(src.image?.width && src.image?.height),
    hasPortraitAspect = Boolean(
      src.portraitImage?.width && src.portraitImage?.height,
    );
  return hasLandscapeAspect && hasPortraitAspect;
}

// Backwards compatibility exports
export { orientationBasedAspectCalculator as responsiveAspectCalculator };
