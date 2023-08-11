import type { CSSProperties, ReactElement } from 'react'
import { fillStyles } from './lib/styles'

// Wraps media elements and applys layout and other functionality
export default function VisualWrapper({
  expand, width, height, aspect, children, className, style, dataAttributes
}: any): ReactElement {

  // Make the wrapper style.  If expanding, use normal fill rules. Otherwise,
  // apply width, height and aspect
  const layoutStyles = expand ? fillStyles : {
    position: 'relative', // For expanded elements
    width: typeof width == 'number' ? `${width}px` : width,
    height: typeof height == 'number' ? `${height}px` : height,
    aspectRatio: aspect,
    maxWidth: '100%', // Don't exceed container width
  } as CSSProperties

  // Render wrapping component
  return (
    <div
      className={ className }
      style={{ ...layoutStyles, ...style }}
      { ...dataAttributes } >
      { children }
    </div>
  )
}
