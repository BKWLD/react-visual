import { NextVisual } from '../../src/NextVisual'

const VIEWPORT_WIDTH = 500,
  VIEWPORT_HEIGHT = 500

describe('fixed size', () => {

  it('renders image', () => {
    cy.mount(<NextVisual
      image='https://placehold.co/300x200'
      width={300}
      height={200}
      alt=''/>)
    cy.get('img').hasDimensions(300, 200)
  })

  it('renders video', () => {
    cy.mount(<NextVisual
      video='https://placehold.co/300x200.mp4'
      width={300}
      height={200}
      alt=''/>)
    cy.get('video').hasDimensions(300, 200)
  })

  it.only('renders image & video', () => {
    cy.mount(<NextVisual
      image='https://placehold.co/300x200/black/white'
      video='https://placehold.co/300x200.mp4'
      width={300}
      height={200}
      alt=''/>)
    cy.get('[data-cy="next-visual"]').hasDimensions(300, 200)
  })
})

describe('expanding', () => {

  it('renders image', () => {
    cy.mount(<NextVisual
      image='https://placehold.co/300x200'
      expand
      alt=''/>)
    cy.get('img').hasDimensions(VIEWPORT_WIDTH, VIEWPORT_HEIGHT)
  })

  it('renders video', () => {
    cy.mount(<NextVisual
      video='https://placehold.co/300x200.mp4'
      expand
      alt='' />)
    cy.get('video').hasDimensions(VIEWPORT_WIDTH, VIEWPORT_HEIGHT)
  })
})

describe('aspect ratio', () => {

  it('renders image', () => {
    cy.mount(<NextVisual
      image='https://placehold.co/300x200'
      aspect={300/150}
      alt='' />)
    cy.get('img').hasDimensions(VIEWPORT_WIDTH, VIEWPORT_WIDTH / 2)
  })

  it('renders video', () => {
    cy.mount(<NextVisual
      video='https://placehold.co/300x200.mp4'
      aspect={300/150}
      alt=''/>)
    cy.get('video').hasDimensions(VIEWPORT_WIDTH, VIEWPORT_WIDTH / 2)
  })

})

