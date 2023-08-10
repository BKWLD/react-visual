import SanityNextVisual from '../../src'

// Fixture data
import dereferencedImage from '../fixtures/dereferencedImage.json'
import dereferencedVideo from '../fixtures/dereferencedVideo.json'
import dereferencedVisual from '../fixtures/dereferencedVisual.json'
import referentialImage from '../fixtures/referentialImage.json'
import referentialVideo from '../fixtures/referentialVideo.json'
import referentialVisual from '../fixtures/referentialVisual.json'

// Viewport sizes
const VW = Cypress.config('viewportWidth'),
  VH = Cypress.config('viewportHeight')

describe('no asset', () => {

  it('renders nothing when null props', () => {
    cy.mount(<SanityNextVisual
      image={null}
      video={null}
      data-cy='next-visual' />)
    cy.get('[data-cy=next-visual]').should('not.exist')
  })

})

describe('de-referenced source', () => {

  it('renders image with infered properties', () => {
    cy.mount(<SanityNextVisual
      image={ dereferencedImage }
      data-cy='next-visual' />)
    cy.get('[data-cy=next-visual]').should('exist')
    cy.get('img').hasDimensions(VW, VW / 2) // Aspect of image is 2/1
    cy.get('img').should('have.attr', 'alt', 'Placeholder test image')
  })

  it('renders video with infered properties', () => {
    cy.mount(<SanityNextVisual
      video={ dereferencedVideo }
      expand
      data-cy='next-visual' />)
    cy.get('[data-cy=next-visual]').should('exist')
    cy.get('video').hasDimensions(VW, VH)
    cy.get('video').should('have.attr', 'aria-label', 'Placeholder test video')
  })

  it('supports combined `visual` prop', () => {
    cy.mount(<SanityNextVisual
      visual={ dereferencedVisual }
      data-cy='next-visual' />)
    cy.get('[data-cy=next-visual]').should('exist')
    cy.get('img').hasDimensions(VW, VW / 2) // Aspect of image is 2/1
    cy.get('video').should('have.attr', 'aria-label', 'Placeholder test visual')
  })

})

describe('referential source', () => {

  it('renders image', () => {
    cy.mount(<SanityNextVisual
      image={ referentialImage }
      width={ 300 }
      height={ 150 }
      alt=''
      data-cy='next-visual' />)
    cy.get('[data-cy=next-visual]').should('exist')
    cy.get('img').hasDimensions(300, 150)
  })

  it('renders video', () => {
    cy.mount(<SanityNextVisual
      video={ referentialVideo }
      expand
      data-cy='next-visual' />)
    cy.get('[data-cy=next-visual]').should('exist')
    cy.get('video').hasDimensions(VW, VH)
    cy.get('video').should('have.attr', 'aria-label', 'Placeholder test video')
  })

  it('renders visual props', () => {
    cy.mount(<SanityNextVisual
      visual={ referentialVisual }
      aspect={ 300 / 150}
      data-cy='next-visual' />)
    cy.get('[data-cy=next-visual]').should('exist')
    cy.get('img').hasDimensions(VW, VW / 2) // Aspect of image is 2/1
    cy.get('video').should('have.attr', 'aria-label', 'Placeholder test visual')
  })

})
