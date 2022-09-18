import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import api from 'redux/user/userAPI'

const initialState = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(getUser.rejected, (state, action) => {
      toast.error(action.error.message)
    })
  }

})

export const getUser = createAsyncThunk('user/getUser', api.getUser)

export default userSlice.reducer
