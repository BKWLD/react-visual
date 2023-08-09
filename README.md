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

For more examples, read [the Cypress component tests](./cypress/component).

## Props

### Sources

| Prop | Type | Description
| -- | -- | --
| `image` | `string` | URL to an image asset.
| `video` | `string` | URL to a video asset asset.
| `placeholderData` | `string` | A Data URL that is rendered before the image loads via [`next/image`'s `blurDataURL`](https://nextjs.org/docs/pages/api-reference/components/image#blurdataurl).

### Layout

| Prop | Type | Description
| -- | -- | --
| `expand` | `boolean` | Make the Visual fill it's container via CSS using absolute positioning.
| `aspect` | `number` | Force the Visual to a specific aspect ratio.
| `width` | `number`, `string` | A CSS dimension value or a px number.
| `height` | `number`, `string` | A CSS dimension value or a px number.
| `fit` | `string` | An [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) value that is applied to the assets.  Defaults to `cover`.
| `position` | `string` | An [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) value.

### Loading

| Prop | Type | Description
| -- | -- | --
| `priority` | `boolean` | Sets [`next/image`'s `priority`](https://nextjs.org/docs/pages/api-reference/components/image#priority) and videos to not lazy load.
| `sizes` | `string` | Sets [`next/image`'s `sizes`](https://nextjs.org/docs/pages/api-reference/components/image#sizes) prop.


### Accessibility

| Prop | Type | Description
| -- | -- | --
| `alt` | `string` | Sets the  alt attribute or aria-label value, depending on asset type.

### Themeing

| Prop | Type | Description
| -- | -- | --
| `className` | `string` | Add a custom CSS class.
| `style` | `CSSProperties` | Add additional styles.
