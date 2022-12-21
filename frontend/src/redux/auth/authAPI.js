import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export default {
  getUser,
  login,
  logout,
  changePassword,
  activateAccount,
  verifyPassword
}

async function login ({ username, password }) {
  const options = {
    method: 'POST',
    url: `${API_URL}/api/token/`,
    headers: { 'Content-Type': 'application/json' },
    data: { username, password }
  }
  try {
    const { data } = await axios(options)
    return data
  } catch (error) {
    throw new Error('Credenciales no validas.')
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
    const { comercializador, versat } = response.data
    return {
      ...comercializador,
      distribuidor: versat
    }
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

async function changePassword ({ id, oldPassword, newPassword }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'PUT',
    url: `${API_URL}/cambiar_contrasena/${id}/`,
    headers: { Authorization: `Bearer ${access}` },
    data: {
      old_password: oldPassword,
      new_password: newPassword
    }
  }
  try {
    await axios(options)
    return true
  } catch (error) {
    throw new Error('Error al cambiar la contraseña, asegúrese que la contraseña actual coincida.')
  }
}

async function activateAccount ({ tokenInfo, user }) {
  const { token, uidb } = tokenInfo
  const { username, firstname, lastname, password } = user
  const options = {
    method: 'POST',
    url: `${API_URL}/activacion/${uidb}/${token}/`,
    headers: { 'Content-Type': 'application/json' },
    data: {
      username,
      name: firstname,
      last_name: lastname,
      password
    }
  }
  try {
    await axios(options)
  } catch (error) {
    const message = error?.response?.data?.message
    throw new Error(message || 'Error al activar la cuenta.')
  }
}

async function verifyPassword ({ password }) {
  const access = await window.sessionStorage.getItem('access')
  const options = {
    method: 'POST',
    url: `${API_URL}/usuario-password/`,
    headers: { Authorization: `Bearer ${access}` },
    data: { password }
  }
  try {
    await axios(options)
  } catch (error) {
    throw new Error('La contraseña no es validas.')
  }
}
