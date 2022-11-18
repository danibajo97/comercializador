import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getConveniosAll, getWidgesInfo, stateResetOperation } from 'redux/convenio/convenioSlice'
import estadosConvenios from 'constants/estadosConvenios'
import OPERATIONS from 'constants/operationsRedux'
import usePaginationServer from 'hooks/usePaginationServer'

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

  const estadoData = estadosConvenios.map(item => {
    if (item.visible) { return { label: item.text, value: item.id } } else { return undefined }
  }).filter(item => item !== undefined)

  const onSelectEstado = (value) => {
    dispatch(getConveniosAll({
      pagination: { page: 1, limit },
      extras: {
        estado__idestadooperacion__in: value.length > 0 ? value.join(',') : undefined
      }
    }))
  }

  const loading = isConvenios === OPERATIONS.FULFILLED

  return {
    data: convenios,
    loading,
    totalConvenio: widges?.total || 0,
    totalConfirmado: widges?.confirmado || 0,
    totalEdicion: widges?.edicion || 0,
    estadoData,
    onSelectEstado,
    pagination
  }
}
