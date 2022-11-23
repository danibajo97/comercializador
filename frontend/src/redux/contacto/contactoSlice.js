import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/contacto/contactoAPI'
import OPERATIONS from 'constants/operationsRedux'

const initialState = {
  provincias: [],
  isListProvincia: OPERATIONS.NONE,
  municipios: [],
  isListMunicipio: OPERATIONS.NONE,
  isAdd: OPERATIONS.NONE
}

export const contratoSlice = createSlice({
  name: 'contrato',
  initialState,
  reducers: {
    stateResetOperation: (state) => {
      state.provincias = []
      state.isListProvincia = OPERATIONS.NONE
      state.municipios = []
      state.isListMunicipio = OPERATIONS.NONE
      state.isAdd = OPERATIONS.NONE
    }
  },
  extraReducers: (builder) => {
    // GET_LISTA_PROVINCIAS ACCION
    builder.addCase(getProvincias.pending, (state, action) => {
      state.isListProvincia = OPERATIONS.PENDING
    })
    builder.addCase(getProvincias.fulfilled, (state, action) => {
      state.isListProvincia = OPERATIONS.FULFILLED
      state.provincias = action.payload
    })
    builder.addCase(getProvincias.rejected, (state, action) => {
      state.isListProvincia = OPERATIONS.REJECTED
      state.provincias = []
      toast.error(action.error)
    })

    // GET_LISTA_MUNICIPIO ACCION
    builder.addCase(getMunicipios.pending, (state, action) => {
      state.isListMunicipio = OPERATIONS.PENDING
    })
    builder.addCase(getMunicipios.fulfilled, (state, action) => {
      state.isListMunicipio = OPERATIONS.FULFILLED
      state.municipios = action.payload
    })
    builder.addCase(getMunicipios.rejected, (state, action) => {
      state.isListMunicipio = OPERATIONS.REJECTED
      state.municipios = []
      toast.error(action.error)
    })

    // ADD_CONTACTO ACCION
    builder.addCase(addContacto.pending, (state, action) => {
      state.isAdd = OPERATIONS.PENDING
    })
    builder.addCase(addContacto.fulfilled, (state, action) => {
      state.isAdd = OPERATIONS.FULFILLED
      toast.success(action.payload)
    })
    builder.addCase(addContacto.rejected, (state, action) => {
      state.isAdd = OPERATIONS.REJECTED
      toast.error(action.error.message)
    })
  }
})

export const getProvincias = createAsyncThunk('contrato/getProvincias', api.getProvincias)
export const getMunicipios = createAsyncThunk('contrato/getMunicipios', api.getMunicipios)
export const addContacto = createAsyncThunk('contrato/addContacto', api.addContacto)

export const { stateResetOperation } = contratoSlice.actions

export default contratoSlice.reducer
