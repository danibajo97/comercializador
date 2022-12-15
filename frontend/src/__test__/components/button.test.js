/* global describe it expect beforeEach */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Button from 'components/button/Button'

describe('Button', () => {
  beforeEach(() => {
    render(<Button appearance='primary' icon='user' text='Adicionar' onClick={() => { }} />)
  })

  it('renderizar el componente button', () => {
    const button = screen.getByText('Adicionar')
    expect(button).toBeInTheDocument()
  })
})
