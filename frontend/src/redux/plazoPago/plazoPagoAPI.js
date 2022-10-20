import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default {
  getPlazoPagoAll
}

async function getPlazoPagoAll ({ convenio }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/api-acceso/plazo_pago/`,
    headers: { Authorization: `Bearer ${access}` },
    params: {
      id_convenio: convenio
    }
  }
  try {
    const { data } = await axios(options)
    return data.results
  } catch (error) {
    throw new Error('Error al listar los plazos de pagos.')
  }
}
