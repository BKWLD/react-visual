// Disable caching of images
// https://github.com/cypress-io/cypress/issues/14459#issuecomment-768616195
if (Cypress.browser.family === 'chromium') {
  Cypress.automation('remote:debugger:protocol', {
    command: 'Network.enable',
    params: {}
  });
  Cypress.automation('remote:debugger:protocol', {
    command: 'Network.setCacheDisabled',
    params: { cacheDisabled: true }
  });
}
