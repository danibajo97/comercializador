export default {
  addUpdateSolicitudLicencia
}

function addUpdateSolicitudLicencia ({ error, method }) {
  const MESSAGE_METHODO = {
    POST: 'Error al adicionar la solicitud de licencia.',
    PUT: 'Error al actualizar la solicitud de licencia.'
  }

  const response = error?.response
  if (response === undefined) {
    throw new Error(MESSAGE_METHODO[method])
  }

  if (response?.status === 400) {
    const data = response?.data
    if (data) {
      const json = JSON.parse(data)
      if (json?.semilla) {
        throw new Error(json.semilla)
      }
      throw new Error(json[0])
    }
  }

  throw new Error(MESSAGE_METHODO[method])
}
