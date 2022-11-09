import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default {
  getSolicitudLicenciaAll
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
