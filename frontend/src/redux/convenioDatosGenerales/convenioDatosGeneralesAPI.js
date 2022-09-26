// import axios from 'axios'
import { buscarContrato, clienteFinal, facturarseA, servicioContratado } from 'constants/mock'

// const API_URL = process.env.REACT_APP_API_URL

export default {
  getBuscarContrato,
  getClienteFinal,
  getFacturarseA,
  getServicioContratado
}

async function getBuscarContrato ({ numero, contacto }) {
  try {
    /* const response = await axios.get(`${API_URL}/cmz/contrato_externo/buscar_contrato/`, {
      params: {
        numero,
        idcontacto: contacto
      }
    })
    console.log({ response });
    const data = await response.data */
    const data = buscarContrato
    if (numero === 'VLS-1' && data.contrato) { return Promise.resolve(data.contrato) } else { return {} }
  } catch (error) {
    throw error.message
  }
}

async function getClienteFinal ({ contacto }) {
  try {
    /* const response = await axios.get(`${API_URL}/cmz/contrato/cliente_final/?idcontacto=${contacto}`)
    console.log({ response });
    const data = await response.data */
    return Promise.resolve(clienteFinal)
  } catch (error) {
    throw error.message
  }
}

async function getFacturarseA ({ contacto }) {
  try {
    /*
    Arreglar API
    const response = await axios.get(`${API_URL}/dtzerp/crm/cliente_controller/get_cliente_grid/`)
    console.log({ response });
    const data = await response.data
    */
    return Promise.resolve(facturarseA)
  } catch (error) {
    throw error.message
  }
}

async function getServicioContratado () {
  try {
    /*
    Arreglar API
    const response = await axios.get(`${API_URL}/dtzerp/crm/cliente_controller/getServicioContratado/`)
    console.log({ response });
    const data = await response.data
    */
    return Promise.resolve(servicioContratado)
  } catch (error) {
    throw error.message
  }
}
