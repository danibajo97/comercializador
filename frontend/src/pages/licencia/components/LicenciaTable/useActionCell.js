import useAlert from 'hooks/useAlert'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSolicitudLicencia, otorgarSolicitudLicencia, getSolicitudLicenciaAll, stateResetOperation } from 'redux/solicitudLicencia/solicitudLicenciaSlice'
import useModal from 'hooks/useModal'
import LicenciaForm from '../LicenciaForm'
import { CopiarLicencia } from 'components'
import OPERATIONS from 'constants/operationsRedux'
import { useEffect } from 'react'

const PAGINATION_LIMIT = parseInt(process.env.REACT_APP_PAGINATION_LIMIT)

export default function useActionCell ({ rowData }) {
  const isOtorgada = rowData.otorgada
  const isProblemaRegAnterior = rowData.problema_reg_anterior
  const dispatch = useDispatch()

  const isOtorgar = useSelector(state => state.solicitudLicencia.isOtorgar)

  useEffect(() => {
    if (isOtorgar === OPERATIONS.FULFILLED) { dispatch(getSolicitudLicenciaAll({ pagination: { page: 1, limit: PAGINATION_LIMIT } })) }
  }, [isOtorgar])

  useEffect(() => {
    dispatch(stateResetOperation())
  }, [])

  const modalSolicitud = useModal({
    title: 'Solicitud de Licencia',
    size: 'sm',
    renderBody: ({ closeModal }) => {
      return (
        <LicenciaForm
          closeModal={closeModal} solicitudLicencia={{
            ...rowData
          }}
        />
      )
    }
  })

  const modalCopiarLicencia = useModal({
    title: 'Copiar Licencia',
    size: 'xs',
    renderBody: ({ closeModal }) => {
      return (
        <CopiarLicencia closeModal={closeModal} textLicencia={rowData.licencia} />
      )
    }
  })

  const deleteAlert = useAlert({
    type: 'eliminar',
    text: 'Se eliminará la solicitud de licencia, esta acción no se puede deshacer.',
    isConfirm: true,
    textConfirm: 'Eliminar Solicitud'
  })

  const otorgarLicenciaAlert = useAlert({
    type: 'licencia',
    text: 'Se otorgará la licencia, esta acción no se puede deshacer.',
    isConfirm: true,
    textConfirm: 'Otorgar Licencia'
  })

  const operationUpdate = () => {
    modalSolicitud.openModal()
  }

  const operationDelete = () => {
    deleteAlert.setConfirmAccion(() => {
      dispatch(deleteSolicitudLicencia({ id: rowData.id }))
    })
    deleteAlert.openAlert()
  }

  const operationOtorgarLicencia = () => {
    otorgarLicenciaAlert.setConfirmAccion(() => {
      dispatch(otorgarSolicitudLicencia({ detalle: rowData.iddetalle }))
    })
    otorgarLicenciaAlert.openAlert()
  }

  const operationCopiarLicencia = () => {
    modalCopiarLicencia.openModal()
  }

  const handleSelect = ({ eventKey, onClose }) => {
    onClose()
    switch (eventKey) {
      case 1:
        operationUpdate()
        break
      case 2:
        operationDelete()
        break
      case 3:
        operationOtorgarLicencia()
        break
      case 4:
        operationCopiarLicencia()
        break
    }
  }

  return {
    isOtorgada,
    isProblemaRegAnterior,
    modalCopiarLicencia,
    modalSolicitud,
    deleteAlert,
    otorgarLicenciaAlert,
    handleSelect
  }
}
