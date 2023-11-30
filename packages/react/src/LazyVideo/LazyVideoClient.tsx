// Support Next.js 13 app router hydration where useInView will cause errors
"use client";

import { useInView } from 'react-intersection-observer'
import { useMediaQueries } from '@react-hook/media-query'
import { useEffect, type ReactElement, useRef, useCallback, type MutableRefObject } from 'react'
import type { LazyVideoProps } from '../types/lazyVideoTypes';
import { fillStyles, transparentGif } from '../lib/styles'

type LazyVideoClientProps = Omit<LazyVideoProps,
  'videoLoader' | 'src' | 'sourceMedia'
> & {
  srcUrl?: string
  mediaSrcs?: Record<string, string>
}

type ResponsiveVideoSourceProps = {
  mediaSrcs: Required<LazyVideoClientProps>['mediaSrcs']
  videoRef: VideoRef
}

type VideoRef = MutableRefObject<HTMLVideoElement | undefined>

// An video rendered within a Visual that supports lazy loading
export default function LazyVideoClient({
  srcUrl, mediaSrcs,
  alt, fit, position, priority, noPoster, paused,
}: LazyVideoClientProps): ReactElement {

  // Make a ref to the video so it can be controlled
  const videoRef = useRef<HTMLVideoElement>()

  // Watch for in viewport to load video unless using priority
  const { ref: inViewRef, inView } = useInView({
    skip: priority
  })

  // Support multiple refs on the video. This is from the
  // react-intersection-observer docs
  const setRefs = useCallback((node: HTMLVideoElement) => {
    videoRef.current = node
    inViewRef(node)
  }, [inViewRef])

  // Store the promise that is returned from play to prevent errors when
  // pause() is called while video is benginning to play.
  const playPromise = useRef<Promise<void>>()

  // Play the video, waiting until it's safe to play it.  And capture any
  // errors while trying to play.
  const play = async () => {
    if (playPromise.current) await playPromise.current
    try { playPromise.current = videoRef.current?.play()}
    catch (e) { console.error(e) }
  }

  // Pause the video, waiting until it's safe to play it
  const pause = async () => {
    if (playPromise.current) await playPromise.current
    videoRef.current?.pause()
  }

  // Respond to paused prop and call methods that control the video playback
  useEffect(() => {
    paused ? pause() : play()
  }, [ paused ])

  // Simplify logic for whether to load sources
  const shouldLoad = priority || inView

  // Render video tag
  return (
    <video

      // Props that allow us to autoplay videos like a gif
      playsInline
      muted
      loop

      // Whether to autoplay
      autoPlay={ !paused }

      // Load a transparent gif as a poster if an `image` was specified so
      // the image is used as poster rather than the first frame of video. This
      // lets us all use responsive poster images (via `next/image`).
      poster={ noPoster ? transparentGif : undefined }

      // Straightforward props
      ref={setRefs}
      preload={ shouldLoad ? 'auto' : 'none' }
      aria-label={ alt }
      style={{
        ...fillStyles,
        objectFit: fit,
        objectPosition: position,
      }}>

      {/* Implement lazy loading by not adding the source until ready */}
      { shouldLoad && (mediaSrcs ?
        <ResponsiveSource { ...{ mediaSrcs, videoRef }} /> :
        <source src={ srcUrl } type='video/mp4' />
      )}
    </video>
  )
}

// Switch the video asset depending on media queries
function ResponsiveSource({
  mediaSrcs, videoRef
}: ResponsiveVideoSourceProps): ReactElement | undefined {

  // Find the src url that is currently active
  const { matches } = useMediaQueries(mediaSrcs)
  const srcUrl = getFirstMatch(matches)

  // Reload the video since the source changed
  useEffect(() => reloadVideoWhenSafe(videoRef), [ matches ])

  // Return new source
  return (<source src={ srcUrl } type='video/mp4' />)
}

// Get the URL with a media query match
function getFirstMatch(matches: Record<string, boolean>): string | undefined {
  for (const srcUrl in matches) {
    if (matches[srcUrl]) {
      return srcUrl
    }
  }
}

// Safely call load function on a video
function reloadVideoWhenSafe(videoRef: VideoRef): void {
  if (!videoRef.current) return
  const video = videoRef.current

  // If already playing safely, load now
  if (video.readyState >= 2) {
    video.load()

  // Else, wait for video to finish loading
  } else {
    const handleLoadedData = () => {
      video.load()
      video.removeEventListener('loadeddata', handleLoadedData)
    }
    video.addEventListener('loadeddata', handleLoadedData)
  }
}
