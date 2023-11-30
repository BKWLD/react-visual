/// <reference types="cypress" />

// Asset that el has dimensions
Cypress.Commands.add('hasDimensions',
  { prevSubject: true },
  (subject, width, height) => {
  cy.wrap(subject).invoke('width').should('equal', width)
  cy.wrap(subject).invoke('height').should('equal', height)
  cy.wrap(subject)
})

// Check that a video is playing
// https://glebbahmutov.com/blog/test-video-play/
Cypress.Commands.add('isPlaying',
  { prevSubject: true },
  (subject) => {
  cy.wrap(subject).should('have.prop', 'paused', false)
  cy.wrap(subject)
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
      ): Chainable<void>

      isPlaying(): Chainable<void>
    }
  }
}


