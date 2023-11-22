// Support Next.js 13 app router hydration where useInView will cause errors
"use client";

import { useInView } from 'react-intersection-observer'
import { useEffect, type ReactElement, useRef, useCallback } from 'react'
import type { LazyVideoProps } from './types/lazyVideoTypes';
import type { SourceMedia } from './types/reactVisualTypes'
import { makeSourceVariants } from './lib/sources'
import { fillStyles, transparentGif } from './lib/styles'

type VideoSourceProps = {
  src: Required<LazyVideoProps>['src']
  videoLoader: LazyVideoProps['videoLoader']
  media?: SourceMedia
}

// An video rendered within a Visual that supports lazy loading
export default function LazyVideo({
  src, sourceMedia, videoLoader,
  alt, fit, position, priority, noPoster, paused,
}: LazyVideoProps): ReactElement {

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

  // Make source variants
  const sourceVariants = makeSourceVariants({ sourceMedia })

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
      { shouldLoad && sourceVariants.map(({ media, key }) => (
        <Source {...{ key, videoLoader, src, media }} />
      ))}
    </video>
  )
}

// Make a video source tag. Note, media attribute on source isn't supported
// in Chrome. This will need to be converted to a JS solution at some point.
// https://github.com/BKWLD/react-visual/issues/35
function Source({
  videoLoader, src, media
}: VideoSourceProps): ReactElement {
  const srcUrl = videoLoader ?
    videoLoader({ src, media }) :
    src
  return (
    <source src={ srcUrl } {...{ media }} type='video/mp4' />
  )
}
