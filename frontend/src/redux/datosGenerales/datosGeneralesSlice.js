import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/datosGenerales/datosGeneralesAPI'
import OPERATIONS from 'constants/operationsRedux'

const initialState = {
  isContanto: OPERATIONS.NONE,
  contrato: null,
  clientesFinales: [],
  isClienteFinal: OPERATIONS.NONE
}

export const datosGeneralesSlice = createSlice({
  name: 'datosGenerales',
  initialState,
  reducers: {
    stateResetOperation: (state) => {
      state.isContanto = OPERATIONS.NONE
      state.contrato = null
      state.clientesFinales = []
      state.isClienteFinal = OPERATIONS.NONE
    }
  },
  extraReducers: (builder) => {
    // GET_BUSCAR_CONTRATO ACCION
    builder.addCase(getBuscarContrato.pending, (state, action) => {
      state.isContanto = OPERATIONS.PENDING
    })
    builder.addCase(getBuscarContrato.fulfilled, (state, action) => {
      state.isContanto = OPERATIONS.FULFILLED
      if (action.payload.contrato !== null) {
        state.contrato = action.payload.contrato
      } else {
        state.contrato = null
        // toast.warning('No existe ese número de contrato.')
      }
    })
    builder.addCase(getBuscarContrato.rejected, (state, action) => {
      state.isContanto = OPERATIONS.REJECTED
    })

    // GET_CLIENTES_FINALES ACCION
    builder.addCase(getClientesFinales.pending, (state, action) => {
      state.isClienteFinal = OPERATIONS.PENDING
    })
    builder.addCase(getClientesFinales.fulfilled, (state, action) => {
      state.clientesFinales = action.payload
      state.isClienteFinal = OPERATIONS.FULFILLED
    })
    builder.addCase(getClientesFinales.rejected, (state, action) => {
      state.clientesFinales = []
      state.isClienteFinal = OPERATIONS.REJECTED
    })
  }
})

export const getBuscarContrato = createAsyncThunk('datosGenerales/getBuscarContrato', api.getBuscarContrato)
export const getClientesFinales = createAsyncThunk('datosGenerales/getClientesFinales', api.getClientesFinales)

export const { stateResetOperation } = datosGeneralesSlice.actions

export default datosGeneralesSlice.reducer
