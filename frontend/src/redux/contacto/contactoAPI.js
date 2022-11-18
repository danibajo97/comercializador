import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default {
  getProvincias,
  getMunicipios,
  addContacto
}

async function getProvincias () {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/api-acceso/usuario_final/provincias_municipios/`,
    headers: { Authorization: `Bearer ${access}` }
  }
  try {
    const { data } = await axios(options)
    console.log({ data })
    return data
  } catch (error) {
    throw new Error('Error al listar las provincias.')
  }
}

async function getMunicipios () {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/api-acceso/usuario_final/municipios/`,
    headers: { Authorization: `Bearer ${access}` }
  }
  try {
    const { data } = await axios(options)
    return data
  } catch (error) {
    throw new Error('Error al listar los municipios.')
  }
}

async function addContacto ({ params }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'POST',
    url: `${API_URL}/api-acceso/usuario_final/`,
    headers: { Authorization: `Bearer ${access}` },
    data: params
  }
  try {
    await axios(options)
    return 'Se adicionó el contacto correctamente.'
  } catch (error) {
    throw new Error('Error al adicionar el contacto.')
  }
}
