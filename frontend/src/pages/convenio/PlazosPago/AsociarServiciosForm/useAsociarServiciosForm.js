import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Schema } from 'rsuite'

import { getPlazoPagoServicioAll, addPlazoPagoServicio, updatePlazoPagoServicio, stateResetOperation as stateResetOperationPlazoPagoServicio } from 'redux/plazoPagoServicio/plazoPagoServicioSlice'
import { getClientesFinales, stateResetOperation as stateResetOperationClientesFinales } from 'redux/clientesFinales/clientesFinalesSlice'
import { getServiciosContratadosAll, stateResetOperation as stateResetOperationServiciosContratados } from 'redux/serviciosContratados/serviciosContratadosSlice'
import OPERATIONS from 'constants/operationsRedux'
import { toast } from 'react-toastify'

export default function useAsociarServiciosForm ({ closeModal, convenioId, plazoPagoId, servicioAsociado = null }) {
  const [cantidadBD, setCantidadBD] = useState(null)
  const formRef = useRef()
  const dispatch = useDispatch()

  const clientesFinales = useSelector(state => state.clientesFinales.clientesFinales)
  const isListClientesFinales = useSelector(state => state.clientesFinales.isList)
  const serviciosContratados = useSelector(state => state.serviciosContratados.serviciosContratados)
  const isListServiciosContratados = useSelector(state => state.serviciosContratados.isList)

  const isAdd = useSelector(state => state.plazoPagoServicio.isAdd)
  const isUpdate = useSelector(state => state.plazoPagoServicio.isUpdate)

  useEffect(() => {
    dispatch(getClientesFinales({ convenio: convenioId }))
    dispatch(getServiciosContratadosAll({ convenio: convenioId }))

    return () => {
      dispatch(stateResetOperationPlazoPagoServicio())
      dispatch(stateResetOperationServiciosContratados())
      dispatch(stateResetOperationClientesFinales())
    }
  }, [])

  useEffect(() => {
    if (servicioAsociado !== null && serviciosContratados.length > 0) {
      const serviciosContratadosFind = serviciosContratados.find(sc => sc.servicio === servicioAsociado.servicio)
      setCantidadBD(serviciosContratadosFind.cantidad)
    }
  }, [serviciosContratados])

  useEffect(() => {
    if (isAdd === OPERATIONS.FULFILLED || isUpdate === OPERATIONS.FULFILLED) {
      dispatch(getPlazoPagoServicioAll({ plazoPagoId }))
      if (closeModal) closeModal()
    }
  }, [isAdd, isUpdate])

  const [formValue, setFormValue] = useState({
    servicios: servicioAsociado?.servicio,
    cantidad: servicioAsociado?.cantidad,
    clientesAsociados: servicioAsociado?.usuariosfinales
  })

  const { StringType, ArrayType } = Schema.Types
  const formModel = Schema.Model({
    servicios: StringType()
      .isRequired('Este campo es obligatorio.'),
    clientesAsociados: ArrayType()
      .isRequired('Este campo es obligatorio.')
  })

  const tableData = () => {
    return clientesFinales.map(data => {
      if (formValue.clientesAsociados && formValue.clientesAsociados.includes(data.id)) { return data } else return undefined
    }).filter(data => data !== undefined)
  }

  const handleSubmit = () => {
    if (formRef.current.check()) {
      if (formValue.cantidad !== cantidadBD) {
        toast.error('No coinciden las base de datos.')
        return
      }
      const params = {
        cantidad: formValue.cantidad,
        plazo: plazoPagoId,
        servicio: formValue.servicios,
        usuariosfinales: formValue.clientesAsociados
      }
      if (servicioAsociado === null) {
        dispatch(addPlazoPagoServicio({ params }))
      } else {
        dispatch(updatePlazoPagoServicio({ id: servicioAsociado.id, params }))
      }
    }
  }

  const onSelectServicio = (value, item, event) => {
    setCantidadBD(item.cantidad)
    setFormValue({
      ...formValue,
      servicios: value
    })
  }

  const onChangeClienteFinal = (value, event) => {
    const count = cantidadBD || 1
    if (value.length <= count) {
      setFormValue({
        ...formValue,
        clientesAsociados: value,
        cantidad: value.length
      })
    }
  }

  const isLoading = () => isListClientesFinales === OPERATIONS.FULFILLED && isListServiciosContratados === OPERATIONS.FULFILLED

  return {
    formRef,
    formValue,
    formModel,
    serviciosContratados,
    onSelectServicio,
    cantidadBD,
    clientesFinales,
    onChangeClienteFinal,
    tableData,
    handleSubmit,
    isLoading
  }
}
