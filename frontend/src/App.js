import React from 'react'
import { useLocation, Route, Routes } from 'react-router-dom'

import ForgotPassword from 'views/login/ForgotPassword'
import Login from 'views/login/Login'
import Register from 'views/login/Register'
import Home from 'views/home/index'
import Template from 'components/layout/Template'
import NotFound from 'views/other/NotFound'
import routes from 'routes'

export default function App () {
  const location = useLocation()

  React.useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
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
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route element={<Template routes={routes} />}>
          <Route index element={<Home />} />
          {getRoutes(routes)}
        </Route>
      </Routes>
    </>
  )
}
