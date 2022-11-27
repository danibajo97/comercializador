import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Schema } from 'rsuite'

import { getBuscarContrato, getClientesFinales, getPersonasAsociadas, stateResetOperation as stateResetOperationDatosGenerales } from 'redux/datosGenerales/datosGeneralesSlice'
import { addConvenio, updateConvenio, retrieveConvenio, stateResetOperation as stateResetOperationConvenio } from 'redux/convenio/convenioSlice'
import { useParams } from 'react-router-dom'
import useAuth from 'hooks/useAuth'
import { date } from 'utils'
import OPERATIONS from 'constants/operationsRedux'

const INI_VALUE = {
  nroContrato: '',
  fechaEmision: undefined,
  fechaVencimiento: undefined,
  nroConvenio: 'automatico',
  fechaEmisionConvenio: undefined,
  solicitadoPor: '',
  cliente: '',
  cantidadBaseDatos: 1,
  observaciones: ''
}

export default function useDatosGeneralesForm ({ setCountBD }) {
  const dispatch = useDispatch()
  const formRef = useRef()
  const [formValue, setFormValue] = useState(INI_VALUE)

  const { user } = useAuth()
  const params = useParams()
  const { id } = params

  const contrato = useSelector(state => state.datosGenerales.contrato)
  const clientesFinales = useSelector(state => state.datosGenerales.clientesFinales)
  const isClienteFinal = useSelector(state => state.datosGenerales.isClienteFinal)

  const personasAsociadas = useSelector(state => state.datosGenerales.personasAsociadas)
  const listPersonasAsociadas = useSelector(state => state.datosGenerales.listPersonasAsociadas)

  const isAdd = useSelector(state => state.convenio.isAdd)
  const convenio = useSelector(state => state.convenio.convenio)

  const { nroContrato, fechaEmision, fechaVencimiento } = formValue

  const { StringType, NumberType, DateType } = Schema.Types
  const formModel = Schema.Model({
    nroContrato: StringType()
      .isRequired('Este campo es obligatorio.'),
    fechaEmision: DateType()
      .isRequired('Este campo es obligatorio.'),
    fechaVencimiento: DateType()
      .isRequired('Este campo es obligatorio.'),
    nroConvenio: StringType(),
    fechaEmisionConvenio: DateType()
      .min(fechaEmision, 'Este campo no puede ser menor que la fecha de emisión.')
      .max(fechaVencimiento, 'Este campo no puede ser mayor que la fecha de vencimiento.')
      .isRequired('Este campo es obligatorio.'),
    solicitadoPor: StringType()
      .isRequired('Este campo es obligatorio.'),
    cliente: StringType()
      .isRequired('Este campo es obligatorio.'),
    cantidadBaseDatos: NumberType()
      .min(1, 'Este campo tiene que ser mayor que 0.')
      .isRequired('Este campo es obligatorio.'),
    observaciones: StringType()
  })

  useEffect(() => {
    if (convenio !== null) {
      setFormValue({
        nroContrato: convenio.contrato_no,
        nroConvenio: convenio.no_convenio,
        fechaEmisionConvenio: date.toJSDate({ date: convenio.fecha_emision }),
        solicitadoPor: convenio.solicitado_por,
        cliente: convenio.cliente_final,
        cantidadBaseDatos: convenio.cantidad_bd,
        observaciones: convenio.observaciones,
        facturese_a: user.distribuidor.id
      })
      setCountBD(convenio.cantidad_bd)
    }
  }, [convenio])

  useEffect(() => {
    dispatch(getClientesFinales())
    if (id !== undefined) {
      dispatch(retrieveConvenio({ id }))
    }

    return () => {
      dispatch(stateResetOperationConvenio())
      dispatch(stateResetOperationDatosGenerales())
    }
  }, [])

  useEffect(() => {
    dispatch(getBuscarContrato({ contrato: nroContrato }))
  }, [nroContrato])

  useEffect(() => {
    if (user?.distribuidor) { dispatch(getPersonasAsociadas({ cliente: user.distribuidor.id })) }
  }, [user])

  useEffect(() => {
    setFormValue({
      ...formValue,
      fechaEmision: contrato?.fecha_inicial ? new Date(contrato.fecha_inicial) : undefined,
      fechaVencimiento: contrato?.fecha_final ? new Date(contrato.fecha_final) : undefined
    })
  }, [contrato])

  useEffect(() => {
    if (isAdd === OPERATIONS.FULFILLED) {
      setFormValue(INI_VALUE)
    }
  }, [isAdd])

  const handleSubmit = async () => {
    if (formRef.current.check()) {
      const params = {
        cantidad_bd: formValue.cantidadBaseDatos,
        cliente_final: formValue.cliente,
        contrato: contrato.idcontrato,
        facturese_a: user.distribuidor.id,
        fecha_emision: date.toISODate({ date: formValue.fechaEmisionConvenio }),
        no_convenio: formValue.nroConvenio,
        observaciones: formValue.observaciones,
        solicitado_por: formValue.solicitadoPor
      }
      setCountBD(formValue.cantidadBaseDatos)
      if (id === undefined) {
        dispatch(addConvenio({ params }))
      } else {
        dispatch(updateConvenio({ id, params }))
      }
    }
  }

  const isConfirmado = () => convenio && convenio.estado >= 3
  const isUpdate = () => id !== undefined
  const isLoading = () => isClienteFinal === OPERATIONS.FULFILLED || listPersonasAsociadas === OPERATIONS.FULFILLED

  return { formRef, formModel, formValue, setFormValue, handleSubmit, contrato, clientesFinales, personasAsociadas, isLoading, isConfirmado, isUpdate }
}
