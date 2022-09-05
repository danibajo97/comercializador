import { configureStore } from '@reduxjs/toolkit'

import personasSliceReducer from 'redux/personas/personasSlice'

export const store = configureStore({
  reducer: {
    personas: personasSliceReducer
  }
})
