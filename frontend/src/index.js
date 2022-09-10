import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { CustomProvider } from 'rsuite'
import esES from 'rsuite/locales/es_ES'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import { store } from './redux/store'
import Template from './Template'

import 'bootstrap/dist/css/bootstrap.css'
import 'rsuite/dist/rsuite.min.css'

import 'assets/vendor/fortawesome/fontawesome-free/css/all.min.css'
import 'assets/css/argon-dashboard-react.css'
import 'assets/vendor/nucleo/css/nucleo.css'
import 'assets/vendor/futura/css/futura.css'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <CustomProvider locale={esES}>
        <Template />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </CustomProvider>
    </BrowserRouter>
  </Provider>
)
