// Configuration of next/image for Cypress tess
module.exports = {
  images: {

    // Disable Next.js producing it's own crops within dev server which don't
    // work with Cypress tests
    // https://www.cypress.io/blog/2023/02/16/component-testing-next-js-with-cypress/
    unoptimized: true,

    // Support tests fetching imaages from placehold.co
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
}
