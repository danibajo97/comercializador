import React from 'react'
import { Container } from 'reactstrap'
import { Outlet } from 'react-router-dom'

import { Navbar, Footer } from 'components'

const Template = ({ routes }) => {
  return (
    <>
      <Navbar routes={routes} />
      <div className='main-content'>
        <Outlet />
        <Container fluid>
          <Footer />
        </Container>
      </div>
    </>
  )
}

export default Template
