# @react-visual/sanity-next [![react-visual](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/count/fn6c7w&style=flat&logo=cypress)](https://cloud.cypress.io/projects/fn6c7w/runs)

Renders Sanity images and videos into a container using Next.js features.

## Install

```sh
yarn add @react-visual/sanity-next
```

Define these `.env` variables:

```sh
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
```

## Usage

```jsx
import Visual from '@react-visual/sanity-next'

export default function Example({
  sanityImageAsset,
  sanityVideoAsset,
}) {
  return (
    <Visual
      image={ sanityImageAsset }
      video={ sanityVideoAsset }
      sizes='100vw' />
  )
}
```

For more examples, read [the Cypress component tests](./cypress/component).

## Props

### Sources

| Prop | Type | Description
| -- | -- | --
| `image` | `SanityImageSource` | A Sanity `image` object.
| `video` | `SanityFileSource` | A Sanity `file` object for a video.
| `src` | `object` | An object containg properites of `image`, `video`, and `alt`.  This is intended to modeled in Sanity as an object.
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

### Theming

| Prop | Type | Description
| -- | -- | --
| `className` | `string` | Add a custom CSS class.
| `style` | `CSSProperties` | Add additional styles.
