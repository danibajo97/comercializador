import { configureStore } from '@reduxjs/toolkit'

import convenioDatosGeneralesReducer from 'redux/convenioDatosGenerales/convenioDatosGeneralesSlice'

export const store = configureStore({
  reducer: {
    convenio_datos_generales: convenioDatosGeneralesReducer
  }
})
