import React from 'react'
import { useLocation, Route, Routes } from 'react-router-dom'

import ForgotPassword from 'pages/login/ForgotPassword'
import Login from 'pages/login/Login'
import Home from 'pages/home/index'
import NotFound from 'pages/other/NotFound'
import Template from 'layout/Template'
import ChangePassword from 'pages/login/ChangePassword'

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
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='change-password' element={<ChangePassword />} />
        <Route element={<Template routes={routes} />}>
          <Route index element={<Home />} />
          {getRoutes(routes)}
        </Route>
      </Routes>
    </>
  )
}
