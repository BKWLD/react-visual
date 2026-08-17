import type { CSSProperties, ReactNode } from "react";
import { useId } from "react";
import { fillStyles, cx } from "./lib/styles";
import { isNumeric } from "./lib/values";
import type { VisualWrapperProps } from "./types/visualWrapperTypes";
import type { AspectCalculator } from "./types/reactVisualTypes";

type MakeResponsiveAspectsProps = Pick<
  VisualWrapperProps,
  "image" | "video"
> & {
  sourceMedia: Required<VisualWrapperProps>["sourceMedia"];
  aspectCalculator: AspectCalculator;
  responsiveClassname: string;
};

// Wraps media elements and applys layout and other functionality
export default function VisualWrapper({
  expand,
  width,
  height,
  aspect,
  sourceMedia,
  image,
  video,
  children,
  className,
  style,
  dataAttributes,
}: VisualWrapperProps): ReactNode {
  // Generate unique CSS class name for responsive aspects
  const responsiveClassname = useId().replace(/:/g, "");
  
  // If aspect is a function, invoke it to determine the aspect ratio
  let aspectRatio, aspectStyleTag;
  if (typeof aspect == "function" && sourceMedia && sourceMedia.length) {
    aspectStyleTag = makeResponsiveAspects({
      aspectCalculator: aspect,
      sourceMedia,
      image,
      video,
      responsiveClassname,
    });
  } else aspectRatio = aspect;

  // Make the wrapper style.  If expanding, use normal fill rules. Otherwise,
  // apply width, height and aspect
  const layoutStyles = expand
    ? fillStyles
    : ({
        position: "relative", // For expanded elements
        width: isNumeric(width) ? `${width}px` : width,
        height: isNumeric(height) ? `${height}px` : height,
        aspectRatio,
        maxWidth: "100%", // Never exceed container width
      } as CSSProperties);

  // Render wrapping component
  return (
    <div
      className={cx(className, aspectStyleTag ? responsiveClassname : undefined)}
      style={{ ...layoutStyles, ...style }}
      {...dataAttributes}
    >
      {children}
      {aspectStyleTag}
    </div>
  );
}

// Create a style tag that applies responsive aspect ratio values
function makeResponsiveAspects({
  aspectCalculator,
  sourceMedia,
  image,
  video,
  responsiveClassname,
}: MakeResponsiveAspectsProps): ReactNode {
  // Make CSS rules that use the same class name for all media queries
  const cssRules = sourceMedia.map((mediaQuery) => {
    // Calculate the aspect for this query state
    const aspect = aspectCalculator({ media: mediaQuery, image, video });

    // Make the CSS rule using the shared class name
    return `@media ${mediaQuery} {
      .${responsiveClassname} {
        aspect-ratio: ${aspect};
      }
    }`;
  });

  // Make the style tag with all rules
  return <style>{cssRules.join(" ")}</style>;
}
