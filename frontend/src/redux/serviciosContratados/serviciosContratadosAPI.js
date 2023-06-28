import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default {
  getServiciosContratadosAll,
  addServiciosContratados
}

async function getServiciosContratadosAll ({ convenio }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/api-acceso/solicitud_licencia/servicios_venta/`,
    headers: { Authorization: `Bearer ${access}` },
    params: {
      convenio
    }
  }
  try {
    const { data } = await axios(options)
    return data.results
  } catch (error) {
    throw new Error('Error al listar los convenios.')
  }
}

async function addServiciosContratados ({ convenio, params }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'POST',
    url: `${API_URL}/api-acceso/servicio_contratado/crear_o_actualizar/`,
    headers: { Authorization: `Bearer ${access}` },
    data: {
      convenio,
      servicios: params
    }
  }
  try {
    await axios(options)
    return 'Se adicionó el servicio correctamente.'
  } catch (error) {
    throw new Error('Error al adicionar el servicio.')
  }
}
