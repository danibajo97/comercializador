import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/convenio/convenioAPI'
import OPERATIONS from 'constants/operationsRedux'

const initialState = {
  convenio: null,
  convenios: [],
  conveniosLimit: 0,
  isConvenios: OPERATIONS.NONE,
  isAdd: OPERATIONS.NONE,
  isUpdate: OPERATIONS.NONE,
  isDelete: OPERATIONS.NONE,
  isListServicios: OPERATIONS.NONE,
  isRetrieve: OPERATIONS.NONE,
  isValidar: OPERATIONS.NONE,
  isConfirmar: OPERATIONS.NONE,
  listadoServicios: [],
  widges: {}
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
      state.isRetrieve = OPERATIONS.NONE
      state.isValidar = OPERATIONS.NONE
      state.isConfirmar = OPERATIONS.NONE
      state.convenios = []
      state.conveniosLimit = 0
      state.convenio = null
      state.widges = {}
    }
  },
  extraReducers: (builder) => {
    // GET_CONVENIO_ALL ACCION
    builder.addCase(getConveniosAll.pending, (state, action) => {
      state.isConvenios = OPERATIONS.PENDING
      state.convenios = []
      state.conveniosLimit = 0
    })
    builder.addCase(getConveniosAll.fulfilled, (state, action) => {
      const data = action.payload
      state.convenios = data?.results
      state.conveniosLimit = data?.count
      state.isConvenios = OPERATIONS.FULFILLED
    })
    builder.addCase(getConveniosAll.rejected, (state, action) => {
      state.convenios = []
      state.conveniosLimit = 0
      state.isConvenios = OPERATIONS.REJECTED
      toast.error(action.error)
    })

    // RETRIEVE_CONVENIO ACCION
    builder.addCase(retrieveConvenio.pending, (state, action) => {
      state.isRetrieve = OPERATIONS.PENDING
    })
    builder.addCase(retrieveConvenio.fulfilled, (state, action) => {
      state.convenio = action.payload
      state.isRetrieve = OPERATIONS.FULFILLED
    })
    builder.addCase(retrieveConvenio.rejected, (state, action) => {
      state.convenio = null
      state.isRetrieve = OPERATIONS.REJECTED
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

    // VALIDAR_CONVENIO ACCION
    builder.addCase(validarConvenio.pending, (state, action) => {
      state.isValidar = OPERATIONS.PENDING
    })
    builder.addCase(validarConvenio.fulfilled, (state, action) => {
      state.isValidar = OPERATIONS.FULFILLED
      toast.success(action.payload.message)
      state.convenios = state.convenios.map(convenio => {
        const c = { ...convenio }
        if (convenio.id === action.payload.id) {
          c.estado = 2
          c.estado_display = 'Validado'
        }
        return c
      })
    })
    builder.addCase(validarConvenio.rejected, (state, action) => {
      state.isValidar = OPERATIONS.FULFILLED
      toast.error(action.error.message)
    })

    // CONFIRMAR_CONVENIO ACCION
    builder.addCase(confirmarConvenio.pending, (state, action) => {
      state.isConfirmar = OPERATIONS.PENDING
    })
    builder.addCase(confirmarConvenio.fulfilled, (state, action) => {
      state.isConfirmar = OPERATIONS.FULFILLED
      toast.success(action.payload.message)
      state.convenios = state.convenios.map(convenio => {
        const c = { ...convenio }
        if (convenio.id === action.payload.id) {
          c.estado = 3
          c.estado_display = 'Confirmado'
        }
        return c
      })
    })
    builder.addCase(confirmarConvenio.rejected, (state, action) => {
      state.isConfirmar = OPERATIONS.FULFILLED
      toast.error(action.error.message)
    })

    // GET_WIDGES_INFO ACCION
    builder.addCase(getWidgesInfo.fulfilled, (state, action) => {
      state.widges = action.payload
    })
    builder.addCase(getWidgesInfo.rejected, (state, action) => {
      state.widges = {}
    })
  }
})

export const getConveniosAll = createAsyncThunk('convenio/getConveniosAll', api.getConveniosAll)
export const retrieveConvenio = createAsyncThunk('convenio/retrieveConvenio', api.retrieveConvenio)
export const addConvenio = createAsyncThunk('convenio/addConvenio', api.addConvenio)
export const updateConvenio = createAsyncThunk('convenio/updateConvenio', api.updateConvenio)
export const deleteConvenio = createAsyncThunk('convenio/deleteConvenio', api.deleteConvenio)
export const validarConvenio = createAsyncThunk('convenio/validarConvenio', api.validarConvenio)
export const confirmarConvenio = createAsyncThunk('convenio/confirmarConvenio', api.confirmarConvenio)
export const getWidgesInfo = createAsyncThunk('convenio/getWidgesInfo', api.getWidgesInfo)

export const getListadoServicios = createAsyncThunk('convenio/getListadoServicios', api.getListadoServicios)

export const { stateResetOperation } = convenioSlice.actions

export default convenioSlice.reducer
