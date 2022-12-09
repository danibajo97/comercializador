import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { deletePlazoPagoServicio } from 'redux/plazoPagoServicio/plazoPagoServicioSlice'
import { AsociarServiciosForm } from '../AsociarServiciosForm'
import useAlert from 'hooks/useAlert'
import useModal from 'hooks/useModal'

export default function useActionCell () {
  const dispatch = useDispatch()
  const params = useParams()
  const { id } = params

  const deleteAlert = useAlert({
    type: 'eliminar',
    text: 'Se eliminará el servicio, esta acción no se puede deshacer.',
    isConfirm: true,
    textConfirm: 'Eliminar Servicio'
  })

  const modalServicio = useModal({ title: 'Editar Servicios', size: 'sm' })

  const operationDelete = ({ rowData }) => {
    deleteAlert.setConfirmAccion(() => {
      dispatch(deletePlazoPagoServicio({ id: rowData.id }))
    })
    deleteAlert.openAlert()
  }

  const operationUpdate = ({ rowData }) => {
    modalServicio.addBody(AsociarServiciosForm, {
      convenioId: id,
      plazoPagoId: rowData.plazo,
      servicioAsociado: {
        id: rowData.id,
        servicio: rowData.servicio,
        usuariosfinales: rowData.usuariosfinales,
        cantidad: rowData.cantidad
      }
    })
    modalServicio.openModal()
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
    modalServicio,
    handleSelect
  }
}
