import { configureStore } from '@reduxjs/toolkit'

import convenioDatosGeneralesReducer from 'redux/convenioDatosGenerales/convenioDatosGeneralesSlice'
import userReducer from 'redux/user/userSlice'

export const store = configureStore({
  reducer: {
    convenio_datos_generales: convenioDatosGeneralesReducer,
    user: userReducer
  }
})
