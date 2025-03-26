import { ContentfulVisualProps } from "./types/contentfulVisualTypes";
import ContentfulVisual from "./ContentfulVisual";
import {
  getImageAspect,
  hasResponsiveAspects,
  hasResponsiveAssets,
  mobileWidthMediaQueries,
  widthBasedAspectCalculator,
} from "./lib/aspectRatio";
import {
  widthBasedImageLoader,
  widthBasedVideoLoader,
} from "./lib/urlBuilding";

// Wrapper component that defaults to width based responsive handling rather
// than oreintation based
export default function WidthBasedContentfulVisual(
  props: ContentfulVisualProps,
) {
  const { image, src, imageLoader, videoLoader, sourceMedia, aspect } = props;
  return (
    <ContentfulVisual
      {...props}
      {...{ image, src }}
      imageLoader={imageLoader || widthBasedImageLoader}
      videoLoader={videoLoader || widthBasedVideoLoader}
      sourceMedia={
        sourceMedia ||
        (hasResponsiveAssets(src) ? mobileWidthMediaQueries : undefined)
      }
      aspect={
        aspect ||
        (hasResponsiveAspects(src)
          ? widthBasedAspectCalculator
          : getImageAspect(image || src?.image || src?.portraitImage))
      }
    />
  );
}
