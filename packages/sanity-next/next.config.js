// Configuration of next/image for Cypress tess
export default {
  images: {
    // Support tests fetching imaages from placehold.co
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};
