// `next/image` as importing as { default: Image, __esmodule: true } when
// this file was loaded by @react-visual/sanity-next. This is my hack to fix
import _Image from "next/image";
const Image = ("default" in _Image ? _Image.default : _Image) as typeof _Image;

import { makeImagePlaceholder } from "./lib/placeholder";
import {
  VisualWrapper,
  LazyVideo,
  collectDataAttributes,
} from "@react-visual/react";

import { NextVisualProps } from "./types/nextVisualTypes";
import type { ReactNode } from "react";

// Render a Sanity image via Next/Image
export default function NextVisual(props: NextVisualProps): ReactNode {
  // Destructure props
  const {
    image,
    video,
    placeholderData,
    expand,
    aspect,
    width,
    height,
    fit = "cover",
    position,
    priority,
    sizes,
    imageLoader,
    paused,
    alt,
    className = "",
    style = {},
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
        className,
        style,
        dataAttributes: collectDataAttributes(props),
      }}
    >
      {/* Render image */}
      {image && (
        <NextImage
          {...{
            src: image,
            sizes,
            alt,
            fit,
            position,
            priority,
            loader: imageLoader,
            placeholderData,
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
            noPoster: !!image, // Use `image` as poster frame
            paused,
          }}
        />
      )}
    </VisualWrapper>
  );
}

// An image rendered within the Visual
function NextImage({
  src,
  sizes,
  alt,
  fit,
  position,
  priority,
  loader,
  placeholderData,
}: any): ReactNode {
  return (
    <Image
      {...{ src, sizes, priority, loader, alt }}
      fill
      style={{
        objectFit: fit,
        objectPosition: position,
      }}
      {...makeImagePlaceholder(placeholderData)}
    />
  );
}
