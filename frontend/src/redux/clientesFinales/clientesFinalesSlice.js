import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/clientesFinales/clientesFinalesAPI'
import OPERATIONS from 'constants/operationsRedux'

const initialState = {
  listClientesFinales: [],
  clientesFinales: [],
  isListClientesFinales: OPERATIONS.NONE,
  isList: OPERATIONS.NONE,
  isAdd: OPERATIONS.NONE,
  gestionadosPor: [],
  isListGestionadosPor: OPERATIONS.NONE,
  isAddContacto: OPERATIONS.NONE
}

export const clientesFinalesSlice = createSlice({
  name: 'clientesFinales',
  initialState,
  reducers: {
    stateResetOperation: (state) => {
      state.isListClientesFinales = OPERATIONS.NONE
      state.isList = OPERATIONS.NONE
      state.isAdd = OPERATIONS.NONE
      state.listClientesFinales = []
      state.clientesFinales = []
      state.isListGestionadosPor = OPERATIONS.NONE
      state.gestionadosPor = []
    },
    stateResetOperationAddContacto: (state) => {
      state.isAddContacto = OPERATIONS.NONE
    }
  },
  extraReducers: (builder) => {
    // GET_LISTA_CLIENTES_FINALES ACCION
    builder.addCase(getListaClientesFinales.pending, (state, action) => {
      state.isListClientesFinales = OPERATIONS.PENDING
    })
    builder.addCase(getListaClientesFinales.fulfilled, (state, action) => {
      state.isListClientesFinales = OPERATIONS.FULFILLED
      state.listClientesFinales = action.payload
    })
    builder.addCase(getListaClientesFinales.rejected, (state, action) => {
      state.isListClientesFinales = OPERATIONS.REJECTED
      state.listClientesFinales = []
      toast.error(action.error)
    })

    // GET_CLIENTES_FINALES ACCION
    builder.addCase(getClientesFinales.pending, (state, action) => {
      state.isList = OPERATIONS.PENDING
    })
    builder.addCase(getClientesFinales.fulfilled, (state, action) => {
      state.isList = OPERATIONS.FULFILLED
      state.clientesFinales = action.payload
    })
    builder.addCase(getClientesFinales.rejected, (state, action) => {
      state.isList = OPERATIONS.REJECTED
      state.clientesFinales = []
      toast.error(action.error)
    })

    // ADD_CLIENTE_FINALES ACCION
    builder.addCase(addClientesFinales.pending, (state, action) => {
      state.isAdd = OPERATIONS.PENDING
    })
    builder.addCase(addClientesFinales.fulfilled, (state, action) => {
      state.isAdd = OPERATIONS.FULFILLED
      toast.success(action.payload)
    })
    builder.addCase(addClientesFinales.rejected, (state, action) => {
      state.isAdd = OPERATIONS.REJECTED
      toast.error(action.error)
    })

    // GET_GESTIONADOS_POR ACCION
    builder.addCase(getGestionadosPor.pending, (state, action) => {
      state.isListGestionadosPor = OPERATIONS.PENDING
    })
    builder.addCase(getGestionadosPor.fulfilled, (state, action) => {
      state.isListGestionadosPor = OPERATIONS.FULFILLED
      state.gestionadosPor = action.payload
    })
    builder.addCase(getGestionadosPor.rejected, (state, action) => {
      state.isListGestionadosPor = OPERATIONS.REJECTED
      state.gestionadosPor = []
      toast.error(action.error)
    })

    // ADD_CONTACTO ACCION
    builder.addCase(addContacto.pending, (state, action) => {
      state.isAddContacto = OPERATIONS.PENDING
    })
    builder.addCase(addContacto.fulfilled, (state, action) => {
      const payload = action.payload
      state.isAddContacto = OPERATIONS.FULFILLED
      state.listClientesFinales.push({
        ...payload.data,
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

export const getListaClientesFinales = createAsyncThunk('clientesFinales/getListaClientesFinales', api.getListaClientesFinales)
export const getClientesFinales = createAsyncThunk('clientesFinales/getClientesFinales', api.getClientesFinales)
export const addClientesFinales = createAsyncThunk('clientesFinales/addClientesFinales', api.addClientesFinales)
export const getGestionadosPor = createAsyncThunk('clientesFinales/getGestionadosPor', api.getGestionadosPor)
export const addContacto = createAsyncThunk('clientesFinales/addContacto', api.addContacto)

export const { stateResetOperation, stateResetOperationAddContacto } = clientesFinalesSlice.actions

export default clientesFinalesSlice.reducer
