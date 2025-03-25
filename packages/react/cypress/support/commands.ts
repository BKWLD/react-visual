/// <reference types="cypress" />

// Asset that el has dimensions
Cypress.Commands.add(
  "hasDimensions",
  { prevSubject: true },
  (subject, width, height) => {
    cy.wrap(subject).invoke("width").should("equal", width);
    cy.wrap(subject).invoke("height").should("equal", height);
  },
);

// Asset has loaded
// https://glebbahmutov.com/cypress-examples/recipes/image-loaded.html
Cypress.Commands.add("imgLoaded", { prevSubject: true }, (subject) => {
  cy.wait(100); // Wait a tick to solve for inexplicable flake
  cy.wrap(subject)
    .should("be.visible")
    .and("have.prop", "naturalWidth")
    .should("be.greaterThan", 0);
});

// Check that a video is playing
// https://glebbahmutov.com/blog/test-video-play/
Cypress.Commands.add("isPlaying", { prevSubject: true }, (subject) => {
  cy.wrap(subject).should("have.prop", "paused", false);
});

// Check that a video is paused
// https://glebbahmutov.com/blog/test-video-play/
Cypress.Commands.add("isPaused", { prevSubject: true }, (subject) => {
  cy.wrap(subject).should("have.prop", "paused", true);
});

// Clear browser cache
// https://stackoverflow.com/a/72945339/59160
Cypress.Commands.add("clearCache", () => {
  cy.wrap(
    Cypress.automation("remote:debugger:protocol", {
      command: "Network.clearBrowserCache",
    }),
  );
});

// Add Typescript support for custom commaands
// https://docs.cypress.io/guides/tooling/typescript-support#Types-for-Custom-Commands
export {};
declare global {
  namespace Cypress {
    interface Chainable {
      hasDimensions(width: number, height: number): Chainable<void>;

      imgLoaded(): Chainable<void>;

      isPlaying(): Chainable<void>;
      isPaused(): Chainable<void>;

      clearCache(): Chainable<void>;
    }
  }
}
