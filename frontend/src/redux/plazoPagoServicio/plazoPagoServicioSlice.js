import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/plazoPagoServicio/plazoPagoServicioAPI'
import OPERATIONS from 'constants/operationsRedux'

const initialState = {
  plazoPagoServicio: [],
  isList: OPERATIONS.NONE,
  isAdd: OPERATIONS.NONE,
  isUpdate: OPERATIONS.NONE,
  isDelete: OPERATIONS.NONE
}

export const plazoPagoServicioSlice = createSlice({
  name: 'plazoPagoServicio',
  initialState,
  reducers: {
    stateResetOperation: (state) => {
      state.isAdd = OPERATIONS.NONE
      state.isUpdate = OPERATIONS.NONE
      state.isDelete = OPERATIONS.NONE
    }
  },
  extraReducers: (builder) => {
    // GET_PLAZOS_PAGOS_SERVICIO_ALL ACCION
    builder.addCase(getPlazoPagoServicioAll.pending, (state, action) => {
      state.isList = OPERATIONS.PENDING
    })
    builder.addCase(getPlazoPagoServicioAll.fulfilled, (state, action) => {
      state.isList = OPERATIONS.FULFILLED
      state.plazoPagoServicio = action.payload
    })
    builder.addCase(getPlazoPagoServicioAll.rejected, (state, action) => {
      state.isList = OPERATIONS.REJECTED
      toast.error(action.error)
    })

    // ADD_PLAZOS_PAGOS_SERVICIO ACCION
    builder.addCase(addPlazoPagoServicio.pending, (state, action) => {
      state.isAdd = OPERATIONS.PENDING
    })
    builder.addCase(addPlazoPagoServicio.fulfilled, (state, action) => {
      state.isAdd = OPERATIONS.FULFILLED
      toast.success(action.payload)
    })
    builder.addCase(addPlazoPagoServicio.rejected, (state, action) => {
      state.isAdd = OPERATIONS.REJECTED
      toast.error(action.error.message)
    })

    // UPDATE_PLAZOS_PAGOS_SERVICIO ACCION
    builder.addCase(updatePlazoPagoServicio.pending, (state, action) => {
      state.isUpdate = OPERATIONS.PENDING
    })
    builder.addCase(updatePlazoPagoServicio.fulfilled, (state, action) => {
      state.isUpdate = OPERATIONS.FULFILLED
      toast.success(action.payload)
    })
    builder.addCase(updatePlazoPagoServicio.rejected, (state, action) => {
      state.isUpdate = OPERATIONS.REJECTED
      toast.error(action.error.message)
    })

    // DELETE_PLAZOS_PAGOS_SERVICIO ACCION
    builder.addCase(deletePlazoPagoServicio.pending, (state, action) => {
      state.isDelete = OPERATIONS.PENDING
    })
    builder.addCase(deletePlazoPagoServicio.fulfilled, (state, action) => {
      state.isDelete = OPERATIONS.FULFILLED
      state.plazoPagoServicio = state.plazoPagoServicio.filter(pps => pps.id !== action.payload.id)
      toast.success(action.payload.message)
    })
    builder.addCase(deletePlazoPagoServicio.rejected, (state, action) => {
      state.isDelete = OPERATIONS.REJECTED
      toast.error(action.error.message)
    })
  }
})

export const getPlazoPagoServicioAll = createAsyncThunk('plazoPagoServicio/getPlazoPagoServicioAll', api.getPlazoPagoServicioAll)
export const addPlazoPagoServicio = createAsyncThunk('plazoPagoServicio/addPlazoPagoServicio', api.addPlazoPagoServicio)
export const updatePlazoPagoServicio = createAsyncThunk('plazoPagoServicio/updatePlazoPagoServicio', api.updatePlazoPagoServicio)
export const deletePlazoPagoServicio = createAsyncThunk('plazoPagoServicio/deletePlazoPagoServicio', api.deletePlazoPagoServicio)

export const { stateResetOperation } = plazoPagoServicioSlice.actions

export default plazoPagoServicioSlice.reducer
