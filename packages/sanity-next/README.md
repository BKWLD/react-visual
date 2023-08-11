# @react-visual/sanity-next [![react-visual](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/fn6c7w&style=flat&logo=cypress)](https://cloud.cypress.io/projects/fn6c7w/runs)

Renders Sanity images and videos into a container using Next.js.  Features:

- Uses `next/image` to render images
- Generates responsive images using Sanity CDN
- Automatically sets aspect ratio, placeholder, and hotspot
- Videos are lazyloaded (unless `priority` flag is set)

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

You can use explicit `image` and `video` props.  These are expected to be Sanity [`image`](https://www.sanity.io/docs/image-type) and [`file`](https://www.sanity.io/docs/file-type) objects, respectively, and should have a child field called `alt` that contains a description of the asset.

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

Alternatively, you can model a Sanity [`object`](https://www.sanity.io/docs/object-type) containing `image`, `video`, and `alt` fields and use the `src` shorthand prop:

```jsx
import Visual from '@react-visual/sanity-next'

export default function Example({ sanityVisualObject }) {
  return <Visual src={ sanityVisualObject } sizes='100vw' />
}
```

If you de-reference your `image` objects in groq with a query like:

```groq
*[_type == 'article']{
  image: { ..., asset-> }
}
```

...then the component will read the following properties from your Image automatically:

- Aspect Ratio
- Hotspot / Focal Point
- Placeholder blur data

For more examples, read [the Cypress component tests](./cypress/component).

## Props

### Sources

| Prop | Type | Description
| -- | -- | --
| `image` | `SanityImageSource` | A Sanity `image` object.
| `video` | `SanityFileSource` | A Sanity `file` object for a video.
| `src` | `object` | An object containg properites of `image`, `video`, and `alt`.  This is intended to modeled in Sanity as an object.
| `placeholderData` | `string` | A Data URL that is rendered before the image loads via [`next/image`'s `blurDataURL`](https://nextjs.org/docs/pages/api-reference/components/image#blurdataurl). *If you de-reference your images, this will be set automatically*.

### Layout

| Prop | Type | Description
| -- | -- | --
| `expand` | `boolean` | Make the Visual fill it's container via CSS using absolute positioning.
| `aspect` | `number` | Force the Visual to a specific aspect ratio. *If you de-reference your images, this will be set automatically to the aspect ratio of the image.*.
| `width` | `number`, `string` | A CSS dimension value or a px number.
| `height` | `number`, `string` | A CSS dimension value or a px number.
| `fit` | `string` | An [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) value that is applied to the assets.  Defaults to `cover`.
| `position` | `string` | An [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) value. *If you de-reference your images, this will be set automatically to the choices made in your image hotspot*.

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
