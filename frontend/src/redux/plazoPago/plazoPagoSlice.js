import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/plazoPago/plazoPagoAPI'
import OPERATIONS from 'constants/operationsRedux'

const initialState = {
  plazosPagos: [],
  isList: OPERATIONS.NONE,
  isAdd: OPERATIONS.NONE,
  isUpdate: OPERATIONS.NONE,
  isDelete: OPERATIONS.NONE
}

export const plazoPagoSlice = createSlice({
  name: 'plazoPago',
  initialState,
  reducers: {
    stateResetOperation: (state) => {
      state.isAdd = OPERATIONS.NONE
      state.isUpdate = OPERATIONS.NONE
      state.isDelete = OPERATIONS.NONE
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

    // ADD_PLAZOS_PAGOS ACCION
    builder.addCase(addPlazoPago.pending, (state, action) => {
      state.isAdd = OPERATIONS.PENDING
    })
    builder.addCase(addPlazoPago.fulfilled, (state, action) => {
      state.isAdd = OPERATIONS.FULFILLED
      toast.success(action.payload)
    })
    builder.addCase(addPlazoPago.rejected, (state, action) => {
      state.isAdd = OPERATIONS.REJECTED
      toast.error(action.error.message)
    })

    // UPDATE_PLAZOS_PAGOS ACCION
    builder.addCase(updatePlazoPago.pending, (state, action) => {
      state.isUpdate = OPERATIONS.PENDING
    })
    builder.addCase(updatePlazoPago.fulfilled, (state, action) => {
      state.isUpdate = OPERATIONS.FULFILLED
      toast.success(action.payload)
    })
    builder.addCase(updatePlazoPago.rejected, (state, action) => {
      state.isUpdate = OPERATIONS.REJECTED
      toast.error(action.error.message)
    })

    // DELETE_PLAZOS_PAGOS ACCION
    builder.addCase(deletePlazoPago.pending, (state, action) => {
      state.isDelete = OPERATIONS.PENDING
    })
    builder.addCase(deletePlazoPago.fulfilled, (state, action) => {
      state.isDelete = OPERATIONS.FULFILLED
      state.plazosPagos = state.plazosPagos.filter(pp => pp.id !== action.payload.id)
      toast.success(action.payload.message)
    })
    builder.addCase(deletePlazoPago.rejected, (state, action) => {
      state.isDelete = OPERATIONS.REJECTED
      toast.error(action.error.message)
    })
  }
})

export const getPlazoPagoAll = createAsyncThunk('plazoPago/getPlazoPagoAll', api.getPlazoPagoAll)
export const addPlazoPago = createAsyncThunk('plazoPago/addPlazoPago', api.addPlazoPago)
export const updatePlazoPago = createAsyncThunk('plazoPago/updatePlazoPago', api.updatePlazoPago)
export const deletePlazoPago = createAsyncThunk('plazoPago/deletePlazoPago', api.deletePlazoPago)

export const { stateResetOperation } = plazoPagoSlice.actions

export default plazoPagoSlice.reducer
