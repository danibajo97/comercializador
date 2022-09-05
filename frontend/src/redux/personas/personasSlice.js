import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import api from 'redux/personas/personasAPI'

const initialState = {
  personas: [],
  loading: false,
  error: null
}

export const persoansSlice = createSlice({
  name: 'personas',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAll.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.loading = false
      state.personas = action.payload
    })
    builder.addCase(getAll.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export const getAll = createAsyncThunk('personas/getAll', api.getAll)

export const loading = (state) => state.personas.loading
export const personas = (state) => state.personas.personas
export const error = (state) => state.personas.error

export default persoansSlice.reducer
