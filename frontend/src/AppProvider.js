import React from 'react'
import { Provider } from 'react-redux'
import { CustomProvider } from 'rsuite'
import esES from 'rsuite/locales/es_ES'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { store } from './redux/store'

export default function AppProvider ({ children }) {
  return (
    <Provider store={store}>
      <CustomProvider locale={esES}>
        <BrowserRouter>
          {children}
          <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </BrowserRouter>
      </CustomProvider>
    </Provider>
  )
}
