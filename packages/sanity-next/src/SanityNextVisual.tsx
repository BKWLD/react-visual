import NextVisual from "@react-visual/next";
import { makeImageUrl, makeFileUrl, makeImageLoader } from "./lib/urlBuilding";
import {
  aspectRatioFromSource,
  altTextFromSource,
  objectPositionFromSource,
  placeholderFromSource,
} from "./lib/sourceMapping";
import { SanityNextVisualProps } from "./types/sanityNextVisualTypes";
import type { ReactNode } from "react";

export default function SanityNextVisual(
  props: SanityNextVisualProps,
): ReactNode {
  // Destructure some props
  let {
    // Sources
    image,
    video,
    src,

    // Props that may be calculated
    placeholderData,
    aspect,
    position,
    alt,
  } = props;

  // If visual is provided, use it's child values
  if (src?.image) image = src.image;
  if (src?.video) video = src.video;
  if (src?.alt) alt = src?.alt;

  // Render NextVisual instance
  return (
    <NextVisual
      // Passthrough most props
      {...props}
      // Props that are calculated from Sanity data (mostly images)
      image={makeImageUrl(image)}
      imageLoader={makeImageLoader(image)}
      video={makeFileUrl(video)}
      aspect={aspect || aspectRatioFromSource(image)}
      position={position || objectPositionFromSource(image)}
      alt={alt || altTextFromSource(image) || altTextFromSource(video)}
      placeholderData={placeholderData || placeholderFromSource(image)}
    />
  );
}
