# @react-visual [![react-visual](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/fn6c7w&style=flat&logo=cypress)](https://cloud.cypress.io/projects/fn6c7w/runs)

A monorepo hosting components for rendering image and video in a single container for easy rendering of visual elements.

- [@react-visual/react](./packages/react) - Vanilla implementation.
- [@react-visual/next](./packages/next) - Uses the `next/image` component for rendering images.
- [@react-visual/sanity-next](./packages/sanity-next) - Takes Sanity asset and passes them to `@react-visual/next` for rendering.

## Examples

### @react-visual/react

Using `sourceTypes` and `sourceMedia` with `imageLoader` to produce multiple `<source>` tags with `srcset` attributes.

```jsx
import Visual from '@react-visual/react'

export default function ResponsiveExample() {
  return (
    <Visual
      image="https://placehold.co/300x150"
      sourceTypes={["image/webp", "image/jpeg"]}
      sourceMedia={["(orientation:landscape)", "(orientation:portrait)"]}
      imageLoader={({ type, media, width }) => {
        const ext = type?.includes("webp") ? ".webp" : ".jpg";
        const height = media?.includes("landscape") ? width * 0.5 : width;
        return `https://placehold.co/${width}x${height}${ext}`;
      }}
      aspect={300 / 150}
      sizes="100vw"
      alt="Example of responsive images"
    />
  )
}
```

[View CodeSandbox demo](https://codesandbox.io/p/sandbox/react-visual-react-demo-w4sh62)

### @react-visual/next

Using framework adapter for Next.js:

```jsx
import Visual from '@react-visual/next'

export default function Example() {
  return (
    <Visual
      image="https://placehold.co/1600x900.png"
      video="https://placehold.co/1600x900.mp4"
      aspect={16 / 9}
      sizes='100vw'
      alt='Example using placeholder assets' />
  )
}
```

[View CodeSandbox demo](https://codesandbox.io/p/sandbox/react-visual-next-demo-8lwxl9)

### @react-visual/sanity-next

Using Sanity + Next.js Adapter to automatically populate aspect ratio, alt, blurred placeholder, and support both image and video in one object:

```jsx
import Visual from '@react-visual/sanity-next'

export default function Example({ background }) {
  return <Visual src={ background } sizes='100vw' />
}
```

## Contributing

This project uses Lerna to release versions, using [the default versioning strategy](https://lerna.js.org/docs/features/version-and-publish#versioning-strategies).

- `yarn lerna run test` - Run all tests
- `yarn lerna version` - Tag a new version
- `yarn lerna publish [major|minor|path]` - Tag and publish a version
- `yarn lerna publish from-package` - Publish the current version
