import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import api from 'redux/datosGenerales/datosGeneralesAPI'

const initialState = {
  contrato: null,
  clientesFinales: []
}

export const datosGeneralesSlice = createSlice({
  name: 'datosGenerales',
  initialState,
  extraReducers: (builder) => {
    // GET_BUSCAR_CONTRATO ACCION
    builder.addCase(getBuscarContrato.fulfilled, (state, action) => {
      if (action.payload.contrato !== null) {
        state.contrato = action.payload.contrato
      } else {
        state.contrato = null
      }
    })
    // GET_CLIENTES_FINALES ACCION
    builder.addCase(getClientesFinales.fulfilled, (state, action) => {
      state.loading = false
      state.clientesFinales = action.payload
    })
  }
})

export const getBuscarContrato = createAsyncThunk('datosGenerales/getBuscarContrato', api.getBuscarContrato)
export const getClientesFinales = createAsyncThunk('datosGenerales/getClientesFinales', api.getClientesFinales)

export default datosGeneralesSlice.reducer
