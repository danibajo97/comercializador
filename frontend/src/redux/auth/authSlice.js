import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/auth/authAPI'

const initialState = {
  user: null,
  isAuth: false,
  loading: false,
  access: window.localStorage.getItem('access'),
  refresh: window.localStorage.getItem('refresh')
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      /* state.user = action.payload
      state.isAuth = state.user !== null */
    })
    builder.addCase(login.rejected, (state, action) => {
      state.user = null
      state.isAuth = false
      state.loading = false
      state.access = window.localStorage.removeItem('access')
      state.refresh = window.localStorage.removeItem('refresh')
      toast.error(action.error.message)
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.isAuth = state.user !== null
    })
    builder.addCase(getUser.rejected, (state, action) => {
      toast.error(action.error.message)
    })
  }

})

export const getUser = createAsyncThunk('auth/getUser', api.getUser)
export const login = createAsyncThunk('auth/login', api.login)

export default authSlice.reducer
