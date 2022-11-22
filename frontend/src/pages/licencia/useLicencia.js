import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useAuth from 'hooks/useAuth'
import useModal from 'hooks/useModal'
import LicenciaForm from './components/LicenciaForm'
import ROL from 'constants/rol'
import { getSolicitudLicenciaAll, stateResetOperation } from 'redux/solicitudLicencia/solicitudLicenciaSlice'

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
  const isList = useSelector(state => state.solicitudLicencia.isList)

  useEffect(() => {
    dispatch(getSolicitudLicenciaAll({ page: 1 }))

    return () => {
      dispatch(stateResetOperation())
    }
  }, [])

  const title = () => user?.rol === ROL.CLIENTE ? 'Inicio' : 'Solicitud Licencia'

  return { user, title, modal, openModal, solicitudLicencias, isList }
}
