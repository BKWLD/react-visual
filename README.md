# next-visual

Renders images and videos into a container.  Features:

- Uses `next/image` to render images
- Easily render assets using aspect ratios
- Videos are lazyloaded (unless `priority` flag is set)

## Install

```sh
yarn add next-visual
```

Images will be rendered using `next/image` so expect to do configuration of [`remotePatterns`](https://nextjs.org/docs/app/api-reference/components/image#remotepatterns) for CMS hosted images.

## Usage

```jsx
import { NextVisual } from 'next-visual'

export default function Example() {
  return (
    <NextVisual
      image='https://placehold.co/300x150'
      video='https://placehold.co/300x150.mp4'
      aspect={300/150}
      sizes='100vw'
      alt='Example using placeholder images' />
  )
}
```

## Props

### Sources

| Prop | Type | Description
| -- | -- | --
| `image` | `string` | URL to an image asset.
| `video` | `string` | URL to a video asset asset.

### Layout

| Prop | Type | Description
| -- | -- | --
| `expand` | `boolean` | Make the visual fill it's container via CSS using absolute positioning. |

### Accessibility

| Prop | Type | Description
| -- | -- | --
| `alt` | `string` | Sets the  alt attribute or aria-label value, depending on asset type. |
