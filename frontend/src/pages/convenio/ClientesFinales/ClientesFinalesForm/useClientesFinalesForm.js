import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Message, Schema } from 'rsuite'
import { toast } from 'react-toastify'

import { retrieveConvenio, stateResetOperation as stateResetOperationConvenio } from 'redux/convenio/convenioSlice'
import { getListaClientesFinales, addClientesFinales, getClientesFinales, stateResetOperation as stateResetOperationClientesFinales } from 'redux/clientesFinales/clientesFinalesSlice'
import OPERATIONS from 'constants/operationsRedux'

export default function useClientesFinalesForm () {
  const dispatch = useDispatch()
  const params = useParams()
  const { id } = params

  const convenio = useSelector(state => state.convenio.convenio)
  const listClientesFinales = useSelector(state => state.clientesFinales.listClientesFinales)
  const isListClientesFinales = useSelector(state => state.clientesFinales.isListClientesFinales)
  const isList = useSelector(state => state.clientesFinales.isList)
  const clientesFinales = useSelector(state => state.clientesFinales.clientesFinales)

  const [db, serDB] = useState(0)
  const [nuevoContacto, serNuevoContacto] = useState([])

  const formRef = useRef()
  const [formValue, setFormValue] = useState({
    cliente_final: []
  })

  const { ArrayType } = Schema.Types
  const formModel = Schema.Model({
    cliente_final: ArrayType().isRequired('Este campo es obligatorio.')
  })

  useEffect(() => {
    if (id !== undefined) {
      dispatch(retrieveConvenio({ id }))
      dispatch(getListaClientesFinales())
      dispatch(getClientesFinales({ convenio: id }))
    }
    return () => {
      dispatch(stateResetOperationConvenio())
      dispatch(stateResetOperationClientesFinales())
    }
  }, [])

  useEffect(() => {
    const data = clientesFinales.map(cf => cf.id)
    if (data.length > 0) { setFormValue({ cliente_final: data }) }
  }, [clientesFinales])

  useEffect(() => {
    listClientesFinales.forEach(data => {
      if (data?.nuevo === true) {
        serNuevoContacto([data.id])
        setFormValue({
          cliente_final: [
            ...formValue.cliente_final,
            data.id
          ]
        })
      }
    })
  }, [listClientesFinales])

  useEffect(() => {
    if (convenio !== null) {
      serDB(convenio.cantidad_bd)
    }
  }, [convenio])

  const handleSubmit = () => {
    if (formRef.current.check()) {
      if (formValue.cliente_final.length > db) {
        toast.error(`Debes seleccionar ${db} clientes.`)
      } else {
        const params = formValue.cliente_final
        dispatch(addClientesFinales({ convenio: id, params }))
      }
    }
  }

  const tableData = () => {
    return listClientesFinales.map(data => {
      if (formValue.cliente_final.includes(data.id)) { return data } else return undefined
    }).filter(data => data !== undefined)
  }

  const onSelectClienteFinal = (value, item, event) => {
    if (value.length <= db) {
      setFormValue({
        cliente_final: value
      })
    }
  }

  const onClean = () => {
    setFormValue({
      cliente_final: []
    })
  }

  const isClientesFinalesRelacionados = () => {
    const isRelacionado = clientesFinales.some(cf => cf.relacionado)
    return !isRelacionado
      ? <></>
      : (
        <Message showIcon style={{ backgroundColor: '#E3F3FD' }} header='Información' className='mb-4 ml--1 mr--1'>
          Existen clientes finales usados, si se modifican, los plazos de pagos se eliminarán.
        </Message>)
  }

  const isConfirmado = () => convenio && convenio.estado >= 3

  const isLoading = () => isList === OPERATIONS.FULFILLED && isListClientesFinales === OPERATIONS.FULFILLED

  return {
    formRef,
    formValue,
    setFormValue,
    formModel,
    isConfirmado,
    isLoading,
    listClientesFinales,
    nuevoContacto,
    tableData,
    onSelectClienteFinal,
    onClean,
    isClientesFinalesRelacionados,
    handleSubmit
  }
}
