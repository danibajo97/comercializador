import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from './userAPI'

const initialState = {
  users: [],
  loading: false,
  error: null
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAll.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
    })
    builder.addCase(getAll.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export const getAll = createAsyncThunk('users/getAll', api.getAll)

export const loading = (state) => state.users.loading
export const users = (state) => state.users.users
export const error = (state) => state.users.error

export default usersSlice.reducer
