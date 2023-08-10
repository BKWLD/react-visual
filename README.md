# @react-visual

A monorepo hosting components for rendering image and video in a single container for easy rendering of visual elements.

- [`@react-visual/react`](./packages/react) - Currently just helper components used by framework & CMS specific components
- [`@react-visual/next`](./packages/next) - Uses the `next/image` component for rendering images.
- [`@react-visual/sanity-next`](./packages/sanity-next) - Takes Sanity asset and passes them to `@react-visual/next` for rendering.

## Contributing

This project uses Lerna to release versions, using [the default versioning strategy](https://lerna.js.org/docs/features/version-and-publish#versioning-strategies).

- `yarn lerna version` - Tag a new version
- `yarn lerna publish` - Publish versions to NPM
