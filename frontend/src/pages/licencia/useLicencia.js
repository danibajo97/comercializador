import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useAuth from 'hooks/useAuth'
import useModal from 'hooks/useModal'
import LicenciaForm from './components/LicenciaForm'
import ROL from 'constants/rol'
import { getSolicitudLicenciaAll, getWidgesInfo, stateResetOperation } from 'redux/solicitudLicencia/solicitudLicenciaSlice'
import usePaginationServer from 'hooks/usePaginationServer'

export default function useLicencia () {
  const { user } = useAuth()
  const dispatch = useDispatch()

  const { modal, openModal } = useModal({
    title: 'Solicitud de Licencia',
    size: 'sm',
    renderBody: ({ closeModal }) => {
      return <LicenciaForm closeModal={closeModal} />
    }
  })

  const solicitudLicencias = useSelector(state => state.solicitudLicencia.solicitudLicencias)
  const solicitudLicenciasLimit = useSelector(state => state.solicitudLicencia.solicitudLicenciasLimit)
  const isList = useSelector(state => state.solicitudLicencia.isList)
  const widges = useSelector(state => state.solicitudLicencia.widges)

  const { pagination, page, limit } = usePaginationServer({ length: solicitudLicenciasLimit })

  useEffect(() => {
    dispatch(getSolicitudLicenciaAll({ pagination: { page, limit } }))
  }, [page])

  useEffect(() => {
    dispatch(getWidgesInfo())

    return () => {
      dispatch(stateResetOperation())
    }
  }, [])

  const title = () => user?.rol === ROL.CLIENTE ? 'Inicio' : 'Solicitud Licencia'

  return {
    user,
    title,
    modal,
    openModal,
    solicitudLicencias,
    isList,
    totalLicencia: widges?.total || 0,
    totalOtorgada: widges?.otorgada || 0,
    totalPendiente: widges?.pendiente || 0,
    pagination
  }
}
