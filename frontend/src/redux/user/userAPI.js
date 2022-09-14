// import axios from 'axios'
// const API_URL = process.env.REACT_APP_API_URL

export default {
  getUser,
  login,
  logout,
}

async function getUser () {
  try {
    return Promise.resolve({
      username: 'comercial',
      firstname: 'Yoelvys',
      lastname: 'Perez Cabrera',
      email: 'yoelvyspc93@gamil.com',
    })
  } catch (error) {
    throw error.message
  }
}

async function login () {
  try {
    return Promise.resolve(true)
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
