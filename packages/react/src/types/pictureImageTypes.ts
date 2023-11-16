import { ReactVisualTypes } from './reactVisualTypes';

export type PictureImageProps = Pick<ReactVisualTypes,
  'sizes' |
  'alt' |
  'fit' |
  'position' |
  'priority' |
  'imageLoader' |
  'style'
> & {
  src: Required<ReactVisualTypes>['image']
}
