import ReactVisual from '../../src'

beforeEach(() => {
  cy.clearCache()
})

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
      image='https://placehold.co/600x400'
      width={300}
      height={200}
      alt=''/>)
    cy.get('img').hasDimensions(300, 200)
  })

  it('renders video', () => {
    cy.mount(<ReactVisual
      video='https://placehold.co/600x400.mp4'
      width={300}
      height={200}
      alt=''/>)
    cy.get('video').hasDimensions(300, 200)
    cy.get('video').isPlaying()
    cy.wait(100) // Wait for video play to finish before moving on
  })

  it('renders image & video', () => {
    cy.mount(<ReactVisual
      image='https://placehold.co/600x400/black/white'
      video='https://placehold.co/600x400.mp4'
      width={300}
      height={200}
      alt=''
      data-cy='next-visual' />)
    cy.get('[data-cy=next-visual]').hasDimensions(300, 200)
    cy.get('img').hasDimensions(300, 200)
    cy.get('video').hasDimensions(300, 200)
    cy.get('video').isPlaying()
    cy.wait(100) // Wait for video play to finish before moving on
  })
})

describe('natural size', () => {

  it('renders image', () => {
    cy.mount(<ReactVisual
      image='https://placehold.co/200x200.png'
      alt=''/>)
    cy.get('img').imgLoaded()
    cy.get('img').hasDimensions(200, 200)
  })

})

describe('srcset', () => {

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

    cy.mount(<ReactVisual
      image='https://placehold.co/200x200'
      imageLoader={({ src, width }) => {
        return `https://placehold.co/${width}x${width}`
      }}
      aspect={1}
      width='50%'
      sizes='50vw'
      alt=''/>)

    // Should be half width
    cy.get('img').its('[0].currentSrc')
    .should('eq', 'https://placehold.co/256x256')

  })

})

describe('sources', () => {

  it('supports rendering sources for mimetypes', () => {

    cy.mount(<ReactVisual
      image='https://placehold.co/200x200'
      sourceTypes={['image/webp']}
      imageLoader={({ src, type, width }) => {
        const ext = type?.includes('webp') ? '.webp' : ''
        return `https://placehold.co/${width}x${width}${ext}`
      }}
      aspect={1}
      width='50%'
      sizes='50vw'
      alt=''/>)

    // Should be webp source at reduced width
    cy.get('img').its('[0].currentSrc')
    .should('eq', 'https://placehold.co/256x256.webp')

    // It should also have a fallback source
    cy.get('source:not([type])').should('have.length', 1)

  })

  it('supports rendering sources for mimetypes and media queries', () => {

    // Start at a landscape viewport
    cy.viewport(500, 400)

    cy.mount(<ReactVisual
      image='https://placehold.co/200x200'
      sourceTypes={['image/webp']}
      sourceMedia={['(orientation:landscape)', '(orientation:portrait)']}
      imageLoader={({ src, type, media, width }) => {

        // Use a narrower aspect on landscape and a square on mobile
        const height = media?.includes('landscape') ?
          width * 0.5 : width

        const ext = type?.includes('webp') ? '.webp' : '.jpg'
        return `https://placehold.co/${width}x${height}${ext}`
      }}
      width='100%'
      alt=''/>)

    // Should be landscape source
    cy.get('img').its('[0].currentSrc')
    .should('eq', 'https://placehold.co/640x320.webp')

    // Switch to portrait, which should load the other source
    cy.viewport(500, 600)
    cy.get('img').its('[0].currentSrc')
    .should('eq', 'https://placehold.co/640x640.webp')

    // There should be fallback sources (non-web) for each orientation
    cy.get('source').should('have.length', 4)
    cy.get('source:not([type])').should('have.length', 2)
  })

  it('supports rendering object based sources', () => {

    // Start at a landscape viewport
    cy.viewport(500, 400)

    cy.mount(<ReactVisual
      image={{
        landscape: {
          url: 'https://placehold.co/500x255?text=landscape+image',
          aspect: 2,
        },
        portrait: {
          url: 'https://placehold.co/500x505?text=portrait+image',
          aspect: 1,
        }
      }}
      sourceTypes={['image/webp']}
      sourceMedia={['(orientation: landscape)', '(orientation: portrait)']}
      imageLoader={({ src, type, media, width }) => {

        // Choose the right source
        const asset = media?.includes('landscape') ?
          src.landscape : src.portrait

        // Make the dimensions
        const dimensions = `${width}x${width / asset.aspect}`

        // Choose the right format
        const ext = type?.includes('webp') ? '.webp' : '.jpg'

        // Get text message from src url
        const text = (new URL(asset.url)).searchParams.get('text')
          + `\\n${dimensions}${ext}`

        // Make the url
        return `https://placehold.co/${dimensions}${ext}?text=`+
          encodeURIComponent(text)
      }}
      aspect={({ image, media }) => {
        return media?.includes('landscape') ?
          image.landscape.aspect :
          image.portrait.aspect
      }}
      data-cy='react-visual'
      alt=''/>)

    // Generates a default from the first asset found
    cy.get('img').invoke('attr', 'src')
    .should('contain', 'https://placehold.co/1920x1920')

    // Expect a landscape image
    cy.get('img').its('[0].currentSrc')
    .should('contain', 'https://placehold.co/640x320')
    .should('contain', 'landscape')

    // Check that the aspect is informing the size, not the image size
    cy.get('[data-cy=react-visual]').hasDimensions(500, 250)

    // Switch to portrait, which should load the other source
    cy.viewport(500, 600)
    cy.get('img').its('[0].currentSrc')
    .should('contain', 'https://placehold.co/640x640')
    .should('contain', 'portrait')

    // Check aspect again
    cy.get('[data-cy=react-visual]').hasDimensions(500, 500)

  })

})
