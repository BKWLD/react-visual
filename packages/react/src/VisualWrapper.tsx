import type { CSSProperties, ReactElement } from 'react'
import { fillStyles, cx } from './lib/styles'
import { isNumeric } from './lib/values'
import type { VisualWrapperProps } from './types/visualWrapperTypes'
import type { AspectCalculator } from './types/reactVisualTypes'

type MakeResponsiveAspectsProps = Pick<VisualWrapperProps,
  'image' | 'video'
> & {
  sourceMedia: Required<VisualWrapperProps>['sourceMedia']
  aspectCalculator: AspectCalculator
}

// Wraps media elements and applys layout and other functionality
export default function VisualWrapper({
  expand, width, height,
  aspect, sourceMedia, image, video,
  children, className, style, dataAttributes
}: VisualWrapperProps): ReactElement {

  // If aspect is a function, invoke it to determine the aspect ratio
  let aspectRatio, aspectStyleTag, aspectClasses
  if (typeof aspect == 'function' && sourceMedia?.length) {
    ({ aspectStyleTag, aspectClasses } = makeResponsiveAspects({
      aspectCalculator: aspect,
      sourceMedia, image, video
    }))
    console.log(aspectClasses, aspectStyleTag )
  } else aspectRatio = aspect

  // Make the wrapper style.  If expanding, use normal fill rules. Otherwise,
  // apply width, height and aspect
  const layoutStyles = expand ? fillStyles : {
    position: 'relative', // For expanded elements
    width: isNumeric(width) ? `${width}px` : width,
    height: isNumeric(height) ? `${height}px` : height,
    aspectRatio,
    maxWidth: '100%', // Never exceed container width
  } as CSSProperties

  // Render wrapping component
  return (
    <div
      className={ cx(className, aspectClasses) }
      style={{ ...layoutStyles, ...style }}
      { ...dataAttributes } >
      { children }
      { aspectStyleTag }
    </div>
  )
}

// Create a style tag that applies responsive aspect ratio values
function makeResponsiveAspects({
  aspectCalculator, sourceMedia, image, video
}: MakeResponsiveAspectsProps): {
  aspectClasses: string
  aspectStyleTag: ReactElement
} {

  // Make CSS classes and related rules that are specific to the query and
  // aspect value.
  const styles = sourceMedia.map(mediaQuery => {

    // Calculate the asepct for this query state
    const aspect = aspectCalculator({ media: mediaQuery, image, video })

    // Make a CSS class name from the media query string
    const mediaClass = mediaQuery
      .replace(/[^\w]/ig, '-') // Replace special chars with "-"
    const cssClass = `rv-${mediaClass}-${aspect}`
      .replace(/\-{2,}/g, '-') // Reduce multiples of `-`

    // Make the CSS rule
    const cssRule = `@media ${mediaQuery} {
      .${cssClass} {
        aspect-ratio: ${aspect};
      }
    }`
    return { cssClass, cssRule}
  })

  // Make an array of the classes to add
  const aspectClasses = styles.map(({ cssClass }) => cssClass).join(' ')

  // Make the style tag
  const aspectStyleTag = (
    <style>
      {styles.map(({ cssRule }) => cssRule).join(' ')}
    </style>
  )

  // Return completed objects
  return { aspectClasses, aspectStyleTag}
}
