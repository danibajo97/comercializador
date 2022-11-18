/* global describe it expect beforeEach */

import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from 'pages/authentication/Login'
import AppProvider from 'AppProvider'

describe('Login', () => {
  beforeEach(() => {
    render(
      <AppProvider>
        <Login />
      </AppProvider>
    )
  })

  it('renderizar la pagina de login', () => {
    const page = screen.getByText('Comercializador - Datazucar')
    expect(page).toBeInTheDocument()
  })
})
