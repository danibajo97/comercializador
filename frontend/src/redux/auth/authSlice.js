import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/auth/authAPI'
import OPERATIONS from 'constants/operationsRedux'

const initialState = {
  user: null,
  isAuth: false,
  isLoading: null,
  hasError: false,
  isChangePassword: OPERATIONS.NONE,
  isActivateAccount: OPERATIONS.NONE,
  isVerifyPassword: OPERATIONS.NONE,
  hasPassword: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    stateResetChangePassword: (state) => {
      state.isChangePassword = OPERATIONS.NONE
    },
    stateResetActivateAccount: (state) => {
      state.isActivateAccount = OPERATIONS.NONE
    },
    stateVerifyPassword: (state) => {
      state.isVerifyPassword = OPERATIONS.NONE
      state.hasPassword = false
    }
  },
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

    // CHANGE_PASSWORD ACCION
    builder.addCase(changePassword.pending, (state, action) => {
      state.isChangePassword = OPERATIONS.PENDING
    })
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.isChangePassword = OPERATIONS.FULFILLED
      toast.success('La contraseña se ha cambiado correctamente.')
    })
    builder.addCase(changePassword.rejected, (state, action) => {
      state.isChangePassword = OPERATIONS.REJECTED
      toast.error(action.error.message)
    })

    // ACTIVATE ACCOUNT ACCION
    builder.addCase(activateAccount.pending, (state, action) => {
      state.isActivateAccount = OPERATIONS.PENDING
    })
    builder.addCase(activateAccount.fulfilled, (state, action) => {
      state.isActivateAccount = OPERATIONS.FULFILLED
      toast.success('La cuenta se ha activado correctamente.')
    })
    builder.addCase(activateAccount.rejected, (state, action) => {
      state.isActivateAccount = OPERATIONS.REJECTED
      toast.error(action.error.message)
    })

    // VERIFY PASSWORD ACCION
    builder.addCase(verifyPassword.pending, (state, action) => {
      state.isVerifyPassword = OPERATIONS.PENDING
    })
    builder.addCase(verifyPassword.fulfilled, (state, action) => {
      state.isVerifyPassword = OPERATIONS.FULFILLED
      state.hasPassword = true
    })
    builder.addCase(verifyPassword.rejected, (state, action) => {
      state.isVerifyPassword = OPERATIONS.REJECTED
      state.hasPassword = false
      toast.error(action.error.message)
    })
  }
})

export const getUser = createAsyncThunk('auth/getUser', api.getUser)
export const login = createAsyncThunk('auth/login', api.login)
export const logout = createAsyncThunk('auth/logout', api.logout)
export const changePassword = createAsyncThunk('auth/changePassword', api.changePassword)
export const activateAccount = createAsyncThunk('auth/activateAccount', api.activateAccount)
export const verifyPassword = createAsyncThunk('auth/verifyPassword', api.verifyPassword)

export const { stateResetChangePassword, stateResetActivateAccount, stateVerifyPassword } = authSlice.actions

export default authSlice.reducer
