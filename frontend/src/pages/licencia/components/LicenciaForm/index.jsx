import React, { useEffect } from 'react'
import { Col, Form, Button, ButtonToolbar, Schema, SelectPicker, DatePicker, Radio, RadioGroup } from 'rsuite'

import { FormField, Textarea, Loader } from 'components'
import useAuth from 'hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'

import { getPersonasAsociadas, stateResetOperation as stateResetOperationDatosGenerales } from 'redux/datosGenerales/datosGeneralesSlice'
import { getConveniosAll } from 'redux/convenio/convenioSlice'
import { addSolicitudLicencia, updateSolicitudLicencia } from 'redux/solicitudLicencia/solicitudLicenciaSlice'
import { getClientesFinales, stateResetOperation as stateResetOperationClientesFinales } from 'redux/clientesFinales/clientesFinalesSlice'
import { getServiciosContratadosAll, stateResetOperation as stateResetOperationServiciosContratados } from 'redux/serviciosContratados/serviciosContratadosSlice'
import OPERATIONS from 'constants/operationsRedux'

export default function LicenciaForm ({ closeModal, solicitudLicencia }) {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const formRef = React.useRef()

  const [formValue, setFormValue] = React.useState({
    tipo: 'venta',
    convenio: '',
    fecha: undefined,
    clienteSolicita: '',
    personaSolicita: '',
    clienteFinal: '',
    servicio: '',
    claveRegistro: '',
    observaciones: ''
  })

  console.log({ user })

  const { StringType, DateType } = Schema.Types
  const model = Schema.Model({
    tipo: StringType().isRequired('Este campo es obligatorio.'),
    convenio: StringType().isRequired('Este campo es obligatorio.'),
    fecha: DateType().isRequired('Este campo es obligatorio.'),
    clienteSolicita: StringType(), // .isRequired('Este campo es obligatorio.'),
    personaSolicita: StringType().isRequired('Este campo es obligatorio.'),
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

  const personasAsociadas = useSelector(state => state.datosGenerales.personasAsociadas)

  useEffect(() => {
    dispatch(getConveniosAll({ page: 1 }))

    return () => {
      dispatch(stateResetOperationServiciosContratados())
      dispatch(stateResetOperationClientesFinales())
      dispatch(stateResetOperationDatosGenerales())
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
    // clienteSolicita = user.distribuidor.id
    if (formRef.current.check()) {
      const params = {
        // ...formValue,
        venta: formValue.tipo === 'venta',
        negocio: formValue.convenio,
        no_solicitud: 'aaa',
        solicitado_por: formValue.personaSolicita,
        cliente: formValue.clienteFinal,
        semilla: formValue.claveRegistro,
        servicio: formValue.servicio,
        observaciones: formValue.observaciones
      }
      if (solicitudLicencia === undefined) {
        dispatch(addSolicitudLicencia({ params }))
      } else {
        dispatch(updateSolicitudLicencia({ id: solicitudLicencia.id, params }))
      }

      // if (closeModal) closeModal()
    }
  }

  const convenioDataSelect = () => {
    const data = convenios.map(convenio => {
      if (convenio.estado === 3) {
        return {
          label: convenio.no_convenio + ' - ' + convenio.contacto_cliente_final,
          value: convenio.id
        }
      } else return undefined
    }).filter(convenio => convenio !== undefined)

    console.log({ data })
    return data
  }

  const renderForm = () => (
    <Form
      fluid
      ref={formRef}
      onChange={setFormValue}
      formValue={formValue}
      model={model}
    >
      <Col xs={24}>
        <Form.Group controlId='tipo' className='mb-2'>
          <Form.ControlLabel className='text-muted text-sm'>Tipo: <span className='text-danger'>*</span></Form.ControlLabel>
          <Form.Control name='tipo' accepter={RadioGroup} inline>
            <Radio value='venta'>Venta</Radio>
            <Radio value='actualizacion'>Actualización</Radio>
          </Form.Control>
        </Form.Group>
        <FormField
          name='convenio'
          label='Convenio' accepter={SelectPicker}
          data={convenioDataSelect()}
          block
          required
          hidden={formValue.tipo !== 'venta'}
        />
        <FormField name='fecha' label='Fecha' accepter={DatePicker} block required />
        <FormField name='clienteSolicita' label='Cliente que Solicita' accepter={SelectPicker} data={[]} block required />
        <FormField
          name='personaSolicita' label='Persona que Solicita' accepter={SelectPicker} data={personasAsociadas.map(persona => ({
            label: persona.nombre_completo,
            value: persona.id
          }))} block required
        />
        <FormField
          name='clienteFinal'
          label='Cliente Final'
          accepter={SelectPicker}
          data={clientesFinales.map(cliente => ({
            label: cliente.nombre,
            value: cliente.id
          }))}
          block
          required
          readOnly={isListClientesFinales === OPERATIONS.PENDING}
          loading={isListClientesFinales === OPERATIONS.PENDING}
        />
        <FormField
          name='servicio'
          label='Servicio'
          accepter={SelectPicker}
          data={serviciosContratados.map(servicio => ({
            label: servicio.producto_nombre,
            value: servicio.servicio
          }))}
          block
          required
          readOnly={isListServiciosContratados === OPERATIONS.PENDING}
          loading={isListServiciosContratados === OPERATIONS.PENDING}
        />
        <FormField name='claveRegistro' label='Clave de Registro' required />
        <FormField name='observaciones' label='Observaciones' accepter={Textarea} rows={3} />
      </Col>
      <Col xs={24} className='mt-4'>
        <ButtonToolbar>
          <Button appearance='primary' size='sm' onClick={handleSubmit}>
            Enviar
          </Button>
          {closeModal &&
            <Button appearance='subtle' color='red' size='sm' onClick={closeModal}>
              Cerrar
            </Button>}
        </ButtonToolbar>
      </Col>
    </Form>
  )

  const isLoading = () => isConvenios === OPERATIONS.FULFILLED

  return (
    <>
      {isLoading()
        ? renderForm()
        : <Loader.Paragraph rows={16} />}
    </>
  )
}
