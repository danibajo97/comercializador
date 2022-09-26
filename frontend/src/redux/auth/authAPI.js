import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export default {
  getUser,
  login,
  logout
}

async function getUser () {
  try {
    return Promise.resolve({
      username: 'comercial',
      firstname: 'Yoelvys',
      lastname: 'Perez Cabrera',
      email: 'yoelvyspc93@gamil.com'
    })
  } catch (error) {
    throw error.message
  }
}

async function login ({ username, password }) {
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({
    username,
    password
  })

  try {
    const response = await axios.post(`${API_URL}/api/token/`, body, config)
    return await response.data
  } catch (error) {
    throw error.message
  }
}

async function logout () {
  try {
    return Promise.resolve(true)
  } catch (error) {
    throw error.message
  }
}
