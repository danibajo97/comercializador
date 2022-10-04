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
    url: `${API_URL}/api-login/`,
    headers: { 'Content-Type': 'application/json' },
    data: { email, password }
  }

  try {
    const response = await axios(options)
    const data = await response.data
    return data
  } catch (error) {
    throw error?.response?.data?.error
  }
}

async function getUser () {
  try {
    const access = await window.localStorage.getItem('access')
    if (access !== null) {
      return Promise.resolve({
        email: 'yoelvyspc93@gmail.com',
        name: 'Yoelvys Perez Cabrera'
      })
    } else return Promise(null)
  } catch (error) {
    throw error?.response?.data?.error
  }
}

async function logout () {
  const access = await window.localStorage.getItem('access')
  const options = {
    method: 'POST',
    url: `${API_URL}/api-logout/`,
    headers: { Authorization: `JWT ${access}` },
    data: { refresh_token: `${access}` }
  }

  try {
    // const response = await axios(options)
    // console.log({ response })
    return Promise.resolve(true)
  } catch (error) {
    console.log({ error })
    throw error?.message
  }
}
