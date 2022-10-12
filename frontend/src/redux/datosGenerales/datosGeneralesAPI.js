import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default {
  getBuscarContrato,
  getClientesFinales
}

async function getBuscarContrato ({ contrato }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/api-acceso/contrato/buscar_contrato/`,
    headers: { Authorization: `Bearer ${access}` },
    params: {
      contrato
    }
  }
  try {
    const response = await axios(options)
    return response.data
  } catch (error) {
    throw new Error('Error al buscar contrato.')
  }
}

async function getClientesFinales () {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/api-acceso/contrato/cliente_final/`,
    headers: { Authorization: `Bearer ${access}` }
  }
  try {
    const response = await axios(options)
    return response.data
  } catch (error) {
    throw new Error('Error al listar los cliente finales.')
  }
}
