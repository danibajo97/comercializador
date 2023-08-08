import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/datosGenerales/datosGeneralesAPI'
import OPERATIONS from 'constants/operationsRedux'

const initialState = {
  isContanto: OPERATIONS.NONE,
  contrato: null,
  clientesFinales: [],
  isClienteFinal: OPERATIONS.NONE,
  personasAsociadas: [],
  listPersonasAsociadas: OPERATIONS.NONE,
  isAddContacto: OPERATIONS.NONE
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
      state.personasAsociadas = []
      state.listPersonasAsociadas = OPERATIONS.NONE
    },
    stateResetOperationAddContacto: (state) => {
      state.isAddContacto = OPERATIONS.NONE
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

    // GET_PERSONAS_ASOCIADAS ACCION
    builder.addCase(getPersonasAsociadas.pending, (state, action) => {
      state.listPersonasAsociadas = OPERATIONS.PENDING
    })
    builder.addCase(getPersonasAsociadas.fulfilled, (state, action) => {
      state.personasAsociadas = action.payload
      state.listPersonasAsociadas = OPERATIONS.FULFILLED
    })
    builder.addCase(getPersonasAsociadas.rejected, (state, action) => {
      state.personasAsociadas = []
      state.listPersonasAsociadas = OPERATIONS.REJECTED
    })

    // ADD_CONTACTO ACCION
    builder.addCase(addContacto.pending, (state, action) => {
      state.isAddContacto = OPERATIONS.PENDING
    })
    builder.addCase(addContacto.fulfilled, (state, action) => {
      const payload = action.payload
      state.isAddContacto = OPERATIONS.FULFILLED
      const dataStr = payload.data.join('')
      const dataObj = JSON.parse(dataStr)
      state.clientesFinales.push({
        ...dataObj,
        nuevo: true
      })
      toast.success(payload.message)
    })
    builder.addCase(addContacto.rejected, (state, action) => {
      state.isAddContacto = OPERATIONS.REJECTED
      toast.error(action.error.message)
    })
  }
})

export const getBuscarContrato = createAsyncThunk('datosGenerales/getBuscarContrato', api.getBuscarContrato)
export const getClientesFinales = createAsyncThunk('datosGenerales/getClientesFinales', api.getClientesFinales)
export const getPersonasAsociadas = createAsyncThunk('datosGenerales/getPersonasAsociadas', api.getPersonasAsociadas)
export const addContacto = createAsyncThunk('datosGenerales/addContacto', api.addContacto)

export const { stateResetOperation, stateResetOperationAddContacto } = datosGeneralesSlice.actions

export default datosGeneralesSlice.reducer
