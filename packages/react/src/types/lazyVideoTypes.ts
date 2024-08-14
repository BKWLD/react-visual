import { ReactVisualProps } from './reactVisualTypes'

export type LazyVideoProps = Pick<ReactVisualProps,
  'alt' |
  'fit' |
  'position' |
  'priority' |
  'videoLoader' |
  'sourceMedia' |
  'style' |
  'paused' |
  'onPause' |
  'onPlay' |
  'playIcon' |
  'pauseIcon' |
  'hideAccessibilityControls' |
  'accessibilityControlsPosition'
> & {
  src: Required<ReactVisualProps>['video']

  // Use a transparent gif poster image
  noPoster?: boolean

}
