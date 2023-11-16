import { ReactVisualProps } from './reactVisualTypes';

export type PictureImageProps = Pick<ReactVisualProps,
  'sizes' |
  'alt' |
  'fit' |
  'position' |
  'priority' |
  'imageLoader' |
  'style'
> & {
  src: Required<ReactVisualProps>['image']
}
