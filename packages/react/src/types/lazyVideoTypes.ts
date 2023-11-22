import { ReactVisualProps } from './reactVisualTypes'

export type LazyVideoProps = Pick<ReactVisualProps,
  'alt' |
  'fit' |
  'position' |
  'priority' |
  'videoLoader' |
  'sourceMedia' |
  'style'
> & {
  src: Required<ReactVisualProps>['video']

  // Use a transparent gif poster image
  noPoster?: boolean

  // Controls autoplaying and play state
  paused?: boolean
}
