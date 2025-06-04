import type { ReactNode } from "react";
import type { LazyVideoProps } from "../types/lazyVideoTypes";
import LazyVideoClient from "./LazyVideoClient";

// This wrapper function exists to take Function props and make them
// serializable for the LazyVideoClient component, which is a Next.js style
// client component.
export default function LazyVideo(props: LazyVideoProps): ReactNode {
  // Destructure some props
  const { src, sourceMedia, videoLoader } = props;

  // Multiple media queries and a loader func are necessary for responsive
  const useResponsiveSource =
    sourceMedia && sourceMedia?.length > 1 && !!videoLoader;

  // Vars that will be conditionally populated
  let srcUrl, mediaSrcs;

  // Prepare a hash of source URLs and their media query constraint in the
  // style expected by useMediaQueries.
  if (useResponsiveSource) {
    const mediaSrcEntries = sourceMedia.map((media) => {
      const url = videoLoader({ src, media });
      return [url, media];
    });
    // If the array ended up empty, abort
    if (mediaSrcEntries.filter(([url]) => !!url).length == 0) return null;

    // Deduplicate entries to prevent conflicts when the same URL is returned
    // for different media queries (e.g., same Contentful asset for portrait/landscape)
    const deduplicatedEntries = mediaSrcEntries.reduce<[string, string][]>((acc, [url, media]) => {
      if (!url || acc.some(([seenUrl]) => seenUrl === url)) {
        return acc;
      }
      return [...acc, [url, media]];
    }, []);

    // Make the hash
    mediaSrcs = Object.fromEntries(deduplicatedEntries);

    // Make a simple string src url
  } else {
    if (videoLoader) srcUrl = videoLoader({ src });
    else if (typeof src == "string") srcUrl = src;
    if (!srcUrl) return null; // If no url could be built, abort
  }

  // Render client component
  return (
    <LazyVideoClient
      {...{
        ...props,

        // Remove client-unfriendly props
        videoLoader: undefined,
        src: undefined,
        sourceMedia: undefined,

        // Add client-friendly props
        srcUrl,
        mediaSrcs,
      }}
    />
  );
}
