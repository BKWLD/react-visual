import { VisualWrapper } from '../../src'

// Shared props
const sharedProps = {
  style: { background: 'black', color: 'white' },
  className: 'wrapper',
}

// Viewport sizes
const VW = Cypress.config('viewportWidth'),
  VH = Cypress.config('viewportHeight')

describe('fixed size', () => {

  it('integer values', () => {
    cy.mount(<VisualWrapper {...sharedProps }
      width={300}
      height={200}/>)
    cy.get('.wrapper').hasDimensions(300, 200)
  })

  it('string values', () => {
    cy.mount(<VisualWrapper {...sharedProps }
      width={'300'}
      height={'200'}/>)
    cy.get('.wrapper').hasDimensions(300, 200)
  })

  it('percentage values', () => {
    cy.mount(<VisualWrapper {...sharedProps }
      width={'100%'}
      height={'50vh'}/>)
    cy.get('.wrapper').hasDimensions(VW, VH / 2)
  })

})

it('expands', () => {
  cy.mount(<VisualWrapper  {...sharedProps } expand/>)
  cy.get('.wrapper').hasDimensions(VW, VH)
})

it('supports aspect', () => {
  cy.mount(<VisualWrapper  {...sharedProps } aspect={2/1} />)
  cy.get('.wrapper').hasDimensions(VW, VH / 2)
})

it('supports children', () => {
  cy.mount(<VisualWrapper  {...sharedProps }>
    <h1>Hey</h1>
  </VisualWrapper>)
  cy.get('h1').contains('Hey')
})



