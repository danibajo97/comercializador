import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/serviciosContratados/serviciosContratadosAPI'
import OPERATIONS from 'constants/operationsRedux'

const initialState = {
  serviciosContratados: [],
  isList: OPERATIONS.NONE,
  isAdd: OPERATIONS.NONE
}

export const serviciosContratadosSlice = createSlice({
  name: 'serviciosContratados',
  initialState,
  reducers: {
    stateResetOperation: (state) => {
      state.isList = OPERATIONS.NONE
      state.isAdd = OPERATIONS.NONE
      state.serviciosContratados = []
    }
  },
  extraReducers: (builder) => {
    // ADD_SERVICIO_CONTRATADO ACCION
    builder.addCase(getServiciosContratadosAll.pending, (state, action) => {
      state.isList = OPERATIONS.PENDING
    })
    builder.addCase(getServiciosContratadosAll.fulfilled, (state, action) => {
      state.isList = OPERATIONS.FULFILLED
      state.serviciosContratados = action.payload
    })
    builder.addCase(getServiciosContratadosAll.rejected, (state, action) => {
      state.isList = OPERATIONS.REJECTED
      toast.error(action.error)
    })

    // ADD_SERVICIO_CONTRATADO ACCION
    builder.addCase(addServiciosContratados.pending, (state, action) => {
      state.isAdd = OPERATIONS.PENDING
    })
    builder.addCase(addServiciosContratados.fulfilled, (state, action) => {
      state.isAdd = OPERATIONS.FULFILLED
      toast.success(action.payload)
    })
    builder.addCase(addServiciosContratados.rejected, (state, action) => {
      state.isAdd = OPERATIONS.REJECTED
      toast.error(action?.error?.message)
    })
  }
})

export const getServiciosContratadosAll = createAsyncThunk('serviciosContratados/getServiciosContratadosAll', api.getServiciosContratadosAll)
export const addServiciosContratados = createAsyncThunk('serviciosContratados/addServiciosContratados', api.addServiciosContratados)

export const { stateResetOperation } = serviciosContratadosSlice.actions

export default serviciosContratadosSlice.reducer
