import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Schema } from 'rsuite'

import { getPersonasAsociadas, stateResetOperation as stateResetOperationDatosGenerales } from 'redux/datosGenerales/datosGeneralesSlice'
import { getConveniosAll } from 'redux/convenio/convenioSlice'
import { addSolicitudLicencia, updateSolicitudLicencia, getServiciosActualizacion, getSolicitudLicenciaAll, stateResetOperation as stateResetOperationLicencia } from 'redux/solicitudLicencia/solicitudLicenciaSlice'
import { getClientesFinales, getGestionadosPor, stateResetOperation as stateResetOperationClientesFinales } from 'redux/clientesFinales/clientesFinalesSlice'
import { getServiciosContratadosAll, stateResetOperation as stateResetOperationServiciosContratados } from 'redux/serviciosContratados/serviciosContratadosSlice'

import OPERATIONS from 'constants/operationsRedux'
import date from 'utils/date'
import useAuth from 'hooks/useAuth'

export default function useLicenciaForm ({ solicitudLicencia, closeModal }) {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const formRef = useRef()

  const isUpdate = () => solicitudLicencia !== undefined
  const isNegocio = () => isUpdate() && solicitudLicencia.negocio !== null
  const tipo = () => isUpdate() && !isNegocio() ? 'actualizacion' : 'venta'
  const isLoading = () => isConvenios === OPERATIONS.FULFILLED

  const [clienteData, setClienteData] = useState([])
  const [servicioData, setServicioData] = useState([])

  const [formValue, setFormValue] = useState({
    tipo: tipo(),
    convenio: isNegocio() ? solicitudLicencia.negocio : '',
    fecha: isUpdate() ? date.toJSDate({ date: solicitudLicencia.fecha }) : undefined,
    clienteSolicita: isUpdate() ? solicitudLicencia.solicitado_por : '',
    clienteFinal: isUpdate() ? solicitudLicencia.cliente : '',
    servicio: isUpdate() ? solicitudLicencia.servicio : '',
    claveRegistro: isUpdate() ? solicitudLicencia.semilla : '',
    observaciones: isUpdate() ? solicitudLicencia.observaciones : ''
  })

  const { StringType, DateType } = Schema.Types
  const formModel = Schema.Model({
    tipo: StringType().isRequired('Este campo es obligatorio.'),
    convenio: StringType().isRequired('Este campo es obligatorio.'),
    fecha: DateType().isRequired('Este campo es obligatorio.'),
    clienteSolicita: StringType().isRequired('Este campo es obligatorio.'),
    clienteFinal: StringType().isRequired('Este campo es obligatorio.'),
    servicio: StringType().isRequired('Este campo es obligatorio.'),
    claveRegistro: StringType().isRequired('Este campo es obligatorio.'),
    observaciones: StringType()
  })

  const { convenio } = formValue

  const convenios = useSelector(state => state.convenio.convenios)
  const isConvenios = useSelector(state => state.convenio.isConvenios)

  const clientesFinales = useSelector(state => state.clientesFinales.clientesFinales)
  const isListClientesFinales = useSelector(state => state.clientesFinales.isList)
  const serviciosContratados = useSelector(state => state.serviciosContratados.serviciosContratados)
  const isListServiciosContratados = useSelector(state => state.serviciosContratados.isList)

  const serviciosActualizacion = useSelector(state => state.solicitudLicencia.serviciosActualizacion)
  const isListServiciosActualizacion = useSelector(state => state.solicitudLicencia.isListServiciosActualizacion)
  const gestionadosPor = useSelector(state => state.clientesFinales.gestionadosPor)
  const isListGestionadosPor = useSelector(state => state.clientesFinales.isListGestionadosPor)

  const isAddLicencia = useSelector(state => state.solicitudLicencia.isAdd)
  const isUpdateLicencia = useSelector(state => state.solicitudLicencia.isUpdate)

  const personasAsociadas = useSelector(state => state.datosGenerales.personasAsociadas)

  useEffect(() => {
    const ESTADO_CONFIRMADO = 3
    dispatch(getConveniosAll({
      pagination: { page: 1, limit: 10000 },
      extras: {
        estado__idestadooperacion__in: ESTADO_CONFIRMADO
      }
    }))
    dispatch(getGestionadosPor())
    dispatch(getServiciosActualizacion())

    return () => {
      dispatch(stateResetOperationServiciosContratados())
      dispatch(stateResetOperationClientesFinales())
      dispatch(stateResetOperationDatosGenerales())
      dispatch(stateResetOperationLicencia())
    }
  }, [])

  useEffect(() => {
    if (user?.distribuidor) { dispatch(getPersonasAsociadas({ cliente: user.distribuidor.id })) }
  }, [user])

  useEffect(() => {
    if (convenio) {
      dispatch(getServiciosContratadosAll({ convenio }))
      dispatch(getClientesFinales({ convenio }))
    }
  }, [convenio])

  const handleSubmit = () => {
    if (formRef.current.check()) {
      const params = {
        venta: formValue.tipo === 'venta',
        fecha: date.toISODate({ date: formValue.fecha }),
        negocio: formValue.convenio,
        no_solicitud: isUpdate() ? solicitudLicencia.no_solicitud : 'a',
        solicitado_por: formValue.clienteSolicita,
        cliente: formValue.clienteFinal,
        semilla: formValue.claveRegistro,
        servicio: formValue.servicio,
        observaciones: formValue.observaciones
      }
      if (!isUpdate()) {
        dispatch(addSolicitudLicencia({ params }))
      } else {
        dispatch(updateSolicitudLicencia({ id: solicitudLicencia.id, params }))
      }
    }
  }

  useEffect(() => {
    if (isAddLicencia === OPERATIONS.FULFILLED || isUpdateLicencia === OPERATIONS.FULFILLED) {
      dispatch(getSolicitudLicenciaAll({ page: 1 }))
      if (closeModal) closeModal()
    }
  }, [isAddLicencia, isUpdateLicencia])

  useEffect(() => {
    if (formValue.tipo === 'venta') {
      const cliente = clientesFinales.map(cliente => ({
        label: cliente.nombre,
        value: cliente.id
      }))
      const servicios = serviciosContratados.map(servicio => ({
        label: servicio.producto_nombre,
        value: servicio.servicio
      }))
      setClienteData(cliente)
      setServicioData(servicios)
    } else {
      const cliente = gestionadosPor.map(cliente => ({
        label: cliente.nombre_completo,
        value: cliente.id
      }))
      const servicios = serviciosActualizacion.map(servicio => ({
        label: servicio.producto_nombre,
        value: servicio.servicio
      }))
      setClienteData(cliente)
      setServicioData(servicios)
    }
  }, [formValue.tipo, isListClientesFinales, isListGestionadosPor, isListServiciosActualizacion, isListServiciosContratados])

  const isFormClienteFinal = () => isListClientesFinales === OPERATIONS.PENDING || isListGestionadosPor === OPERATIONS.PENDING
  const isFormServicios = () => isListServiciosContratados === OPERATIONS.PENDING || isListServiciosActualizacion === OPERATIONS.PENDING

  return {
    formRef,
    formValue,
    setFormValue,
    formModel,
    isUpdate,
    isLoading,
    convenios,
    personasAsociadas,
    clienteData,
    servicioData,
    handleSubmit,
    isFormClienteFinal,
    isFormServicios
  }
}
