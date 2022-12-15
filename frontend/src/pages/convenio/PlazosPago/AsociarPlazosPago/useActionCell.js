import useAlert from 'hooks/useAlert'
import useModal from 'hooks/useModal'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { deletePlazoPago } from 'redux/plazoPago/plazoPagoSlice'
import { PlazosPagoForm } from '../PlazosPagoForm'

export default function useActionCell () {
  const dispatch = useDispatch()
  const params = useParams()
  const { id } = params

  const modalPlazoPago = useModal({ title: 'Editar Plazos de Pagos', size: 'sm' })

  const deleteAlert = useAlert({
    type: 'eliminar',
    text: 'Se eliminará el plazo de pago, esta acción no se puede deshacer.',
    isConfirm: true,
    textConfirm: 'Eliminar Plazo de Pago'
  })

  const operationDelete = ({ rowData }) => {
    deleteAlert.setConfirmAccion(() => {
      dispatch(deletePlazoPago({ id: rowData.id }))
    })
    deleteAlert.openAlert()
  }

  const operationUpdate = ({ rowData }) => {
    modalPlazoPago.addBody(PlazosPagoForm, {
      convenioId: id,
      plazoPago: {
        id: rowData.id,
        dias: rowData.dias
      }
    })
    modalPlazoPago.openModal()
  }

  const handleSelect = (eventKey, rowData, onClose) => {
    onClose()
    switch (eventKey) {
      case 1:
        operationUpdate({ rowData })
        break
      case 2:
        operationDelete({ rowData })
        break
    }
  }

  return {
    deleteAlert,
    modalPlazoPago,
    handleSelect
  }
}
