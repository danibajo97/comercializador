import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { stateResetOperation, getPlazoPagoServicioAll } from 'redux/plazoPagoServicio/plazoPagoServicioSlice'
import usePagination from 'hooks/usePagination'
import OPERATIONS from 'constants/operationsRedux'

export default function useAsociarServicios ({ id }) {
  const dispatch = useDispatch()
  const plazoPagoServicio = useSelector(state => state.plazoPagoServicio.plazoPagoServicio)
  const isList = useSelector(state => state.plazoPagoServicio.isList)
  const isDelete = useSelector(state => state.plazoPagoServicio.isDelete)

  const { pagination, dataPage } = usePagination({ data: id ? plazoPagoServicio : [] })

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getPlazoPagoServicioAll({ plazoPagoId: id }))
    }
  }, [id])

  useEffect(() => {
    return () => {
      dispatch(stateResetOperation())
    }
  }, [])

  const isLoading = () => isList === OPERATIONS.FULFILLED
  const isDeleting = () => isDelete === OPERATIONS.PENDING

  return {
    dataPage,
    pagination,
    isLoading,
    isDeleting
  }
}
