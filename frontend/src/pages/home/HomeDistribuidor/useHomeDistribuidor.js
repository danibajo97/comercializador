import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getConveniosAll, getWidgesInfo, stateResetOperation } from 'redux/convenio/convenioSlice'
import OPERATIONS from 'constants/operationsRedux'
import usePaginationServer from 'hooks/usePaginationServer'
import date from 'utils/date'

export default function useHomeDistribuidor () {
  const dispatch = useDispatch()

  const convenios = useSelector(state => state.convenio.convenios)
  const conveniosLimit = useSelector(state => state.convenio.conveniosLimit)
  const isConvenios = useSelector(state => state.convenio.isConvenios)
  const widges = useSelector(state => state.convenio.widges)

  const { pagination, page, limit } = usePaginationServer({ length: conveniosLimit })

  useEffect(() => {
    dispatch(getWidgesInfo())

    return () => {
      dispatch(stateResetOperation())
    }
  }, [])

  useEffect(() => {
    dispatch(getConveniosAll({ pagination: { page, limit } }))
  }, [page])

  const setValueFilter = (value) => {
    const fecha = value?.fecha?.length === 2
      ? `${date.toISODate({ date: value?.fecha[0] })},${date.toISODate({ date: value?.fecha[1] })}`
      : undefined
    dispatch(getConveniosAll({
      pagination: { page: 1, limit },
      extras: {
        contrato__no_contrato__icontains: value?.nroContrato.length > 0 ? value.nroContrato : undefined,
        no_convenio__icontains: value?.nroConvenio.length > 0 ? value.nroConvenio : undefined,
        cliente_final__nombre__icontains: value?.cliente.length > 0 ? value.cliente : undefined,
        fecha_emision__range: fecha,
        estado__idestadooperacion__in: value?.estado?.length ? value.estado.join(',') : undefined,
        cantidad_bd__gte: value?.baseDatos[0],
        cantidad_bd__lte: value?.baseDatos[1]
      }
    }))
  }

  const loading = isConvenios === OPERATIONS.FULFILLED

  return {
    data: convenios,
    loading,
    totalConvenio: widges?.total || 0,
    totalTerminado: widges?.terminado || 0,
    totalEdicion: widges?.edicion || 0,
    pagination,
    setValueFilter
  }
}
