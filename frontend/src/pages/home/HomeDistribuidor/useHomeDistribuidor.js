import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getConveniosAll, getWidgesInfo, stateResetOperation } from 'redux/convenio/convenioSlice'
import OPERATIONS from 'constants/operationsRedux'
import usePaginationServer from 'hooks/usePaginationServer'
import date from 'utils/date'

export default function useHomeDistribuidor () {
  const dispatch = useDispatch()
  const [filterParams, setFilterParams] = useState({})
  const [sortColumn, setSortColumn] = useState('fecha_emision')
  const [sortType, setSortType] = useState('desc')

  const convenios = useSelector(state => state.convenio.convenios)
  const conveniosLimit = useSelector(state => state.convenio.conveniosLimit)
  const isConvenios = useSelector(state => state.convenio.isConvenios)
  const isValidar = useSelector(state => state.convenio.isValidar)
  const isTerminar = useSelector(state => state.convenio.isTerminar)
  const isDelete = useSelector(state => state.convenio.isDelete)
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

  const onSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn)
    setSortType(sortType)

    const sort = {
      asc: '',
      desc: '-'
    }
    const columns = {
      contrato_no: 'contrato__no_contrato',
      no_convenio: 'no_convenio',
      contacto_cliente_final: 'cliente_final',
      fecha_emision: 'fecha_emision',
      estado: 'estado',
      cantidad_bd: 'cantidad_bd'
    }

    dispatch(getConveniosAll({
      pagination: { page: 1, limit },
      extras: {
        ...filterParams,
        ordering: `${sort[sortType]}${columns[sortColumn]}`
      }
    }))
  }

  const setValueFilter = (value) => {
    const fecha = value?.fecha?.length === 2
      ? `${date.toISODate({ date: value?.fecha[0], days: 0 })},${date.toISODate({ date: value?.fecha[1], days: 0 })}`
      : undefined

    const extras = {
      contrato__no_contrato__icontains: value?.nroContrato.length > 0 ? value.nroContrato : undefined,
      no_convenio__icontains: value?.nroConvenio.length > 0 ? value.nroConvenio : undefined,
      cliente_final__nombre__icontains: value?.cliente.length > 0 ? value.cliente : undefined,
      fecha_emision__range: fecha,
      estado__idestadooperacion__in: value?.estado?.length ? value.estado.join(',') : undefined,
      cantidad_bd__gte: value?.baseDatos[0],
      cantidad_bd__lte: value?.baseDatos[1]
    }
    setSortColumn('')
    setSortType('desc')
    setFilterParams(extras)
    dispatch(getConveniosAll({
      pagination: { page: 1, limit },
      extras
    }))
  }

  const loading = isConvenios === OPERATIONS.FULFILLED
  const validando = isValidar === OPERATIONS.PENDING
  const terminando = isTerminar === OPERATIONS.PENDING
  const deleting = isDelete === OPERATIONS.PENDING

  return {
    data: convenios,
    loading,
    validando,
    terminando,
    deleting,
    totalConvenio: widges?.total || 0,
    totalTerminado: widges?.terminado || 0,
    totalEdicion: widges?.edicion || 0,
    pagination,
    setValueFilter,
    onSortColumn,
    sortInfo: {
      sortColumn,
      sortType
    }
  }
}
