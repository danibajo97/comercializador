import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default {
  getSolicitudLicenciaAll,
  addSolicitudLicencia,
  updateSolicitudLicencia,
  deleteSolicitudLicencia,
  getServiciosActualizacion,
  otorgarSolicitudLicencia
}

async function getSolicitudLicenciaAll ({ page = 1 }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/api-acceso/solicitud_licencia/`,
    headers: { Authorization: `Bearer ${access}` },
    params: {
      page
    }
  }
  try {
    const { data } = await axios(options)
    return data.results
  } catch (error) {
    throw new Error('Error al listar las solicitudes de licencias.')
  }
}

async function addSolicitudLicencia ({ params }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'POST',
    url: `${API_URL}/api-acceso/solicitud_licencia/`,
    headers: { Authorization: `Bearer ${access}` },
    data: params
  }
  try {
    await axios(options)
    return 'Se adicionó la solicitud de licencia correctamente.'
  } catch (error) {
    const data = JSON.parse(error.response.data[0])
    throw new Error(data[0])
  }
}

async function updateSolicitudLicencia ({ id, params }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'PUT',
    url: `${API_URL}/api-acceso/solicitud_licencia/${id}/`,
    headers: { Authorization: `Bearer ${access}` },
    data: params
  }
  try {
    await axios(options)
    return 'Se actualizó la solicitud de licencia correctamente.'
  } catch (error) {
    throw new Error('Error al actualizar la solicitud de licencia.')
  }
}

async function deleteSolicitudLicencia ({ id }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'DELETE',
    url: `${API_URL}/api-acceso/solicitud_licencia/${id}/`,
    headers: { Authorization: `Bearer ${access}` }
  }
  try {
    await axios(options)
    return {
      id,
      message: 'Se eliminó la solicitud de licencia correctamente.'
    }
  } catch (error) {
    throw new Error('Error al eliminar la solicitud de licencia.')
  }
}

async function getServiciosActualizacion ({ cliente }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/api-acceso/solicitud_licencia/servicios_actualizacion/`,
    headers: { Authorization: `Bearer ${access}` },
    params: {
      cliente
    }
  }
  try {
    const { data } = await axios(options)
    return data
  } catch (error) {
    throw new Error('Error al listar los servicios.')
  }
}

async function otorgarSolicitudLicencia ({ detalle }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'PUT',
    url: `${API_URL}/api-acceso/solicitud_licencia/otorgar_licencia/`,
    headers: { Authorization: `Bearer ${access}` },
    data: { detalle }
  }
  try {
    await axios(options)
    return true
  } catch (error) {
    throw new Error('Error al otorgar la solicitud de licencia.')
  }
}
