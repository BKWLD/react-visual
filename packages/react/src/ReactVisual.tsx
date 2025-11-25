import VisualWrapper from "./VisualWrapper";
import LazyVideo from "./LazyVideo";
import PictureImage from "./PictureImage";

import { collectDataAttributes } from "./lib/attributes";
import { ReactVisualProps } from "./types/reactVisualTypes";
import { fillStyles } from "./lib/styles";
import type { ReactNode } from "react";

export default function ReactVisual(props: ReactVisualProps): ReactNode {
  // Destructure props
  const {
    image,
    video,
    expand,
    aspect,
    width,
    height,
    fit = "cover",
    position,
    priority,
    sizes,
    imageLoader,
    videoLoader,
    sourceTypes,
    sourceMedia,
    paused,
    onPause,
    onPlay,
    playIcon,
    pauseIcon,
    hideAccessibilityControls,
    accessibilityControlsPosition,
    alt,
    className = "",
    style = {},
    noPoster,
  } = props;

  // If no asset, return nothing
  if (!image && !video) return null;

  return (
    <VisualWrapper
      {...{
        expand,
        width,
        height,
        aspect,
        sourceMedia,
        image,
        video,
        className,
        style,
        dataAttributes: collectDataAttributes(props),
      }}
    >
      {/* Render image */}
      {image && (
        <PictureImage
          {...{
            src: image,
            sizes,
            alt,
            fit,
            position,
            priority,
            imageLoader,
            sourceTypes,
            sourceMedia,
            style: {
              // Expand to wrapper when wrapper has layout
              width: width ? "100%" : undefined,
              height: height ? "100%" : undefined,
              ...(aspect || expand ? fillStyles : undefined),
            },
          }}
        />
      )}

      {/* Render video element */}
      {video && (
        <LazyVideo
          {...{
            src: video,
            alt,
            fit,
            position,
            priority,
            noPoster: noPoster || !!image, // Use `image` as poster frame
            paused,
            onPause,
            onPlay,
            playIcon,
            pauseIcon,
            hideAccessibilityControls,
            accessibilityControlsPosition,
            sourceMedia,
            videoLoader,
          }}
        />
      )}
    </VisualWrapper>
  );
}
