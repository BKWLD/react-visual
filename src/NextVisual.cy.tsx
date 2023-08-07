import React from 'react'
import { NextVisual } from './NextVisual'

describe('<NextVisual />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NextVisual />)
  })
})