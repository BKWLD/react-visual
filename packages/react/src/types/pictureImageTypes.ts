import { ReactVisualTypes } from './reactVisualTypes';

export type pictureImageProps = Pick<ReactVisualTypes,
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
