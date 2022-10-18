import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default {
  getListaClientesFinales
}

async function getListaClientesFinales ({ convenio }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/api-acceso/usuario_final/lista_clientes_finales/`,
    headers: { Authorization: `Bearer ${access}` },
    params: {
      id_convenio: convenio
    }
  }
  try {
    const { data } = await axios(options)
    return data
  } catch (error) {
    throw new Error('Error al listar los clientes finales.')
  }
}
