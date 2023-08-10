import SanityNextVisual from '../../src'

// Viewport sizes
const VW = Cypress.config('viewportWidth'),
  VH = Cypress.config('viewportHeight')

describe('no asset', () => {

  it('renders nothing', () => {
    cy.mount(<SanityNextVisual
      width={300}
      height={200}
      alt=''
      data-cy='next-visual' />)
    // cy.get('[data-cy=next-visual]').should('not.exist')
  })

})
