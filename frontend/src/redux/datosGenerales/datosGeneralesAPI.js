import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default {
  getBuscarContrato,
  getClientesFinales,
  getPersonasAsociadas,
  addContacto
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

async function getPersonasAsociadas ({ convenio = null, cliente = null }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/api-acceso/usuario_final/lista_personas_asociadas/`,
    headers: { Authorization: `Bearer ${access}` },
    params: {
      convenio,
      cliente
    }
  }
  try {
    const { data } = await axios(options)
    return data.response
  } catch (error) {
    throw new Error('Error al listar las personas osociadas.')
  }
}

async function addContacto ({ params }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'POST',
    url: `${API_URL}/api-acceso/contacto_externo/`,
    headers: { Authorization: `Bearer ${access}` },
    data: params
  }
  try {
    const { data } = await axios(options)
    return {
      data: data.versat_response,
      message: 'Se adicionó el contacto correctamente.'
    }
  } catch (error) {
    throw new Error('Error al adicionar el contacto.')
  }
}
