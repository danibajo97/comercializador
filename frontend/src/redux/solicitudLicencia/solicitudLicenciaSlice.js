import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/solicitudLicencia/solicitudLicenciaAPI'
import OPERATIONS from 'constants/operationsRedux'

const initialState = {
  solicitudLicencias: [],
  isList: OPERATIONS.NONE,
  isAdd: OPERATIONS.NONE,
  isUpdate: OPERATIONS.NONE,
  isDelete: OPERATIONS.NONE
}

export const solicitudLicenciaSlice = createSlice({
  name: 'solicitudLicencia',
  initialState,
  reducers: {
    stateResetOperation: (state) => {
      state.isList = OPERATIONS.NONE
      state.isAdd = OPERATIONS.NONE
      state.isUpdate = OPERATIONS.NONE
      state.isDelete = OPERATIONS.NONE
      state.solicitudLicencias = []
    }
  },
  extraReducers: (builder) => {
    // GET_SOLICIDUD_LICENCIA_ALL ACCION
    builder.addCase(getSolicitudLicenciaAll.pending, (state, action) => {
      state.isList = OPERATIONS.PENDING
    })
    builder.addCase(getSolicitudLicenciaAll.fulfilled, (state, action) => {
      state.isList = OPERATIONS.FULFILLED
      state.solicitudLicencias = action.payload
    })
    builder.addCase(getSolicitudLicenciaAll.rejected, (state, action) => {
      state.isList = OPERATIONS.REJECTED
      toast.error(action.error)
    })

    // ADD_SOLICITUD_LICENCIA ACCION
    builder.addCase(addSolicitudLicencia.pending, (state, action) => {
      state.isAdd = OPERATIONS.PENDING
    })
    builder.addCase(addSolicitudLicencia.fulfilled, (state, action) => {
      state.isAdd = OPERATIONS.FULFILLED
      toast.success(action.payload)
    })
    builder.addCase(addSolicitudLicencia.rejected, (state, action) => {
      state.isAdd = OPERATIONS.REJECTED
      toast.error(action.error.message)
    })

    // UPDATE_SOLICITUD_LICENCIA ACCION
    builder.addCase(updateSolicitudLicencia.pending, (state, action) => {
      state.isUpdate = OPERATIONS.PENDING
    })
    builder.addCase(updateSolicitudLicencia.fulfilled, (state, action) => {
      state.isUpdate = OPERATIONS.FULFILLED
      toast.success(action.payload)
    })
    builder.addCase(updateSolicitudLicencia.rejected, (state, action) => {
      state.isUpdate = OPERATIONS.REJECTED
      toast.error(action.error.message)
    })

    // DELETE_SOLICITUD_LICENCIA ACCION
    builder.addCase(deleteSolicitudLicencia.pending, (state, action) => {
      state.isDelete = OPERATIONS.PENDING
    })
    builder.addCase(deleteSolicitudLicencia.fulfilled, (state, action) => {
      state.isDelete = OPERATIONS.FULFILLED
      state.solicitudLicencias = state.solicitudLicencias.filter(sl => sl.id !== action.payload.id)
      toast.success(action.payload.message)
    })
    builder.addCase(deleteSolicitudLicencia.rejected, (state, action) => {
      state.isDelete = OPERATIONS.REJECTED
      toast.error(action.error.message)
    })
  }
})

export const getSolicitudLicenciaAll = createAsyncThunk('solicitudLicencia/getSolicitudLicenciaAll', api.getSolicitudLicenciaAll)
export const addSolicitudLicencia = createAsyncThunk('solicitudLicencia/addSolicitudLicencia', api.addSolicitudLicencia)
export const updateSolicitudLicencia = createAsyncThunk('solicitudLicencia/updateSolicitudLicencia', api.updateSolicitudLicencia)
export const deleteSolicitudLicencia = createAsyncThunk('solicitudLicencia/deleteSolicitudLicencia', api.deleteSolicitudLicencia)

export const { stateResetOperation } = solicitudLicenciaSlice.actions

export default solicitudLicenciaSlice.reducer
