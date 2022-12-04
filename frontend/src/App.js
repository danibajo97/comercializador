import { useEffect } from 'react'
import { useLocation, Route, Routes } from 'react-router-dom'

import ForgotPassword from 'pages/authentication/ForgotPassword'
import Login from 'pages/authentication/Login'
import ActivateAccount from 'pages/authentication/ActivateAccount'
import Home from 'pages/home/index'
import NotFound from 'pages/other/NotFound'
import Template from 'layout/Template'

import routes from 'routes'

export default function App () {
  const location = useLocation()

  useEffect(() => {
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
        <Route path='activate-account/:uuid/:token' element={<ActivateAccount />} />
        <Route element={<Template routes={routes} />}>
          <Route index element={<Home />} />
          {getRoutes(routes)}
        </Route>
      </Routes>
    </>
  )
}
