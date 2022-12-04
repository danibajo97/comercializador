import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default {
  getListaClientesFinales,
  getClientesFinales,
  addClientesFinales,
  getGestionadosPor
}

async function getListaClientesFinales () {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/api-acceso/usuario_final/lista_clientes_finales/`,
    headers: { Authorization: `Bearer ${access}` }
  }
  try {
    const { data } = await axios(options)
    return data
  } catch (error) {
    throw new Error('Error al listar los clientes finales.')
  }
}

async function getClientesFinales ({ convenio }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/api-acceso/usuario_final/`,
    headers: { Authorization: `Bearer ${access}` },
    params: {
      id_convenio: convenio
    }
  }
  try {
    const { data } = await axios(options)
    return data.results
  } catch (error) {
    throw new Error('Error al listar los clientes finales.')
  }
}

async function addClientesFinales ({ convenio, params }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'PUT',
    url: `${API_URL}/api-acceso/usuario_final/aceptar_cliente_final/`,
    headers: { Authorization: `Bearer ${access}` },
    data: {
      negocio: convenio,
      clienteData: params
    }
  }
  try {
    await axios(options)
    return 'Se adicionó los clientes finales.'
  } catch (error) {
    throw new Error('Error al adicionar los clientes finales.')
  }
}

async function getGestionadosPor () {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/api-acceso/usuario_final/gestionados_por/`,
    headers: { Authorization: `Bearer ${access}` }
  }
  try {
    const { data } = await axios(options)
    return data
  } catch (error) {
    throw new Error('Error al listar los clientes finales.')
  }
}
