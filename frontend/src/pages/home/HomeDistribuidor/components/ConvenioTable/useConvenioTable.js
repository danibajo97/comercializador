import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useAlert from 'hooks/useAlert'
import { deleteConvenio, validarConvenio, terminarConvenio, getWidgesInfo } from 'redux/convenio/convenioSlice'
import OPERATIONS from 'constants/operationsRedux'

export default function useConvenioTable () {
  const dispatch = useDispatch()

  const isValidar = useSelector(state => state.convenio.isValidar)
  const isTerminar = useSelector(state => state.convenio.isTerminar)
  const isDelete = useSelector(state => state.convenio.isDelete)

  useEffect(() => {
    if (isValidar === OPERATIONS.FULFILLED || isTerminar === OPERATIONS.FULFILLED || isDelete === OPERATIONS.FULFILLED) {
      dispatch(getWidgesInfo())
    }
  }, [isValidar, isTerminar, isDelete])

  const deleteAlert = useAlert({
    type: 'eliminar',
    text: 'Se eliminará el convenio, esta acción no se puede deshacer.',
    isConfirm: true,
    textConfirm: 'Eliminar Convenio'
  })

  const validAlert = useAlert({
    type: 'validar',
    text: 'Se validará el convenio.',
    isConfirm: true,
    textConfirm: 'Validar Convenio'
  })

  const terminarAlert = useAlert({
    type: 'terminar',
    text: 'Se terminará el convenio.',
    isConfirm: true,
    textConfirm: 'Terminar Convenio'
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

  const operationTerminar = ({ id }) => {
    terminarAlert.setConfirmAccion(() => {
      dispatch(terminarConvenio({ id }))
    })
    terminarAlert.openAlert()
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
        operationTerminar({ id: rowData.id })
        break
    }
  }

  return {
    handleSelect,
    deleteAlert: deleteAlert.alert,
    validAlert: validAlert.alert,
    confirmAlert: terminarAlert.alert
  }
}
