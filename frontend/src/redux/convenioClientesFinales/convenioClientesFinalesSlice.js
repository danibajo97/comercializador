import { createSlice } from '@reduxjs/toolkit'
// import { toast } from 'react-toastify'

// import api from 'redux/convenioClientesFinales/convenioClientesFinalesAPI'

const initialState = {
  loading: false,
  error: null
}

export const convenioClientesFinalesSlice = createSlice({
  name: 'convenio_clientes_finales',
  initialState,
  extraReducers: (builder) => {

  }
})

// export const getBuscarContrato = createAsyncThunk('convenio_datos_generales/getBuscarContrato', api.getBuscarContrato)

export const loading = (state) => state.convenio_datos_generales.loading
export const error = (state) => state.convenio_datos_generales.error

export default convenioClientesFinalesSlice.reducer
