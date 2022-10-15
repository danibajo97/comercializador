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
    url: `${API_URL}/api-acceso/servicio_contratado/`,
    headers: { Authorization: `Bearer ${access}` },
    params: {
      id_convenio: convenio
    }
  }
  try {
    const { data } = await axios(options)
    return data.results
  } catch (error) {
    throw new Error('Error al listar los convenios.')
  }
}

async function addServiciosContratados ({ params }) {
  const access = await window.sessionStorage.getItem('access')
  const options = ({ data }) => {
    return {
      method: 'POST',
      url: `${API_URL}/api-acceso/servicio_contratado/`,
      headers: { Authorization: `Bearer ${access}` },
      data
    }
  }
  try {
    const promiseAll = params.map(data => {
      return new Promise((resolve, reject) => {
        resolve(axios(options({ data })))
      })
    })
    Promise.all(promiseAll)
      .then(() => {
        return 'Se adicionó el servicio correctamente.'
      })
      .catch(() => {
        throw new Error('Error al adicionar el servicio.')
      })
    return 'Se adicionó el servicio correctamente.'
  } catch (error) {
    throw new Error('Error al adicionar el servicio.')
  }
}
