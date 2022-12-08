import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useAuth from 'hooks/useAuth'
import useModal from 'hooks/useModal'
import LicenciaForm from './components/LicenciaForm'
import ROL from 'constants/rol'
import { getSolicitudLicenciaAll, getWidgesInfo, stateResetOperation } from 'redux/solicitudLicencia/solicitudLicenciaSlice'
import usePaginationServer from 'hooks/usePaginationServer'
import date from 'utils/date'

export default function useLicencia () {
  const { user } = useAuth()
  const dispatch = useDispatch()

  const [filterParams, setFilterParams] = useState({})
  const [sortColumn, setSortColumn] = useState('solicitud__fecha')
  const [sortType, setSortType] = useState('desc')

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

  const setValueFilter = (value) => {
    const licencia = value?.licencia?.length === 1 ? value?.licencia[0] : undefined
    const fecha = value?.fecha?.length === 2
      ? `${date.toISODate({ date: value?.fecha[0], days: 0 })},${date.toISODate({ date: value?.fecha[1], days: 0 })}`
      : undefined

    const extras = {
      solicitud__no_solicitud__icontains: value?.nro?.length > 0 ? value.nro : undefined,
      solicitud__fecha__range: fecha,
      solicitud__cliente__contacto__nombre__icontains: value?.cliente.length > 0 ? value.cliente : undefined,
      servicio__in: value?.servicio?.length ? value.servicio.join(',') : undefined,
      licencia__isnull: licencia
    }
    setSortColumn('')
    setSortType('desc')
    setFilterParams(extras)
    dispatch(getSolicitudLicenciaAll({
      pagination: { page: 1, limit },
      extras
    }))
  }

  const onSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn)
    setSortType(sortType)

    const sort = {
      asc: '',
      desc: '-'
    }

    const columns = {
      no_solicitud: 'solicitud__no_solicitud',
      fecha: 'solicitud__fecha',
      // solicitado_por_nombre: 'cliente_final',
      cliente_final_nombre: 'solicitud__cliente',
      servicio_nombre: 'servicio',
      licencia: 'licencia',
      observacion: 'observacion'
    }

    dispatch(getSolicitudLicenciaAll({
      pagination: { page: 1, limit },
      extras: {
        ...filterParams,
        ordering: `${sort[sortType]}${columns[sortColumn]}`
      }
    }))
  }

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
    pagination,
    setValueFilter,
    onSortColumn,
    sortInfo: {
      sortColumn,
      sortType
    }
  }
}
