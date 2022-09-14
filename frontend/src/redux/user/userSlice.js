import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from 'redux/user/userAPI'

const initialState = {
  user: null,
  loading: false,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
  }
})

export const getUser = createAsyncThunk('user/getUser', api.getUser)

export const loading = (state) => state.user.loading
export const error = (state) => state.user.error

export const contrato = (state) => state.user.user

export default userSlice.reducer
