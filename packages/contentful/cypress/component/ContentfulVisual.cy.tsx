import ContentfulVisual from '../../src'

// Viewport sizes
const VW = Cypress.config('viewportWidth'),
  VH = Cypress.config('viewportHeight')

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

describe('fixed size', () => {

  it.only('renders image', () => {
    cy.mount(<ContentfulVisual
      image='https://placehold.co/300x200'
      width={300}
      height={200}
      alt=''/>)
    cy.get('img').hasDimensions(300, 200)
  })

  it('renders video', () => {
    cy.mount(<ContentfulVisual
      video='https://placehold.co/300x200.mp4'
      width={300}
      height={200}
      alt=''/>)
    cy.get('video').hasDimensions(300, 200)
    cy.get('video').isPlaying()
  })

  it('renders image & video', () => {
    cy.mount(<ContentfulVisual
      image='https://placehold.co/300x200/black/white'
      video='https://placehold.co/300x200.mp4'
      width={300}
      height={200}
      alt=''
      data-cy='next-visual' />)
    cy.get('[data-cy=next-visual]').hasDimensions(300, 200)
    cy.get('img').hasDimensions(300, 200)
    cy.get('video').hasDimensions(300, 200)
    cy.get('video').isPlaying()
  })
})
