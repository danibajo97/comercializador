import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Message, Schema } from 'rsuite'

import { getListadoServicios, retrieveConvenio, stateResetOperation as stateResetOperationConvenio } from 'redux/convenio/convenioSlice'
import { addServiciosContratados, getServiciosContratadosAll, stateResetOperation as stateResetOperationServiciosContratados } from 'redux/serviciosContratados/serviciosContratadosSlice'
import OPERATIONS from 'constants/operationsRedux'

export default function useServiciosContratadosForm () {
  const dispatch = useDispatch()
  const [db, serDB] = useState(0)

  const params = useParams()
  const { id } = params

  const convenio = useSelector(state => state.convenio.convenio)
  const listadoServicios = useSelector(state => state.convenio.listadoServicios)
  const isListServicios = useSelector(state => state.convenio.isListServicios)

  const serviciosContratados = useSelector(state => state.serviciosContratados.serviciosContratados)
  const isList = useSelector(state => state.serviciosContratados.isList)
  const isAdd = useSelector(state => state.serviciosContratados.isAdd)

  const formRef = useRef()
  const [formError, setFormError] = useState({})
  const [formValue, setFormValue] = useState({
    servicios_contratados: [
      { id: undefined, servicios: '', cantidad_bd: undefined }
    ]
  })

  const { ArrayType, StringType, NumberType, ObjectType } = Schema.Types
  const formModel = Schema.Model({
    servicios_contratados: ArrayType().of(
      ObjectType().shape({
        servicios: StringType().isRequired('Este campo es obligatorio.'),
        cantidad_bd: NumberType().max(db, `No puede exceder de ${db} base de dastos.`).isRequired('Este campo es obligatorio.')
      })
    )
  })

  const guardarForm = () => {
    if (formRef.current.check()) {
      const params = formValue.servicios_contratados.map((sc, index) => {
        const servicio = listadoServicios.find(ls => ls.id === sc.servicios)
        return {
          id: sc.id,
          convenio: convenio.id,
          servicio: servicio.id,
          cantidad: sc.cantidad_bd,
          a_facturar: servicio.precio_moneda,
          precio: servicio.precio_moneda,
          deduccion: servicio.deduccion
        }
      })
      dispatch(addServiciosContratados({ convenio: convenio.id, params }))
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      dispatch(retrieveConvenio({ id }))
      dispatch(getServiciosContratadosAll({ convenio: id }))
    }
    return () => {
      dispatch(stateResetOperationConvenio())
      dispatch(stateResetOperationServiciosContratados())
    }
  }, [])

  useEffect(() => {
    const data = serviciosContratados.map(sc => {
      return { id: sc.id, servicios: sc.servicio, cantidad_bd: sc.cantidad }
    })
    if (data.length > 0) { setFormValue({ servicios_contratados: data }) }
  }, [serviciosContratados])

  useEffect(() => {
    if (convenio !== null) {
      serDB(convenio.cantidad_bd)
      dispatch(getListadoServicios({ convenio: convenio.id, plazopago: null }))
    }
  }, [convenio])

  const isServiciosContratadosRelacionado = () => {
    const isRelacionado = serviciosContratados.some(sc => sc.relacionado)
    return !isRelacionado
      ? <></>
      : (
        <Message showIcon style={{ backgroundColor: '#E3F3FD' }} header='Información' className='mb-4 ml--1 mr--1'>
          Existen servicios contratados usados, si se modifican, los plazos de pagos se eliminarán.
        </Message>)
  }

  const hasError = () => Object.keys(formError).length !== 0

  const isComfirmado = () => convenio && convenio.estado >= 3

  const isLoading = () => isList === OPERATIONS.FULFILLED && isListServicios === OPERATIONS.FULFILLED
  const isAddServContratados = () => isAdd === OPERATIONS.PENDING

  return {
    formRef,
    formModel,
    formValue,
    setFormValue,
    formError,
    setFormError,
    hasError,
    isComfirmado,
    isLoading,
    isServiciosContratadosRelacionado,
    guardarForm,
    isAddServContratados,
    listadoServicios
  }
}
