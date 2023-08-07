import React from 'react'
import { NextVisual } from '../../src/NextVisual'

describe('<NextVisual />', () => {
  it('renders', () => {
    cy.mount(<NextVisual image='example' />)
  })
})
