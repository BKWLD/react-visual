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
  cy.wrap(subject).should('have.prop', 'paused', false)
})

// Check that a video is paused
// https://glebbahmutov.com/blog/test-video-play/
Cypress.Commands.add('isPaused',
  { prevSubject: true },
  (subject) => {
  cy.wrap(subject).should('have.prop', 'paused', true)
})

// Clear browser cache
// https://stackoverflow.com/a/72945339/59160
Cypress.Commands.add('clearCache', () => {
  cy.wrap(Cypress.automation('remote:debugger:protocol', {
    command: 'Network.clearBrowserCache',
  }))
})
