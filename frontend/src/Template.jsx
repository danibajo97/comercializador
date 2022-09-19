import React from 'react'
import { useLocation, Route, Routes } from 'react-router-dom'
import { Container } from 'reactstrap'

import ForgotPassword from 'views/login/ForgotPassword'
import Login from 'views/login/Login'
import Register from 'views/login/Register'
import NotFound from 'views/NotFound'

import { Navbar, Footer } from 'components'
import routes from './routes'

const Template = (props) => {
  const [headerVisible, setHeaderVisible] = React.useState(true)
  const mainContent = React.useRef(null)
  const location = useLocation()

  React.useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    mainContent.current.scrollTop = 0
  }, [location])

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      return (
        <Route
          path={prop.path}
          element={prop.element}
          key={key}
        />
      )
    })
  }

  return (
    <>
      {headerVisible && <Navbar routes={routes} />}
      <div className='main-content' ref={mainContent}>
        <Routes>
          {getRoutes(routes)}
          {/* Todos los path sin Template */}
          <Route path='/login' element={<Login setHeaderVisible={setHeaderVisible} />} />
          <Route path='/register' element={<Register setHeaderVisible={setHeaderVisible} />} />
          <Route path='/forgot-password' element={<ForgotPassword setHeaderVisible={setHeaderVisible} />} />
          <Route path='*' element={<NotFound setHeaderVisible={setHeaderVisible} />} />
        </Routes>
        {headerVisible &&
          <Container fluid>
            <Footer />
          </Container>}
      </div>
    </>
  )
}

export default Template
