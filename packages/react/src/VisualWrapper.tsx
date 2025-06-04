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
  baseId: string;
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
  // Generate unique ID for CSS classes when needed
  const baseId = useId();
  
  // If aspect is a function, invoke it to determine the aspect ratio
  let aspectRatio, aspectStyleTag, aspectClasses;
  if (typeof aspect == "function" && sourceMedia && sourceMedia.length) {
    ({ aspectStyleTag, aspectClasses } = makeResponsiveAspects({
      aspectCalculator: aspect,
      sourceMedia,
      image,
      video,
      baseId,
    }));
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
      className={cx(className, aspectClasses)}
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
  baseId,
}: MakeResponsiveAspectsProps): {
  aspectClasses: string;
  aspectStyleTag: ReactNode;
} {
  // Make CSS classes and related rules that are specific to the query and
  // aspect value.
  const styles = sourceMedia.map((mediaQuery, index) => {
    // Calculate the aspect for this query state
    const aspect = aspectCalculator({ media: mediaQuery, image, video });

    // Make a CSS class name using the base ID and index
    const cssClass = `${baseId.replace(/:/g, "")}-${index}`;

    // Make the CSS rule
    const cssRule = `@media ${mediaQuery} {
      .${cssClass} {
        aspect-ratio: ${aspect};
      }
    }`;
    return { cssClass, cssRule };
  });

  // Make an array of the classes to add
  const aspectClasses = styles.map(({ cssClass }) => cssClass).join(" ");

  // Make the style tag
  const aspectStyleTag = (
    <style>{styles.map(({ cssRule }) => cssRule).join(" ")}</style>
  );

  // Return completed objects
  return { aspectClasses, aspectStyleTag };
}
