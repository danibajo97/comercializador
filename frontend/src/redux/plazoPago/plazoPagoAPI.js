import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default {
  getPlazoPagoAll,
  addPlazoPago,
  updatePlazoPago,
  deletePlazoPago
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

async function addPlazoPago ({ params }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'POST',
    url: `${API_URL}/api-acceso/plazo_pago/`,
    headers: { Authorization: `Bearer ${access}` },
    data: params
  }
  try {
    await axios(options)
    return 'Se adicionó el plazo de pago correctamente.'
  } catch (error) {
    throw new Error('Error al adicionar el plazo de pago.')
  }
}

async function updatePlazoPago ({ id, params }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'PUT',
    url: `${API_URL}/api-acceso/plazo_pago/${id}/`,
    headers: { Authorization: `Bearer ${access}` },
    data: params
  }
  try {
    await axios(options)
    return 'Se actualizó el plazo de pago correctamente.'
  } catch (error) {
    throw new Error('Error al actualizar el plazo de pago.')
  }
}

async function deletePlazoPago ({ id }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'DELETE',
    url: `${API_URL}/api-acceso/plazo_pago/${id}/`,
    headers: { Authorization: `Bearer ${access}` }
  }
  try {
    await axios(options)
    return {
      id,
      message: 'Se eliminó el plazo de pago correctamente.'
    }
  } catch (error) {
    throw new Error('Error al eliminar el plazo de pago.')
  }
}
