import SanityNextVisual from '../../src'

// Data
import dereferencedImage from '../fixtures/dereferencedImage.json'
const exampleImgAspect = 2830/1857

describe('no asset', () => {

  it('renders nothing when null props', () => {
    cy.mount(<SanityNextVisual
      image={null}
      video={null}
      data-cy='next-visual' />)
    cy.get('[data-cy=next-visual]').should('not.exist')
  })

})

describe('de-referenced image source', () => {

  it.only('calculates many next/image values', () => {
    cy.mount(<SanityNextVisual
      image={ dereferencedImage }
      data-cy='next-visual' />)
    cy.get('[data-cy=next-visual]').should('exist')

  })

})
