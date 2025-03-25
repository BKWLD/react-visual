import ContentfulVisual from "./ContentfulVisual";

export default ContentfulVisual;
export type {
  ContentfulVisualProps,
  ContentfulImageAsset,
  ContentfulAsset,
  ContentfulVisualEntry,
} from "./types/contentfulVisualTypes";
export {
  hasResponsiveAssets,
  hasResponsiveAspects,
  orientationBasedAspectCalculator,
  widthBasedAspectCalculator,
  getImageAspect,
  orientationMediaQueries,
  mobileWidthMediaQueries,
} from "./lib/aspectRatio";
export {
  orientationBasedImageLoader,
  orientationBasedVideoLoader,
  widthBasedImageLoader,
  widthBasedVideoLoader,
} from "./lib/urlBuilding";
