import { configureStore } from '@reduxjs/toolkit'

import authReducer from 'redux/auth/authSlice'

import convenioDatosGeneralesReducer from 'redux/convenioDatosGenerales/convenioDatosGeneralesSlice'
import convenioClientesFinalesReducer from 'redux/convenioClientesFinales/convenioClientesFinalesSlice'
import convenioServiciosContratadosReducer from 'redux/convenioServiciosContratados/convenioServiciosContratadosSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    convenio_datos_generales: convenioDatosGeneralesReducer,
    convenio_clientes_finales: convenioClientesFinalesReducer,
    convenio_servicios_contratados: convenioServiciosContratadosReducer
  }
})
