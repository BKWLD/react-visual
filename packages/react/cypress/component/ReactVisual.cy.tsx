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

  it('renders srset with no sizes prop', () => {

    cy.mount(<ReactVisual
      image='https://placehold.co/300x200'
      imageLoader={({ src, width }) => {
        const height = Math.round(width * 200 / 300)
        return `https://placehold.co/${width}x${height}`
      }}
      aspect={300/200}
      alt=''/>)

    // Get one of the sizes that should be been rendered
    cy.get('[srcset]').invoke('attr', 'srcset')
    .should('contain', '640x427 640w')

    // Only be included when `sizes` specified
    .should('not.contain', ' 16w')
  })

  it('doesn\'t use imageSizes when sizes == 100vw', () => {

    cy.mount(<ReactVisual
      image='https://placehold.co/300x200'
      imageLoader={({ src, width }) => {
        const height = Math.round(width * 200 / 300)
        return `https://placehold.co/${width}x${height}`
      }}
      aspect={300/200}
      sizes='100vw'
      alt=''/>)

    cy.get('[srcset]').invoke('attr', 'srcset')
    .should('not.contain', ' 16w')
  })

  it('it adds narrower widths with sizes prop', () => {

    // Clear the browser cache
    cy.wrap(Cypress.automation('remote:debugger:protocol', {
      command: 'Network.clearBrowserCache',
    }))

    // This is the particular image we expect to load
    cy.intercept('https://placehold.co/256x171').as('50vw image')

    cy.mount(<ReactVisual
      image='https://placehold.co/300x200'
      imageLoader={({ src, width }) => {
        const height = Math.round(width * 200 / 300)
        return `https://placehold.co/${width}x${height}`
      }}
      aspect={300/200}
      width='50%'
      sizes='50vw'
      alt=''/>)

    // The image that should have been loaded
    cy.get('[srcset]').invoke('attr', 'srcset')
    .should('contain', 'https://placehold.co/256x171 256w')

    // Ensure that we didn't load too big or small of an image
    cy.wait('@50vw image')

  })

})
