import { configureStore } from '@reduxjs/toolkit'

import authReducer from 'redux/auth/authSlice'

import datosGeneralesReducer from 'redux/datosGenerales/datosGeneralesSlice'
import convenioReducer from 'redux/convenio/convenioSlice'
import serviciosContratadosReducer from 'redux/serviciosContratados/serviciosContratadosSlice'
import clientesFinalesReducer from 'redux/clientesFinales/clientesFinalesSlice'
import plazoPagoReducer from 'redux/plazoPago/plazoPagoSlice'
import plazoPagoServicioReducer from 'redux/plazoPagoServicio/plazoPagoServicioSlice'
import solicitudLicenciaReducer from 'redux/solicitudLicencia/solicitudLicenciaSlice'
import contactoReducer from 'redux/contacto/contactoSlice'

export const store = configureStore({
  reducer: {
    /* AUTH REDUCER */
    auth: authReducer,
    /* CONVENIO REDUCER */
    datosGenerales: datosGeneralesReducer,
    convenio: convenioReducer,
    serviciosContratados: serviciosContratadosReducer,
    clientesFinales: clientesFinalesReducer,
    plazoPago: plazoPagoReducer,
    plazoPagoServicio: plazoPagoServicioReducer,
    /* LICENCIA REDUCER */
    solicitudLicencia: solicitudLicenciaReducer,
    /* CONTRATOS */
    contacto: contactoReducer
  }
})
