import type { SourceMedia, SourceType } from "../types/reactVisualTypes";

// Make an array of all the source variants to make
export function makeSourceVariants({
  sourceTypes,
  sourceMedia,
}: {
  sourceTypes?: SourceType[];
  sourceMedia?: SourceMedia[];
}): {
  type?: SourceType;
  media?: SourceMedia;
  key: string;
}[] {
  const variants = [];

  // Append an untyped fallback to serve the default format
  const typesWithUntypedFallback = [...(sourceTypes || []), undefined];

  // Loop through mimeTypes and media queries and produce the source variant
  // objects
  for (const type of typesWithUntypedFallback) {
    if (sourceMedia?.length) {
      for (const media of sourceMedia) {
        variants.push({ type, media, key: `${type}-${media}` });
      }
    } else {
      variants.push({ type, key: type || "fallback" });
    }
  }
  return variants;
}
