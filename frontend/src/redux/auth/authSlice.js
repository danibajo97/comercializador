import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/auth/authAPI'

const initialState = {
  user: null,
  isAuth: false,
  isLoading: null,
  hasError: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    // LOGIN ACCION
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuth = true
      state.isLoading = false
      state.hasError = false
      window.sessionStorage.setItem('access', action.payload.access)
      window.sessionStorage.setItem('refresh', action.payload.refresh)
    })
    builder.addCase(login.rejected, (state, action) => {
      state.isAuth = false
      state.isLoading = false
      state.hasError = true
      window.sessionStorage.removeItem('access')
      window.sessionStorage.removeItem('refresh')
      toast.error(action.error.message)
    })
    // GET_USER ACCION
    builder.addCase(getUser.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.hasError = false
      state.user = action.payload
      state.isAuth = true
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false
      state.hasError = true
      state.user = null
      state.isAuth = false
      window.sessionStorage.removeItem('access')
      window.sessionStorage.removeItem('refresh')
    })
    // LOGOUT ACCION
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null
      state.isAuth = false
      state.isLoading = false
      window.sessionStorage.removeItem('access')
      window.sessionStorage.removeItem('refresh')
    })
    builder.addCase(logout.rejected, (state, action) => {
      toast.error(action.error.message)
    })
  }

})

export const getUser = createAsyncThunk('auth/getUser', api.getUser)
export const login = createAsyncThunk('auth/login', api.login)
export const logout = createAsyncThunk('auth/logout', api.logout)

export default authSlice.reducer
