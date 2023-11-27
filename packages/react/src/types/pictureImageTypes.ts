import { ReactVisualProps } from './reactVisualTypes'

export type PictureImageProps = Pick<ReactVisualProps,
  'sizes' |
  'alt' |
  'fit' |
  'position' |
  'priority' |
  'imageLoader' |
  'sourceTypes' |
  'sourceMedia' |
  'style'
> & {
  src: Required<ReactVisualProps>['image']
}
