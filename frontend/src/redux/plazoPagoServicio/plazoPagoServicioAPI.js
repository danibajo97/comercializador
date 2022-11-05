import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default {
  getPlazoPagoServicioAll,
  addPlazoPagoServicio,
  updatePlazoPagoServicio,
  deletePlazoPagoServicio
}

async function getPlazoPagoServicioAll ({ plazoPagoId }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/api-acceso/plazo_pago_servicio/`,
    headers: { Authorization: `Bearer ${access}` },
    params: {
      plazoPagoId
    }
  }
  try {
    const { data } = await axios(options)
    return data.results
  } catch (error) {
    throw new Error('Error al listar los servicios de plazo de pago.')
  }
}

async function addPlazoPagoServicio ({ params }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'POST',
    url: `${API_URL}/api-acceso/plazo_pago_servicio/`,
    headers: { Authorization: `Bearer ${access}` },
    data: params
  }
  try {
    await axios(options)
    return 'Se adicionó el servicio de plazo de pago correctamente.'
  } catch (error) {
    const { message } = error.response.data
    if (message) { throw new Error(message) }
    throw new Error('Error al adicionar el servicio de plazo de pago.')
  }
}

async function updatePlazoPagoServicio ({ id, params }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'PUT',
    url: `${API_URL}/api-acceso/plazo_pago_servicio/${id}/`,
    headers: { Authorization: `Bearer ${access}` },
    data: params
  }
  try {
    await axios(options)
    return 'Se actualizó el servicio de plazo de pago correctamente.'
  } catch (error) {
    throw new Error('Error al actualizar el servicio de plazo de pago.')
  }
}

async function deletePlazoPagoServicio ({ id }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'DELETE',
    url: `${API_URL}/api-acceso/plazo_pago_servicio/${id}/`,
    headers: { Authorization: `Bearer ${access}` }
  }
  try {
    await axios(options)
    return {
      id,
      message: 'Se eliminó el servicio de plazo de pago correctamente.'
    }
  } catch (error) {
    throw new Error('Error al eliminar el servicio de plazo de pago.')
  }
}
