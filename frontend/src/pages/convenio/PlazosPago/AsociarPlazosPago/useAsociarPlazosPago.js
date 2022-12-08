import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { stateResetOperation, getPlazoPagoAll } from 'redux/plazoPago/plazoPagoSlice'
import usePagination from 'hooks/usePagination'
import OPERATIONS from 'constants/operationsRedux'

export default function useAsociarPlazosPago ({ setSelectedId }) {
  const dispatch = useDispatch()
  const isList = useSelector(state => state.plazoPago.isList)
  const plazosPagos = useSelector(state => state.plazoPago.plazosPagos)
  const [checkedKeys, setCheckedKeys] = useState(null)

  const { pagination, dataPage } = usePagination({ data: plazosPagos })

  const params = useParams()
  const { id } = params

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getPlazoPagoAll({ convenio: id }))
    }
    return () => {
      dispatch(stateResetOperation())
    }
  }, [])

  const handleCheck = (value) => {
    setCheckedKeys(value)
    setSelectedId(value)
  }

  const isLoading = () => isList === OPERATIONS.FULFILLED

  return {
    dataPage,
    pagination,
    checkedKeys,
    handleCheck,
    isLoading
  }
}
