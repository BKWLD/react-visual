import { NextVisual } from '../../src/NextVisual'

// Viewport sizes
const VW = 500, VH = 500

describe('no asset', () => {

  it('renders nothing', () => {
    cy.mount(<NextVisual
      width={300}
      height={200}
      alt=''
      data-cy='next-visual' />)
    cy.get('[data-cy=next-visual]').should('not.exist')
  })

})

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
    cy.get('video').isPlaying()
  })

  it('renders image & video', () => {
    cy.mount(<NextVisual
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

describe('expanding', () => {

  it('renders image', () => {
    cy.mount(<NextVisual
      image='https://placehold.co/300x200'
      expand
      alt=''/>)
    cy.get('img').hasDimensions(VW, VH)
  })

  it('renders video', () => {
    cy.mount(<NextVisual
      video='https://placehold.co/300x200.mp4'
      expand
      alt='' />)
    cy.get('video').hasDimensions(VW, VH)
    cy.get('video').isPlaying()
  })

  it('renders image & video', () => {
    cy.mount(<NextVisual
      image='https://placehold.co/300x200/black/white'
      video='https://placehold.co/300x200.mp4'
      expand
      alt=''
      data-cy='next-visual' />)
    cy.get('[data-cy=next-visual]').hasDimensions(VW, VH)
    cy.get('img').hasDimensions(VW, VH)
    cy.get('video').hasDimensions(VW, VH)
    cy.get('video').isPlaying()
  })
})

describe('aspect ratio', () => {

  it('renders image', () => {
    cy.mount(<NextVisual
      image='https://placehold.co/300x150'
      aspect={300/150}
      alt='' />)
    cy.get('img').hasDimensions(VW, VW / 2)
  })

  it('renders video', () => {
    cy.mount(<NextVisual
      video='https://placehold.co/300x150.mp4'
      aspect={300/150}
      alt=''/>)
    cy.get('video').hasDimensions(VW, VW / 2)
    cy.get('video').isPlaying()
  })

  it('renders image & video', () => {
    cy.mount(<NextVisual
      image='https://placehold.co/300x150/black/white'
      video='https://placehold.co/300x150.mp4'
      aspect={300/150}
      alt=''
      data-cy='next-visual' />)
    cy.get('[data-cy=next-visual]').hasDimensions(VW, VW / 2)
    cy.get('img').hasDimensions(VW, VW / 2)
    cy.get('video').hasDimensions(VW, VW / 2)
    cy.get('video').isPlaying()
  })

})

describe('complex layouts', () => {

  it('supports aspect with width', () => {
    cy.mount(<NextVisual
      image='https://placehold.co/300x150'
      aspect={300/150}
      width={150}
      alt='' />)
    cy.get('img').hasDimensions(150, 75)
  })

  it('supports aspect with height', () => {
    cy.mount(<NextVisual
      image='https://placehold.co/300x150'
      aspect={300/150}
      height={75}
      alt='' />)
    cy.get('img').hasDimensions(150, 75)
  })

  it('doesnt exceed the viewport width', () => {
    cy.mount(<NextVisual
      image='https://placehold.co/300x150'
      aspect={300/150}
      width={VW + 10}
      alt='' />)
    cy.get('img').hasDimensions(VW, VW / 2)
  })

})
