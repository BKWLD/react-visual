# React Visual Demo

This demo app showcases the `@react-visual/react` components in action.

## Running Locally

From the `packages/react` directory, run:

```bash
yarn demo
```

This will start a development server at `http://localhost:3000` with hot module reloading.

## Testing with iOS Simulator

1. Start the demo server: `yarn demo`
2. Open your iOS Simulator
3. Navigate to `http://localhost:3000` in Safari
4. You can also use your computer's local IP address (e.g., `http://192.168.1.x:3000`) to test on a physical device

## Using in CodeSandbox

This demo is designed to work seamlessly in CodeSandbox. Simply:

1. Open the package in CodeSandbox
2. Run `yarn demo` in the terminal
3. View the preview in the browser pane

## What's Included

The demo showcases:

- **ReactVisual** - Image rendering with various props
- **LazyVideo** - Video component with lazy loading
- **VisualWrapper** - Layout wrapper for custom content
- Various prop combinations (aspect ratios, fit modes, etc.)

## Building for Production

To build the demo for static deployment:

```bash
yarn demo:build
```

The output will be in the `demo-dist` directory.
