import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default {
  getConvenioAll,
  retrieveConvenio,
  addConvenio,
  updateConvenio,
  deleteConvenio
}

async function getConvenioAll ({ page = 1 }) {
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
    const response = await axios(options)
    return response.data
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
    const response = await axios(options)
    return response.data
  } catch (error) {
    throw new Error('Error al buscar el convenio.')
  }
}

async function addConvenio (params) {
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
    return 'Se eliminó el convenio correctamente.'
  } catch (error) {
    throw new Error('Error al eliminar el convenio.')
  }
}
