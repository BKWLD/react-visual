import { ContentfulVisualProps } from "./types/contentfulVisualTypes";
import ContentfulVisual from "./ContentfulVisual";
import {
  getImageAspect,
  hasResponsiveAspects,
  hasResponsiveAssets,
  widthBasedAspectCalculator,
} from "./lib/aspectRatio";
import {
  widthBasedImageLoader,
  widthBasedVideoLoader,
} from "./lib/urlBuilding";

type WidthBasedContentfulVisualProps = ContentfulVisualProps & {
  /**
   * The max-width media query value to switch to the portrait/mobile image
   * @default "767px"
   */
  breakpoint?: string | number;
};

// Wrapper component that defaults to width based responsive handling rather
// than oreintation based
export default function WidthBasedContentfulVisual(
  props: WidthBasedContentfulVisualProps,
) {
  const {
    breakpoint = "767px",
    image,
    src,
    imageLoader,
    videoLoader,
    sourceMedia,
    aspect,
  } = props;

  return (
    <ContentfulVisual
      {...props}
      {...{ image, src }}
      imageLoader={imageLoader || widthBasedImageLoader}
      videoLoader={videoLoader || widthBasedVideoLoader}
      sourceMedia={
        sourceMedia ||
        (hasResponsiveAssets(src)
          ? makeWidthBasedMediaQueries(breakpoint)
          : undefined)
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

// Make the sourceMedia value for width based media queries, switching on a
// single breakpoint
function makeWidthBasedMediaQueries(
  breakpoint: WidthBasedContentfulVisualProps["breakpoint"],
) {
  const mobileMaxWidth =
    typeof breakpoint == "number" ? `${breakpoint}px` : breakpoint;
  const desktopMinWidth = `calc(${mobileMaxWidth} + 1px)`;
  return [`(max-width: ${mobileMaxWidth})`, `(min-width: ${desktopMinWidth})`];
}
