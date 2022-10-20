import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/plazoPago/plazoPagoAPI'
import OPERATIONS from 'constants/operationsRedux'

const initialState = {
  plazosPagos: [],
  isList: OPERATIONS.NONE
}

export const plazoPagoSlice = createSlice({
  name: 'plazoPago',
  initialState,
  reducers: {
    stateResetOperation: (state) => {
      state.isList = OPERATIONS.NONE
      state.plazosPagos = []
    }
  },
  extraReducers: (builder) => {
    // GET_PLAZOS_PAGOS_ALL ACCION
    builder.addCase(getPlazoPagoAll.pending, (state, action) => {
      state.isList = OPERATIONS.PENDING
    })
    builder.addCase(getPlazoPagoAll.fulfilled, (state, action) => {
      state.isList = OPERATIONS.FULFILLED
      state.plazosPagos = action.payload
    })
    builder.addCase(getPlazoPagoAll.rejected, (state, action) => {
      state.isList = OPERATIONS.REJECTED
      toast.error(action.error)
    })
  }
})

export const getPlazoPagoAll = createAsyncThunk('plazoPago/getPlazoPagoAll', api.getPlazoPagoAll)

export const { stateResetOperation } = plazoPagoSlice.actions

export default plazoPagoSlice.reducer
