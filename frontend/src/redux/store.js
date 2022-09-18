import { configureStore } from '@reduxjs/toolkit'

import convenioDatosGeneralesReducer from 'redux/convenioDatosGenerales/convenioDatosGeneralesSlice'
import convenioClientesFinalesReducer from 'redux/convenioClientesFinales/convenioClientesFinalesSlice'
import convenioServiciosContratadosReducer from 'redux/convenioServiciosContratados/convenioServiciosContratadosSlice'

import userReducer from 'redux/user/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    convenio_datos_generales: convenioDatosGeneralesReducer,
    convenio_clientes_finales: convenioClientesFinalesReducer,
    convenio_servicios_contratados: convenioServiciosContratadosReducer
  }
})
