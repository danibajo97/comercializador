import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/clientesFinales/clientesFinalesAPI'
import OPERATIONS from 'constants/operationsRedux'

const initialState = {
  listClientesFinales: [],
  isListClientesFinales: OPERATIONS.NONE
}

export const clientesFinalesSlice = createSlice({
  name: 'clientesFinales',
  initialState,
  reducers: {
    stateResetOperation: (state) => {
      state.isListClientesFinales = OPERATIONS.NONE
      state.listClientesFinales = []
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
  }
})

export const getListaClientesFinales = createAsyncThunk('clientesFinales/getListaClientesFinales', api.getListaClientesFinales)

export const { stateResetOperation } = clientesFinalesSlice.actions

export default clientesFinalesSlice.reducer
