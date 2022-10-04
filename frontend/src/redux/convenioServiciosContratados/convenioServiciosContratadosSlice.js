import { createSlice } from '@reduxjs/toolkit'
// import { toast } from 'react-toastify'

// import api from 'redux/convenioDatosGenerales/convenioDatosGeneralesAPI'

const initialState = {
  contrato: {},
  clienteFinal: [],
  facturarseA: [],
  servicioContratado: [],
  loading: false,
  error: null
}

export const convenioServiciosContratadosSlice = createSlice({
  name: 'convenio_servicios_contratados',
  initialState,
  extraReducers: (builder) => {
  }
})

export const loading = (state) => state.convenio_datos_generales.loading
export const error = (state) => state.convenio_datos_generales.error

export default convenioServiciosContratadosSlice.reducer
