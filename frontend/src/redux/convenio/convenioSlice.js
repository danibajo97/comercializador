import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/convenio/convenioAPI'
import OPERATIONS from 'constants/operationsRedux'

const initialState = {
  convenio: null,
  convenios: [],
  isConvenios: OPERATIONS.NONE,
  isAdd: OPERATIONS.NONE,
  isUpdate: OPERATIONS.NONE,
  isDelete: OPERATIONS.NONE,
  isListServicios: OPERATIONS.NONE,
  listadoServicios: []
}

export const convenioSlice = createSlice({
  name: 'convenio',
  initialState,
  reducers: {
    stateResetOperation: (state) => {
      state.isAdd = OPERATIONS.NONE
      state.isUpdate = OPERATIONS.NONE
      state.isDelete = OPERATIONS.NONE
      state.isListServicios = OPERATIONS.NONE
      state.convenios = []
      state.convenio = null
    }
  },
  extraReducers: (builder) => {
    // GET_CONVENIO_ALL ACCION
    builder.addCase(getConveniosAll.pending, (state, action) => {
      state.isConvenios = OPERATIONS.PENDING
    })
    builder.addCase(getConveniosAll.fulfilled, (state, action) => {
      state.convenios = action.payload
      state.isConvenios = OPERATIONS.FULFILLED
    })
    builder.addCase(getConveniosAll.rejected, (state, action) => {
      state.convenios = []
      state.isConvenios = OPERATIONS.REJECTED
      toast.error(action.error)
    })

    // RETRIEVE_CONVENIO ACCION
    builder.addCase(retrieveConvenio.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(retrieveConvenio.fulfilled, (state, action) => {
      state.convenio = action.payload
      state.isLoading = false
    })
    builder.addCase(retrieveConvenio.rejected, (state, action) => {
      state.convenio = null
      state.isLoading = false
      toast.error(action.error.message)
    })

    // ADD_CONVENIO ACCION
    builder.addCase(addConvenio.pending, (state, action) => {
      state.isAdd = OPERATIONS.PENDING
    })
    builder.addCase(addConvenio.fulfilled, (state, action) => {
      state.isAdd = OPERATIONS.FULFILLED
      toast.success(action.payload)
    })
    builder.addCase(addConvenio.rejected, (state, action) => {
      state.isAdd = OPERATIONS.REJECTED
      toast.error(action.error.message)
    })

    // UPDATE_CONVENIO ACCION
    builder.addCase(updateConvenio.pending, (state, action) => {
      state.isUpdate = OPERATIONS.PENDING
    })
    builder.addCase(updateConvenio.fulfilled, (state, action) => {
      state.isUpdate = OPERATIONS.FULFILLED
      toast.success(action.payload)
    })
    builder.addCase(updateConvenio.rejected, (state, action) => {
      state.isUpdate = OPERATIONS.REJECTED
      toast.error(action.error.message)
    })

    // DELETE_CONVENIO ACCION
    builder.addCase(deleteConvenio.pending, (state, action) => {
      state.isDelete = OPERATIONS.PENDING
    })
    builder.addCase(deleteConvenio.fulfilled, (state, action) => {
      state.isDelete = OPERATIONS.FULFILLED
      toast.success(action.payload.message)
      state.convenios = state.convenios.filter(convenio => convenio.id !== action.payload.id)
    })
    builder.addCase(deleteConvenio.rejected, (state, action) => {
      state.isDelete = OPERATIONS.REJECTED
      toast.error(action.error.message)
    })

    // LISTADO_SERVICIOS ACCION
    builder.addCase(getListadoServicios.pending, (state, action) => {
      state.isListServicios = OPERATIONS.PENDING
    })
    builder.addCase(getListadoServicios.fulfilled, (state, action) => {
      state.isListServicios = OPERATIONS.FULFILLED
      toast.success(action.payload.message)
      state.listadoServicios = action.payload
    })
    builder.addCase(getListadoServicios.rejected, (state, action) => {
      state.isListServicios = OPERATIONS.FULFILLED
      state.listadoServicios = []
      toast.error(action.error.message)
    })
  }
})

export const getConveniosAll = createAsyncThunk('convenio/getConveniosAll', api.getConveniosAll)
export const retrieveConvenio = createAsyncThunk('convenio/retrieveConvenio', api.retrieveConvenio)
export const addConvenio = createAsyncThunk('convenio/addConvenio', api.addConvenio)
export const updateConvenio = createAsyncThunk('convenio/updateConvenio', api.updateConvenio)
export const deleteConvenio = createAsyncThunk('convenio/deleteConvenio', api.deleteConvenio)

export const getListadoServicios = createAsyncThunk('convenio/getListadoServicios', api.getListadoServicios)

export const { stateResetOperation } = convenioSlice.actions

export default convenioSlice.reducer
