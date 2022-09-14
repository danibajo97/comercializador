import React from 'react'
import { useLocation, Route, Routes } from 'react-router-dom'
import { Container } from 'reactstrap'

import { Sidebar, Navbar, Footer } from './components'

import routes from './routes'

const Template = (props) => {
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
      {/* <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: '/',
          imgSrc: require('./assets/img/brand/icons.png'),
          imgAlt: '...'
        }}
      /> */}
      <Navbar routes={routes} />

      <div className='main-content' ref={mainContent} >
        <Routes>
          {getRoutes(routes)}
        </Routes>
        <Container fluid>
          <Footer />
        </Container>
      </div>
    </>
  )
}

export default Template
