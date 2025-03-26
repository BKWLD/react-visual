# @react-visual/contentful [![react-visual](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/fn6c7w&style=flat&logo=cypress)](https://cloud.cypress.io/projects/fn6c7w/runs)

Renders Contentful images and videos into a container.  Features:

- Automatically defines a loader functions for generating srcsets
- Supports responsive image and video assets
- Adds play/pause toggle for videos for [ADA compliance](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html)

## Install

```sh
yarn add @react-visual/contentful
```

## Usage

### Asset fields

```jsx
import Visual from '@react-visual/contentful'

export default function Example() {
  return (
    <Visual
      image={ entry.image }
      video={ entry.video }
      sizes='100vw'/>
  )
}
```

Where `image` and `video` are asset fields defined by these GQL fragments:

```gql
fragment image on Asset {
  title
  description
  fileName
  width
  height
  url
}

fragment video on Asset {
  title
  description
  fileName
  url
}
```

### Visual entryType reference

This is the expected pattern for rendering responsive images and videos.

```jsx
import Visual from '@react-visual/contentful'

export default function Example() {
  return (
    <Visual
      src={ entry.background }
      sizes='100vw'/>
  )
}
```

Where `background` is defined by this GQL fragment (this consumes the previous fragments):

```gql
fragment visual on Visual {
  image { ...image }
  portraitImage { ...image }
  video { ...video }
  portraitVideo { ...video }
  alt
}
```

For more examples, read [the Cypress component tests](./cypress/component).

### Width Based Responsive support

This package also exports `WidthBasedVisual` which can be used to switch between responsive assets based on width based media queries. Usage is the same and will default to rendering "portrait" assets at 767px wide and below.

```jsx
import { WidthBasedVisual } from '@react-visual/contentful'

export default function Example() {
  return (
    <WidthBasedVisual
      src={ entry.background }
      sizes='100vw'/>
  )
}
```

You can customize the breakpoint with the `breakpoint` prop.  In this example, "portrait" assets will be rendered at a viewport of 375px and below:

```jsx
import { WidthBasedVisual } from '@react-visual/contentful'

export default function Example() {
  return (
    <WidthBasedVisual
      src={ entry.background }
      sizes='100vw'
      breakpoint='375px'/>
  )
}
```

## Props

### Sources

| Prop | Type | Description
| -- | -- | --
| `image` | `object` | A Contentful image Asset.
| `video` | `object` | A Contentful video Asset.
| `src` | `object` | An object with keys of responsive keys.  See examples above.

### Layout

| Prop | Type | Description
| -- | -- | --
| `expand` | `boolean` | Make the Visual fill it's container via CSS using absolute positioning.
| `aspect` | `number` | Force the Visual to a specific aspect ratio. If empty, this will be set using width and height fields from Contentful queries.
| `width` | `number`, `string` | A CSS dimension value or a px number.
| `height` | `number`, `string` | A CSS dimension value or a px number.
| `fit` | `string` | An [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) value that is applied to the assets.  Defaults to `cover`.
| `position` | `string` | An [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) value.

### Loading

| Prop | Type | Description
| -- | -- | --
| `priority` | `boolean` | Sets [`next/image`'s `priority`](https://nextjs.org/docs/pages/api-reference/components/image#priority) and videos to not lazy load.
| `sizes` | `string` | Sets [`next/image`'s `sizes`](https://nextjs.org/docs/pages/api-reference/components/image#sizes) prop.
| `breakpoint` | `number`, `string` | Only supported by `WidthBasedVisual`. The max-width media query value to switch to the portrait/mobile image. Defaults to `767px`.


### Video

| Prop | Type | Description
| -- | -- | --
| `paused` | `boolean` | Disables autoplay of videos. This prop is reactive, unlike the `paused` property of the html `<video>` tag.  You can set it to `true` to pause a playing video or set it to `false` to play a paused video.
| `onPause` | `Function` | Invoked whenever the video fires a [pause event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event).
| `onPlay` | `Function` | Invoked whenever the video fires a [play event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event).
| `playIcon` | `ComponentType` | Replace the play icon used with accessibility controls.
| `pauseIcon` | `ComponentType` | Replace the pause icon used with accessibility controls.

### Accessibility

| Prop | Type | Description
| -- | -- | --
| `alt` | `string` | Sets the alt attribute or aria-label value, depending on asset type.
| `hideAccessibilityControls` | `boolean` | Removes the play/pause toggle on videos.
| `accessibilityControlsPosition` | [`PositionOption`](https://github.com/BKWLD/react-visual/blob/eaf2d150efa1187033ba732a350a4db20f260435/packages/react/src/types/reactVisualTypes.ts#L61-L70) | Controls the position of the accessibility controls.  Defaults to `bottom left`.

### Theming

| Prop | Type | Description
| -- | -- | --
| `className` | `string` | Add a custom CSS class.
| `style` | `CSSProperties` | Add additional styles.
