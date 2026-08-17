import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 500,
  viewportHeight: 500,

  component: {
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
