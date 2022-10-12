import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export default {
  getUser,
  login,
  logout
}

async function login ({ email, password }) {
  const options = {
    method: 'POST',
    url: `${API_URL}/api/token/`,
    headers: { 'Content-Type': 'application/json' },
    data: { email, password }
  }
  try {
    const response = await axios(options)
    return response.data
  } catch (error) {
    throw new Error('Error al listar el usuario autenticado.')
  }
}

async function getUser () {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'GET',
    url: `${API_URL}/usuario-autenticado/`,
    headers: { Authorization: `Bearer ${access}` }
  }
  try {
    const response = await axios(options)
    return response.data
  } catch (error) {
    throw new Error('Error al listar el usuario autenticado.')
  }
}

async function logout () {
  try {
    return Promise.resolve(true)
  } catch (error) {
    throw new Error('Error al cerrar sesion.')
  }
}