import React from 'react'

import Template from 'Template'
import AppProvider from 'AppProvider'

import 'bootstrap/dist/css/bootstrap.css'
import 'rsuite/dist/rsuite.min.css'

import 'assets/vendor/fortawesome/fontawesome-free/css/all.min.css'
import 'assets/css/argon-dashboard-react.css'
import 'assets/vendor/nucleo/css/nucleo.css'
import 'assets/vendor/futura/css/futura.css'
import 'react-toastify/dist/ReactToastify.css'

export default function App () {
  return (
    <AppProvider>
      <Template />
    </AppProvider>
  )
}
