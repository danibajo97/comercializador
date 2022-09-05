import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default {
  getAll
}

async function getAll () {
  try {
    const response = await axios.get(`${API_URL}/seguridad/persona/`)
    return await response.data.results
  } catch (error) {
    throw error.message
  }
}
