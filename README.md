# @react-visual [![react-visual](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/fn6c7w&style=flat&logo=cypress)](https://cloud.cypress.io/projects/fn6c7w/runs)

A monorepo hosting components for rendering image and video in a single container for easy rendering of visual elements.

- [@react-visual/react](./packages/react) - Vanilla implementation.
- [@react-visual/contentful](./packages/contentful) - Adapter for Contentful assets.
- [@react-visual/next](./packages/next) - Uses the `next/image` component for rendering images.
- [@react-visual/sanity-next](./packages/sanity-next) - Takes Sanity asset and passes them to `@react-visual/next` for rendering.

## Examples

### @react-visual/react

Using `sourceTypes` and `sourceMedia` with `imageLoader` to produce multiple `<source>` tags with `srcset` attributes.

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

[View CodeSandbox demo](https://codesandbox.io/p/sandbox/react-visual-react-demo-w4sh62)

### @react-visual/contentful

Using with a Visual entryType containing image and video fields:

```jsx
import Visual from "@react-visual/contentful";

export default function Example() {
  return <Visual src={entry.background} sizes="100vw" />;
}
```

[View CodeSandbox demo](https://codesandbox.io/p/devbox/react-visual-contentful-demo-gmxg7d)

### @react-visual/next

Using framework adapter for Next.js:

```jsx
import Visual from "@react-visual/next";

export default function Example() {
  return (
    <Visual
      image="https://placehold.co/1600x900.png"
      video="https://placehold.co/1600x900.mp4"
      aspect={16 / 9}
      sizes="100vw"
      alt="Example using placeholder assets"
    />
  );
}
```

[View CodeSandbox demo](https://codesandbox.io/p/sandbox/react-visual-next-demo-8lwxl9)

### @react-visual/sanity-next

Using Sanity + Next.js Adapter to automatically populate aspect ratio, alt, blurred placeholder, and support both image and video in one object:

```jsx
import Visual from "@react-visual/sanity-next";

export default function Example({ background }) {
  return <Visual src={background} sizes="100vw" />;
}
```

## Contributing

This project uses Lerna to release versions, using [the default versioning strategy](https://lerna.js.org/docs/features/version-and-publish#versioning-strategies).

- `yarn lerna run test` - Run all tests
- `yarn lerna version` - Tag a new version
- `yarn lerna publish [major|minor|patch]` - Tag and publish a version
- `yarn lerna publish from-package` - Publish the current version
