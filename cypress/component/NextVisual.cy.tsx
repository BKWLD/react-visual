import { NextVisual } from '../../src/NextVisual'

describe('<NextVisual />', () => {
  it('renders', () => {
    cy.mount(<NextVisual image='example' width={100} alt='' />)
  })
})
