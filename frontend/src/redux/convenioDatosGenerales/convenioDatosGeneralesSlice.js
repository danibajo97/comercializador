import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/convenioDatosGenerales/convenioDatosGeneralesAPI'

const initialState = {
  contrato: {},
  clienteFinal: [],
  facturarseA: [],
  servicioContratado: [],
  loading: false,
  error: null
}

export const convenioDatosGeneralesSlice = createSlice({
  name: 'convenio_datos_generales',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getBuscarContrato.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getBuscarContrato.fulfilled, (state, action) => {
      state.loading = false
      state.contrato = action.payload
    })
    builder.addCase(getBuscarContrato.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
      toast.error(action.error.message)
    })
    builder.addCase(getClienteFinal.fulfilled, (state, action) => {
      state.loading = false
      state.clienteFinal = action.payload
    })
    builder.addCase(getFacturarseA.fulfilled, (state, action) => {
      state.loading = false
      state.facturarseA = action.payload
    })
    builder.addCase(getServicioContratado.fulfilled, (state, action) => {
      state.loading = false
      state.servicioContratado = action.payload
    })
  }
})

export const getBuscarContrato = createAsyncThunk('convenio_datos_generales/getBuscarContrato', api.getBuscarContrato)
export const getClienteFinal = createAsyncThunk('convenio_datos_generales/getClienteFinal', api.getClienteFinal)
export const getFacturarseA = createAsyncThunk('convenio_datos_generales/getFacturarseA', api.getFacturarseA)
export const getServicioContratado = createAsyncThunk('convenio_datos_generales/getServicioContratado', api.getServicioContratado)

export const loading = (state) => state.convenio_datos_generales.loading
export const error = (state) => state.convenio_datos_generales.error

export const contrato = (state) => state.convenio_datos_generales.contrato
export const clienteFinal = (state) => state.convenio_datos_generales.clienteFinal
export const facturarseA = (state) => state.convenio_datos_generales.facturarseA
export const servicioContratado = (state) => state.convenio_datos_generales.servicioContratado

export default convenioDatosGeneralesSlice.reducer
