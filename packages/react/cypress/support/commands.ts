/// <reference types="cypress" />

// Check that a video is playing
// https://glebbahmutov.com/blog/test-video-play/
Cypress.Commands.add('isPlaying',
  { prevSubject: true },
  (subject) => {
  cy.wrap(subject).should('have.prop', 'paused', false)
})

// Check that a video is paused
// https://glebbahmutov.com/blog/test-video-play/
Cypress.Commands.add('isPaused',
  { prevSubject: true },
  (subject) => {
  cy.wrap(subject).should('have.prop', 'paused', true)
})

// Add Typescript support for custom commaands
// https://docs.cypress.io/guides/tooling/typescript-support#Types-for-Custom-Commands
export {};
declare global {
  namespace Cypress {
    interface Chainable {

      hasDimensions(
        width: number,
        height: number
      ): Chainable<JQueryWithSelector>

      isPlaying(): Chainable<void>
      isPaused(): Chainable<void>
    }
  }
}

