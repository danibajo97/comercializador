import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default {
  getConveniosAll,
  retrieveConvenio,
  addConvenio,
  updateConvenio,
  deleteConvenio,
  getListadoServicios
}

async function getConveniosAll ({ page = 1 }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/api-acceso/convenio/`,
    headers: { Authorization: `Bearer ${access}` },
    params: {
      page
    }
  }
  try {
    const { data } = await axios(options)
    return data.results
  } catch (error) {
    throw new Error('Error al listar los convenios.')
  }
}

async function retrieveConvenio ({ id }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/api-acceso/convenio/${id}/`,
    headers: { Authorization: `Bearer ${access}` }
  }
  try {
    const { data } = await axios(options)
    return data
  } catch (error) {
    throw new Error('Error al buscar el convenio.')
  }
}

async function addConvenio ({ params }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'POST',
    url: `${API_URL}/api-acceso/convenio/`,
    headers: { Authorization: `Bearer ${access}` },
    data: params
  }
  try {
    await axios(options)
    return 'Se adicionó el convenio correctamente.'
  } catch (error) {
    throw new Error('Error al adicionar el convenio.')
  }
}

async function updateConvenio ({ id, params }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'PUT',
    url: `${API_URL}/api-acceso/convenio/${id}/`,
    headers: { Authorization: `Bearer ${access}` },
    data: params
  }
  try {
    await axios(options)
    return 'Se actualizó el convenio correctamente.'
  } catch (error) {
    throw new Error('Error al actualizar el convenio.')
  }
}

async function deleteConvenio ({ id }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'DELETE',
    url: `${API_URL}/api-acceso/convenio/${id}/`,
    headers: { Authorization: `Bearer ${access}` }
  }
  try {
    await axios(options)
    return {
      id,
      message: 'Se eliminó el convenio correctamente.'
    }
  } catch (error) {
    throw new Error('Error al eliminar el convenio.')
  }
}

async function getListadoServicios ({ convenio, plazopago }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/api-acceso/convenio/list_servicios/`,
    headers: { Authorization: `Bearer ${access}` },
    params: {
      id_convenio: convenio,
      id_plazopago: plazopago
    }
  }
  try {
    const { data } = await axios(options)
    return data
  } catch (error) {
    throw new Error('Error al buscar el listado de servicios.')
  }
}
