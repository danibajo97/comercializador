import React from 'react'
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.css'
import 'rsuite/dist/rsuite.min.css'
import 'react-toastify/dist/ReactToastify.css'

import 'assets/vendor/fortawesome/fontawesome-free/css/all.min.css'
import 'assets/css/argon-dashboard-react.css'
import 'assets/vendor/nucleo/css/nucleo.css'
import 'assets/vendor/futura/css/futura.css'

import reportWebVitals from 'reportWebVitals'
import AppProvider from 'AppProvider'
import App from 'App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <AppProvider>
    <App />
  </AppProvider>
)

reportWebVitals()
