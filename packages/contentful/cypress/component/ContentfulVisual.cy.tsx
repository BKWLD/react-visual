import ContentfulVisual from '../../src'
import { imageAsset, videoAsset } from '../fixtures/assets'
import { visualEntry } from '../fixtures/entries'

// Dimensions
const VW = Cypress.config('viewportWidth'),
  VH = Cypress.config('viewportHeight'),
  landscapeAspect = imageAsset.width / imageAsset.height

describe('no asset', () => {

  it('renders nothing', () => {
    cy.mount(<ContentfulVisual
      width={300}
      height={200}
      alt=''
      data-cy='next-visual' />)
    cy.get('[data-cy=next-visual]').should('not.exist')
  })

})

describe('contentful asset props', () => {

  it('renders image', () => {
    cy.mount(<ContentfulVisual image={ imageAsset } />)
    cy.get('img')
      .hasDimensions(VW, VW / landscapeAspect)
      .invoke('attr', 'alt').should('eq', imageAsset.title)
    // Test srcset
    cy.get('img').its('[0].currentSrc').should('contain', 'w=640')
  })

  it('can override inferred props', () => {
    cy.mount(<ContentfulVisual
      image={ imageAsset }
      aspect={ 1 }
      alt='Override' />)
    cy.get('img')
      .hasDimensions(VW, VW)
      .invoke('attr', 'alt').should('eq', 'Override')
  })

  it('renders video', () => {
    cy.mount(<ContentfulVisual video={ videoAsset } aspect={ 16 / 9} />)
    cy.get('video')
      .hasDimensions(VW, VW / (16/9) )
      .invoke('attr', 'aria-label').should('eq', videoAsset.description)
  })

})
