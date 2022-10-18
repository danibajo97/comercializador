import { configureStore } from '@reduxjs/toolkit'

import authReducer from 'redux/auth/authSlice'

import datosGeneralesReducer from 'redux/datosGenerales/datosGeneralesSlice'
import convenioReducer from 'redux/convenio/convenioSlice'
import serviciosContratadosReducer from 'redux/serviciosContratados/serviciosContratadosSlice'
import clientesFinalesReducer from 'redux/clientesFinales/clientesFinalesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    datosGenerales: datosGeneralesReducer,
    convenio: convenioReducer,
    serviciosContratados: serviciosContratadosReducer,
    clientesFinales: clientesFinalesReducer
  }
})
