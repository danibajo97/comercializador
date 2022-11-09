import useAlert from 'hooks/useAlert'
import { useDispatch } from 'react-redux'

import { deleteConvenio, validarConvenio, confirmarConvenio } from 'redux/convenio/convenioSlice'

export default function useConvenioTable () {
  const dispatch = useDispatch()

  const deleteAlert = useAlert({
    type: 'delete',
    text: 'Se eliminará el convenio, esta acción no se puede deshacer.',
    isConfirm: true,
    textConfirm: 'Eliminar Convenio'
  })

  const validAlert = useAlert({
    type: 'valid',
    text: 'Se eliminará el convenio, esta acción no se puede deshacer.',
    isConfirm: true,
    textConfirm: 'Validar Convenio'
  })

  const confirmAlert = useAlert({
    type: 'confirm',
    text: 'Se eliminará el convenio, esta acción no se puede deshacer.',
    isConfirm: true,
    textConfirm: 'Confirmar Convenio'
  })

  const operationDelete = ({ id }) => {
    deleteAlert.setConfirmAccion(() => {
      dispatch(deleteConvenio({ id }))
    })
    deleteAlert.openAlert()
  }

  const operationValidar = ({ id }) => {
    validAlert.setConfirmAccion(() => {
      dispatch(validarConvenio({ id }))
    })
    validAlert.openAlert()
  }

  const operationConfirmar = ({ id }) => {
    confirmAlert.setConfirmAccion(() => {
      dispatch(confirmarConvenio({ id }))
    })
    confirmAlert.openAlert()
  }

  const handleSelect = (eventKey, rowData, onClose, navigate) => {
    onClose()
    switch (eventKey) {
      case 1:
        navigate(`/datos-generales/${rowData.id}`)
        break
      case 2:
        navigate(`/clientes-finales/${rowData.id}`)
        break
      case 3:
        navigate(`/servicios-contratados/${rowData.id}`)
        break
      case 4:
        navigate(`/plazos-pago/${rowData.id}`)
        break
      case 5:
        operationDelete({ id: rowData.id })
        break
      case 6:
        operationValidar({ id: rowData.id })
        break
      case 7:
        operationConfirmar({ id: rowData.id })
        break
    }
  }

  return {
    handleSelect,
    deleteAlert: deleteAlert.alert,
    validAlert: validAlert.alert,
    confirmAlert: confirmAlert.alert
  }
}
