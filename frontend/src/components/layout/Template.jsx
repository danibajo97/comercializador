import React, { useEffect } from 'react'
import { Container } from 'reactstrap'
import { Outlet, useNavigate } from 'react-router-dom'

import { Navbar, Footer } from 'components'
import useAuth from 'hooks/useAuth'

const Template = ({ routes }) => {
  const navigate = useNavigate()
  const { isAuth } = useAuth()

  useEffect(() => {
    if (!isAuth) navigate('/login')
  }, [isAuth])

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
