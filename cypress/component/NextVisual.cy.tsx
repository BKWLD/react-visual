import { NextVisual } from '../../src/NextVisual'

describe('<NextVisual />', () => {

  it('renders fixed size image', () => {
    cy.mount(<NextVisual
      image='https://placehold.co/300x200'
      width={300}
      height={200}
      alt=''/>)
  })

  it('renders expanding image', () => {
    cy.mount(<NextVisual
      image='https://placehold.co/300x200'
      expand
      alt=''/>)
  })

  it('renders aspect-ratioed image', () => {
    cy.mount(<NextVisual
      image='https://placehold.co/300x200'
      aspect={300/200}
      alt='' />)
  })
})

