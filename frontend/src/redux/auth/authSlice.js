import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/auth/authAPI'

const initialState = {
  user: null,
  isAuth: false,
  loading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.isAuth = state.user !== null
      state.loading = false
      window.localStorage.setItem('access', action.payload.token)
      window.localStorage.setItem('refresh', action.payload.refresh_token)
    })
    builder.addCase(login.rejected, (state, action) => {
      state.user = null
      state.isAuth = false
      state.loading = false
      window.localStorage.removeItem('access')
      window.localStorage.removeItem('refresh')
      toast.error(action.error.message)
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.isAuth = state.user !== null
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.user = null
      state.isAuth = false
      state.loading = false
      window.localStorage.removeItem('access')
      window.localStorage.removeItem('refresh')
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null
      state.isAuth = false
      state.loading = false
      window.localStorage.removeItem('access')
      window.localStorage.removeItem('refresh')
    })
  }

})

export const getUser = createAsyncThunk('auth/getUser', api.getUser)
export const login = createAsyncThunk('auth/login', api.login)
export const logout = createAsyncThunk('auth/logout', api.logout)

export default authSlice.reducer
