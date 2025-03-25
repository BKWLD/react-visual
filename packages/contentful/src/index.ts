import ContentfulVisual from "./ContentfulVisual";

export default ContentfulVisual;
export type {
  ContentfulVisualProps,
  ContentfulImageAsset,
  ContentfulAsset,
  ContentfulVisualEntry,
} from "./types/contentfulVisualTypes";
export {
  orientationBasedImageLoader,
  orientationBasedVideoLoader,
  widthBasedImageLoader,
  widthBasedVideoLoader,
} from "./lib/urlBuilding";
