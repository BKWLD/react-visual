// Configuration of next/image for Cypress tess
module.exports = {
  images: {

    // Support tests fetching imaages from placehold.co
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}
