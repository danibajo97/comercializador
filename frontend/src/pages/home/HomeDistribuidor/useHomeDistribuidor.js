import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getConveniosAll } from 'redux/convenio/convenioSlice'
import estadosConvenios from 'constants/estadosConvenios'
import OPERATIONS from 'constants/operationsRedux'

export default function useHomeDistribuidor () {
  const [data, setData] = useState([])
  const [totalConvenio, setTotalConvenio] = useState(0)
  const [totalConfirmado, setTotalConfirmado] = useState(0)
  const [totalEdicion, setTotalEdicion] = useState(0)

  const dispatch = useDispatch()

  const convenios = useSelector(state => state.convenio.convenios)
  const isConvenios = useSelector(state => state.convenio.isConvenios)

  useEffect(() => {
    dispatch(getConveniosAll({ page: 1 }))
  }, [])

  useEffect(() => {
    setData(convenios)
    if (isConvenios === OPERATIONS.FULFILLED) {
      const edicion = convenios.filter(convenio => convenio.estado === 1)
      const confirmado = convenios.filter(convenio => convenio.estado === 3)
      setTotalConvenio(convenios.length)
      setTotalConfirmado(confirmado.length)
      setTotalEdicion(edicion.length)
    }
  }, [convenios])

  const estadoData = estadosConvenios.map(item => {
    if (item.visible) { return { label: item.text, value: item.id } } else { return undefined }
  }).filter(item => item !== undefined)

  const onSelectEstado = (value) => {
    const filterEstado = convenios.filter(convenio => value.includes(convenio.estado))
    setData(value.length > 0 ? filterEstado : convenios)
  }

  const loading = isConvenios === OPERATIONS.FULFILLED

  return { data, loading, totalConvenio, totalConfirmado, totalEdicion, estadoData, onSelectEstado }
}
