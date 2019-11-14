import { Asset } from 'contentful';
import range from 'lodash/range';
import flatten from 'lodash/flatten';

interface Options {
  f?: string;
  fit?: string;
  fl?: string;
  fm?: string;
  h?: number;
  q?: number;
  r?: number;
  w?: number;
}

const isValidVideo = (url: string): boolean => /^.*\.(mp4|webm|ogg)$/.test(url);
const isValidImage = (url: string): boolean => /^.*\.(png|jpg|webp)$/.test(url);
const isValidAsset = (image: Asset) =>
  image.fields && image.fields.file && image.fields.file.url;

const queryString = (params: any) =>
  Object.keys(params)
    .map(key => key + '=' + params[key])
    .join('&');

export const contentful = (asset: Asset, options: Options = {}) => {
  const url = isValidAsset(asset);

  if (!url) {
    throw new Error(
      'A valid asset must be passed to the Contentful visual adapter'
    );
  }

  if (isValidImage(url)) {
    return handleImage(url, options);
  } else if (isValidVideo(url)) {
    return handleVideo(url);
  } else {
    // TODO: Throw better error here
    throw new Error('Cannot process file');
  }
};

function handleImage(url: string, options: Options) {
  const minWidth = 320;
  const maxWidth = options.w || 1440;

  const sizeRange = range(minWidth, maxWidth, 100);

  const isPng = /^.*\.(png)$/.test(url);

  const src = `${url}?${queryString({ ...options, q: 90 })}`;

  const poster = `${url}?${queryString({ ...options, w: 5, h: 5, q: 10 })}`;

  const srcSet = sizeRange.map(size => {
    if (isPng) {
      return [
        `${url}?${queryString({
          ...options,
          fm: 'webp',
          q: 90,
          w: size,
        })} ${size}w`,
        `${url}?${queryString({ ...options, q: 90, w: size })} ${size}w`,
      ];
    } else {
      return `${url}?${queryString({
        ...options,
        q: 90,
        fl: 'progressive',
        w: size,
      })} ${size}w`;
    }
  });

  return {
    poster,
    src,
    srcSet: flatten(srcSet),
    type: 'image',
  };
}

function handleVideo(url: string) {
  return {
    src: url,
    type: 'video',
  };
}
