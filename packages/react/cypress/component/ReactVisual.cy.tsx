import ReactVisual from '../../src'

describe('no asset', () => {

  it('renders nothing', () => {
    cy.mount(<ReactVisual
      width={300}
      height={200}
      alt=''
      data-cy='react-visual' />)
    cy.get('[data-cy=react-visual]').should('not.exist')
  })

})

describe('fixed size', () => {

  it('renders image', () => {
    cy.mount(<ReactVisual
      image='https://placehold.co/300x200'
      width={300}
      height={200}
      alt=''/>)
    cy.get('img').hasDimensions(300, 200)
  })

  it('renders video', () => {
    cy.mount(<ReactVisual
      video='https://placehold.co/300x200.mp4'
      width={300}
      height={200}
      alt=''/>)
    cy.get('video').hasDimensions(300, 200)
    cy.get('video').isPlaying()
  })

  it('renders image & video', () => {
    cy.mount(<ReactVisual
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

describe('sources', () => {

  it.only('renders srset with no sizes prop', () => {

    // Load the image
    cy.mount(<ReactVisual
      image='https://placehold.co/300x200'
      imageLoader={({ src, width }) => {
        const height = Math.round(width * 200 / 300)
        return `https://placehold.co/${width}x${height}`
      }}
      aspect={300/200}
      alt=''/>)

    // Get one of the sizes that should be been rendered
    cy.get('source').invoke('attr', 'srcset')
      .should('contain', 'https://placehold.co/384x256 384w')
  })

})
