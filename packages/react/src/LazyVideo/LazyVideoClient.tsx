// Support Next.js 13 app router hydration where useInView will cause errors
"use client";

import { useInView } from "react-intersection-observer";
import { useMediaQueries } from "@react-hook/media-query";
import {
  useEffect,
  useRef,
  useCallback,
  type MutableRefObject,
  useState,
  type ReactNode,
} from "react";
import type { LazyVideoProps } from "../types/lazyVideoTypes";
import { fillStyles, transparentGif } from "../lib/styles";
import AccessibilityControls from "./AccessibilityControls";

type LazyVideoClientProps = Omit<
  LazyVideoProps,
  "videoLoader" | "src" | "sourceMedia"
> & {
  srcUrl?: string;
  mediaSrcs?: Record<string, string>;
};

type ResponsiveVideoSourceProps = {
  mediaSrcs: Required<LazyVideoClientProps>["mediaSrcs"];
  videoRef: VideoRef;
};

type VideoRef = MutableRefObject<HTMLVideoElement | undefined>;

// An video rendered within a Visual that supports lazy loading
export default function LazyVideoClient({
  srcUrl,
  mediaSrcs,
  alt,
  fit,
  position,
  priority,
  noPoster,
  paused, // Used to control externally
  onPause,
  onPlay,
  playIcon,
  pauseIcon,
  hideAccessibilityControls,
  accessibilityControlsPosition,
}: LazyVideoClientProps): ReactNode {
  // Track the actual video playback state. Start in a paused state because
  // even with an autoplay video, it won't actually have started playing yet.
  const [isVideoPaused, setVideoPaused] = useState(true);

  // Make a ref to the video so it can be controlled
  const videoRef = useRef<HTMLVideoElement>();

  // Watch for in viewport to load video unless using priority
  const { ref: inViewRef, inView } = useInView({
    skip: priority,
  });

  // Support multiple refs on the video. This is from the
  // react-intersection-observer docs
  const setRefs = useCallback(
    (node: HTMLVideoElement) => {
      videoRef.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );

  // Store the promise that is returned from play to prevent errors when
  // pause() is called while video is benginning to play.
  const playPromise = useRef<Promise<void>>();

  // Play the video, waiting until it's safe to play it.  And capture any
  // errors while trying to play.
  const play = async () => {
    if (playPromise.current) await playPromise.current;
    playPromise.current = videoRef.current?.play().catch((e) => {});
  };

  // Pause the video, waiting until it's safe to play it
  const pause = async () => {
    if (playPromise.current) await playPromise.current;
    videoRef.current?.pause();
  };

  // Trigger pause and play in response to the `paused` prop changing. This is
  // used to control the video from outside the component.
  useEffect(() => {
    paused ? pause() : play();
  }, [paused]);

  // Watch for the video element's state changes and sync with the component's
  // internal paused state.
  useEffect(() => {
    const videoElement = videoRef.current;

    const handlePlay = () => {
      setVideoPaused(false);
      onPlay?.();
    };

    const handlePause = () => {
      setVideoPaused(true);
      onPause?.();
    };

    // Add listeners
    if (videoElement) {
      videoElement.addEventListener("play", handlePlay);
      videoElement.addEventListener("pause", handlePause);
    }

    // Cleanup
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("play", handlePlay);
        videoElement.removeEventListener("pause", handlePause);
      }
    };
  }, []);

  // Simplify logic for whether to load sources
  const shouldLoad = priority || inView;

  // Render video tag
  return (
    <>
      <video
        // Props that allow us to autoplay videos like a gif
        playsInline
        muted
        loop
        // Whether to autoplay
        autoPlay={!paused}
        // Load a transparent gif as a poster if an `image` was specified so
        // the image is used as poster rather than the first frame of video.
        // This lets us all use responsive poster images (via `next/image`).
        poster={noPoster ? transparentGif : undefined}
        // Straightforward props
        ref={setRefs}
        preload={shouldLoad ? "auto" : "none"}
        aria-label={alt}
        style={{
          ...fillStyles,
          objectFit: fit,
          objectPosition: position,
        }}
      >
        {/* Implement lazy loading by not adding the source until ready */}
        {shouldLoad &&
          (mediaSrcs ? (
            <ResponsiveSource {...{ mediaSrcs, videoRef }} />
          ) : (
            <source src={srcUrl} type="video/mp4" />
          ))}
      </video>

      {/* Render accessibility controls */}
      <AccessibilityControls
        {...{
          play,
          pause,
          isVideoPaused,
          playIcon,
          pauseIcon,
          hideAccessibilityControls,
          accessibilityControlsPosition,
        }}
      />
    </>
  );
}

// Switch the video asset depending on media queries
function ResponsiveSource({
  mediaSrcs,
  videoRef,
}: ResponsiveVideoSourceProps): ReactNode {
  // Find the src url that is currently active
  const { matches } = useMediaQueries(mediaSrcs);
  const srcUrl = getFirstMatch(matches);

  // Reload the video since the source changed
  useEffect(() => reloadVideoWhenSafe(videoRef), [matches]);

  // Return new source
  return <source src={srcUrl} type="video/mp4" />;
}

// Get the URL with a media query match
function getFirstMatch(matches: Record<string, boolean>): string | undefined {
  for (const srcUrl in matches) {
    if (matches[srcUrl]) {
      return srcUrl;
    }
  }
}

// Safely call load function on a video
function reloadVideoWhenSafe(videoRef: VideoRef): void {
  if (!videoRef.current) return;
  const video = videoRef.current;

  // If already playing safely, load now
  if (video.readyState >= 2) {
    video.load();

    // Else, wait for video to finish loading
  } else {
    const handleLoadedData = () => {
      video.load();
      video.removeEventListener("loadeddata", handleLoadedData);
    };
    video.addEventListener("loadeddata", handleLoadedData);
  }
}
