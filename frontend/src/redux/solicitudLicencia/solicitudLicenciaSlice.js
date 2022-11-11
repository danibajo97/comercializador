import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/solicitudLicencia/solicitudLicenciaAPI'
import OPERATIONS from 'constants/operationsRedux'

const initialState = {
  solicitudLicencias: [],
  isList: OPERATIONS.NONE
}

export const solicitudLicenciaSlice = createSlice({
  name: 'solicitudLicencia',
  initialState,
  reducers: {
    stateResetOperation: (state) => {
      state.isList = OPERATIONS.NONE
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
  }
})

export const getSolicitudLicenciaAll = createAsyncThunk('solicitudLicencia/getSolicitudLicenciaAll', api.getSolicitudLicenciaAll)

export const { stateResetOperation } = solicitudLicenciaSlice.actions

export default solicitudLicenciaSlice.reducer
