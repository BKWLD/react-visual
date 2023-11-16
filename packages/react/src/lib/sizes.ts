
// Based on
// https://nextjs.org/docs/pages/api-reference/components/image#devicesizes
const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]

// Based on
// https://nextjs.org/docs/pages/api-reference/components/image#imagesizes
const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384]

// The sizes for which srcsets should be produced
export const srcsetSizes = [
  ...imageSizes,
  ...deviceSizes,
]
