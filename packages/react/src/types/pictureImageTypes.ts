import { ReactVisualTypes } from './reactVisualTypes';

export type pictureImageProps = Pick<ReactVisualTypes,
  'sizes' |
  'alt' |
  'fit' |
  'position' |
  'priority' |
  'imageLoader'
> & {
  src: ReactVisualTypes['image']
}
