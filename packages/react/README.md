# @react-visual/react [![react-visual](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/fn6c7w&style=flat&logo=cypress)](https://cloud.cypress.io/projects/fn6c7w/runs)

Renders images and videos into a container. Features:

- Supports a next.js style image loader for making srcsets
- Creates `<source>` tags for different MIME types and media queries
- Easily render assets using aspect ratios
- Videos are lazyloaded (unless `priority` flag is set)
- Adds play/pause toggle for videos for [ADA compliance](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html)

## Install

```sh
yarn add @react-visual/react
```

## Usage

Play a video with a poster image.

```jsx
import Visual from "@react-visual/react";

export default function VideoExample() {
  return (
    <Visual
      image="https://placehold.co/300x150"
      video="https://placehold.co/300x150.mp4"
      aspect={300 / 150}
      sizes="100vw"
      alt="Example using placeholder images"
    />
  );
}
```

Generate multiple landscape and portrait sources using an image CDN to create a srcset.

```jsx
import Visual from "@react-visual/react";

export default function ResponsiveExample() {
  return (
    <Visual
      image="https://placehold.co/200x200"
      sourceTypes={["image/webp"]}
      sourceMedia={["(orientation:landscape)", "(orientation:portrait)"]}
      imageLoader={({ src, type, media, width }) => {
        const height = media?.includes("landscape") ? width * 0.5 : width;
        const ext = type?.includes("webp") ? ".webp" : "";
        return `https://placehold.co/${width}x${height}${ext}`;
      }}
      width="100%"
      alt="Example of responsive images"
    />
  );
}
```

The above would produce:

```html
<div style="position: relative; width: 100%; max-width: 100%;">
  <picture>
    <source
      type="image/webp"
      media="(orientation:landscape)"
      srcset="
        https://placehold.co/640x320.webp    640w,
        https://placehold.co/750x375.webp    750w,
        https://placehold.co/828x414.webp    828w,
        https://placehold.co/1080x540.webp  1080w,
        https://placehold.co/1200x600.webp  1200w,
        https://placehold.co/1920x960.webp  1920w,
        https://placehold.co/2048x1024.webp 2048w,
        https://placehold.co/3840x1920.webp 3840w
      "
    />
    <source
      type="image/webp"
      media="(orientation:portrait)"
      srcset="
        https://placehold.co/640x640.webp    640w,
        https://placehold.co/750x750.webp    750w,
        https://placehold.co/828x828.webp    828w,
        https://placehold.co/1080x1080.webp 1080w,
        https://placehold.co/1200x1200.webp 1200w,
        https://placehold.co/1920x1920.webp 1920w,
        https://placehold.co/2048x2048.webp 2048w,
        https://placehold.co/3840x3840.webp 3840w
      "
    />
    <source
      type="image/webp"
      media="(orientation:landscape)"
      srcset="
        https://placehold.co/640x320    640w,
        https://placehold.co/750x375    750w,
        https://placehold.co/828x414    828w,
        https://placehold.co/1080x540  1080w,
        https://placehold.co/1200x600  1200w,
        https://placehold.co/1920x960  1920w,
        https://placehold.co/2048x1024 2048w,
        https://placehold.co/3840x1920 3840w
      "
    />
    <source
      media="(orientation:portrait)"
      srcset="
        https://placehold.co/640x640    640w,
        https://placehold.co/750x750    750w,
        https://placehold.co/828x828    828w,
        https://placehold.co/1080x1080 1080w,
        https://placehold.co/1200x1200 1200w,
        https://placehold.co/1920x1920 1920w,
        https://placehold.co/2048x2048 2048w,
        https://placehold.co/3840x3840 3840w
      "
    />
    <img
      src="https://placehold.co/200x200"
      loading="lazy"
      alt="Example of responsive images"
      style="object-fit: cover; width: 100%;"
    />
  </picture>
</div>
```

Accept objects from a CMS to produce responsive assets at different aspect ratios.

```jsx
import Visual from "@react-visual/react";

export default function ResponsiveExample() {
  return (
    <Visual
      image={{
        landscape: {
          url: "https://placehold.co/500x250",
          aspect: 2,
        },
        portrait: {
          url: "https://placehold.co/500x500",
          aspect: 1,
        },
      }}
      sourceMedia={["(orientation: landscape)", "(orientation: portrait)"]}
      imageLoader={({ src, type, media, width }) => {
        // Choose the right source
        const asset = media?.includes("landscape")
          ? src.landscape
          : src.portrait;

        // Make the dimensions
        const dimensions = `${width}x${width / asset.aspect}`;

        // Choose the right format
        const ext = type?.includes("webp") ? ".webp" : ".jpg";

        // Make the url
        return `https://placehold.co/${dimensions}${ext}`;
      }}
      aspect={({ image, media }) => {
        return media?.includes("landscape")
          ? image.landscape.aspect
          : image.portrait.aspect;
      }}
      alt="Example of responsive images"
    />
  );
}
```

This produces:

```html
<div
  class="rv-orientation-landscape-2 rv-orientation-portrait-1"
  style="position: relative; max-width: 100%;"
>
  <picture>
    <source
      media="(orientation: landscape)"
      srcset="
        https://placehold.co/640x320.jpg    640w,
        https://placehold.co/750x375.jpg    750w,
        https://placehold.co/828x414.jpg    828w,
        https://placehold.co/1080x540.jpg  1080w,
        https://placehold.co/1200x600.jpg  1200w,
        https://placehold.co/1920x960.jpg  1920w,
        https://placehold.co/2048x1024.jpg 2048w,
        https://placehold.co/3840x1920.jpg 3840w
      "
    />
    <source
      media="(orientation: portrait)"
      srcset="
        https://placehold.co/640x640.jpg    640w,
        https://placehold.co/750x750.jpg    750w,
        https://placehold.co/828x828.jpg    828w,
        https://placehold.co/1080x1080.jpg 1080w,
        https://placehold.co/1200x1200.jpg 1200w,
        https://placehold.co/1920x1920.jpg 1920w,
        https://placehold.co/2048x2048.jpg 2048w,
        https://placehold.co/3840x3840.jpg 3840w
      "
    />
    <img
      src="https://placehold.co/1920x1920.jpg"
      loading="lazy"
      alt="Example of responsive images"
      style="object-fit: cover; position: absolute; inset: 0px;"
    />
  </picture>
  <style>
    @media (orientation: landscape) {
      .rv-orientation-landscape-2 {
        aspect-ratio: 2;
      }
    }
    @media (orientation: portrait) {
      .rv-orientation-portrait-1 {
        aspect-ratio: 1;
      }
    }
  </style>
</div>
```

For more examples, read [the Cypress component tests](./cypress/component).

## Props

### Sources

| Prop    | Type               | Description                 |
| ------- | ------------------ | --------------------------- |
| `image` | `string`, `object` | URL to an image asset.      |
| `video` | `string`, `object` | URL to a video asset asset. |

### Layout

| Prop       | Type                                                                                                                                                                     | Description                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `expand`   | `boolean`                                                                                                                                                                | Make the Visual fill it's container via CSS using absolute positioning.                                                                  |
| `aspect`   | `number`, [`AspectCalculator`](https://github.com/BKWLD/react-visual/blob/eaf2d150efa1187033ba732a350a4db20f260435/packages/react/src/types/reactVisualTypes.ts#L52-L57) | Force the Visual to a specific aspect ratio.                                                                                             |
| `width`    | `number`, `string`                                                                                                                                                       | A CSS dimension value or a px number.                                                                                                    |
| `height`   | `number`, `string`                                                                                                                                                       | A CSS dimension value or a px number.                                                                                                    |
| `fit`      | `string`                                                                                                                                                                 | An [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) value that is applied to the assets. Defaults to `cover`. |
| `position` | `string`                                                                                                                                                                 | An [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) value.                                          |

### Loading

| Prop          | Type                                                                                                                                                       | Description                                                                                                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`    | `boolean`                                                                                                                                                  | Disables [`<img loading="lazy>"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading) and prevents videos from lazy loading based on IntersectionObserver.            |
| `sizes`       | `string`                                                                                                                                                   | Sets the `<img sizes>` attribute.                                                                                                                                                        |
| `sourceTypes` | [`SourceType[]`](https://github.com/BKWLD/react-visual/blob/eaf2d150efa1187033ba732a350a4db20f260435/packages/react/src/types/reactVisualTypes.ts#L72-L78) | Specify image MIME types that will be passed to the `imageLoader` and used to create additional `<source>` tags. Use this to create `webp` or `avif` sources with a CDN like Contentful. |
| `sourceMedia` | [`SourceType[]`](https://github.com/BKWLD/react-visual/blob/eaf2d150efa1187033ba732a350a4db20f260435/packages/react/src/types/reactVisualTypes.ts#L80-L83) | Specify media queries that will be passed to the `imageLoader` and used to create additional `<source>` tags.                                                                            |
| `imageLoader` | [`ImageLoader`](https://github.com/BKWLD/react-visual/blob/eaf2d150efa1187033ba732a350a4db20f260435/packages/react/src/types/reactVisualTypes.ts#L38-L44)  | Uses syntax that is similar [to `next/image`'s `loader` prop](https://nextjs.org/docs/app/api-reference/components/image#loader). A srcset is built with a hardcoded list of widths.     |
| `videoLoader` | [`VideoLoader`](https://github.com/BKWLD/react-visual/blob/eaf2d150efa1187033ba732a350a4db20f260435/packages/react/src/types/reactVisualTypes.ts#L46-L50)  | Like `imageLoader` but is only passed the `src` and `media` properties.                                                                                                                  |

### Video

| Prop        | Type            | Description                                                                                                                                                                                                |
| ----------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `paused`    | `boolean`       | Disables autoplay of videos. This prop is reactive, unlike the `paused` property of the html `<video>` tag. You can set it to `true` to pause a playing video or set it to `false` to play a paused video. |
| `onPause`   | `Function`      | Invoked whenever the video fires a [pause event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event).                                                                           |
| `onPlay`    | `Function`      | Invoked whenever the video fires a [play event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event).                                                                             |
| `playIcon`  | `ComponentType` | Replace the play icon used with accessibility controls.                                                                                                                                                    |
| `pauseIcon` | `ComponentType` | Replace the pause icon used with accessibility controls.                                                                                                                                                   |

### Accessibility

| Prop                            | Type                                                                                                                                                         | Description                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `alt`                           | `string`                                                                                                                                                     | Sets the alt attribute or aria-label value, depending on asset type.            |
| `hideAccessibilityControls`     | `boolean`                                                                                                                                                    | Removes the play/pause toggle on videos.                                        |
| `accessibilityControlsPosition` | [`PositionOption`](https://github.com/BKWLD/react-visual/blob/eaf2d150efa1187033ba732a350a4db20f260435/packages/react/src/types/reactVisualTypes.ts#L61-L70) | Controls the position of the accessibility controls. Defaults to `bottom left`. |

### Theming

| Prop        | Type            | Description             |
| ----------- | --------------- | ----------------------- |
| `className` | `string`        | Add a custom CSS class. |
| `style`     | `CSSProperties` | Add additional styles.  |
