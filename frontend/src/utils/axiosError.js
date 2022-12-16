export default {
  addUpdateSolicitudLicencia
}

function addUpdateSolicitudLicencia ({ error, method }) {
  const MESSAGE_METHODO = {
    POST: 'Error al adicionar la solicitud de licencia.',
    PUT: 'Error al actualizar la solicitud de licencia.'
  }

  let message = ''
  const addMessage = (m) => {
    if (message.length === 0) { message = m }
  }

  const response = error?.response
  if (response === undefined) {
    addMessage(MESSAGE_METHODO[method])
  }
  if (response?.status === 400) {
    if (response?.data?.response) {
      addMessage(response.data.response)
    }
    if (response?.data?.length > 0) {
      response.data.forEach(d => {
        const data = JSON.parse(d)
        if (data?.semilla) { addMessage(data.semilla[0]) }
        if (data.length > 0) addMessage(data[0])
      })
    }
  }

  throw new Error(message.length > 0
    ? message
    : MESSAGE_METHODO[method]
  )
}
