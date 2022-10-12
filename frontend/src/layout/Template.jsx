import React, { useEffect } from 'react'
import { Container } from 'reactstrap'
import { Outlet, useNavigate } from 'react-router-dom'

import Footer from 'layout/Footer'
import Navbar from 'layout/Navbar'

import useAuth from 'hooks/useAuth'

const Template = ({ routes }) => {
  const navigate = useNavigate()
  const { isLoading, isAuth, getUser } = useAuth()

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (isLoading === false && !isAuth) navigate('/login')
  }, [isLoading, isAuth])

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
