/// <reference types="cypress" />

// Asset that el has dimensions
Cypress.Commands.add('hasDimensions',
  { prevSubject: true },
  (subject, width, height) => {

  expect(subject.width()).to.equal(width)
  expect(subject.height()).to.equal(height)
  return subject
})

// Check that a video is playing
// https://glebbahmutov.com/blog/test-video-play/
Cypress.Commands.add('isPlaying',
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
    }
  }
}


