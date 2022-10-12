import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Form, Button, Divider, ButtonToolbar, Schema, SelectPicker, DatePicker } from 'rsuite'

import { FormField, Textarea, InputNumber } from 'components'
import { date } from 'utils'
import OPERATIONS from 'constants/operationsRedux'

import useAuth from 'hooks/useAuth'

import { getBuscarContrato, getClientesFinales } from 'redux/datosGenerales/datosGeneralesSlice'
import { addConvenio, updateConvenio, retrieveConvenio } from 'redux/convenio/convenioSlice'

function DatosGeneralesPanel () {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const contrato = useSelector(state => state.datosGenerales.contrato)
  const clientesFinales = useSelector(state => state.datosGenerales.clientesFinales)

  const isAdd = useSelector(state => state.convenio.isAdd)
  const isUpdate = useSelector(state => state.convenio.isUpdate)
  const convenio = useSelector(state => state.convenio.convenio)

  const navigate = useNavigate()
  const params = useParams()
  const { id } = params

  const formRef = React.useRef()
  const [formValue, setFormValue] = React.useState({
    nroContrato: '',
    fechaEmision: undefined,
    fechaVencimiento: undefined,
    nroConvenio: '',
    fechaEmisionConvenio: undefined,
    solicitadoPor: '',
    cliente: '',
    cantidadBaseDatos: 1,
    observaciones: ''
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
    }
  }, [convenio])

  useEffect(() => {
    if (id !== undefined) { dispatch(retrieveConvenio({ id })) }
  }, [])

  const { nroContrato, fechaEmision, fechaVencimiento } = formValue
  React.useEffect(() => {
    dispatch(getBuscarContrato({ contrato: nroContrato }))
  }, [nroContrato])

  React.useEffect(() => {
    dispatch(getClientesFinales())
  }, [])

  React.useEffect(() => {
    setFormValue({
      ...formValue,
      nroConvenio: contrato?.no_convenio || '',
      fechaEmision: contrato?.fecha_inicial ? new Date(contrato.fecha_inicial) : undefined,
      fechaVencimiento: contrato?.fecha_final ? new Date(contrato.fecha_final) : undefined
    })
  }, [contrato])

  const { StringType, NumberType, DateType } = Schema.Types
  const model = Schema.Model({
    nroContrato: StringType()
      .isRequired('Este campo es obligatorio.'),
    fechaEmision: DateType()
      .isRequired('Este campo es obligatorio.'),
    fechaVencimiento: DateType()
      .isRequired('Este campo es obligatorio.'),
    nroConvenio: StringType()
      .isRequired('Este campo es obligatorio.'),
    fechaEmisionConvenio: DateType()
      .min(fechaEmision, 'Este campo no puede ser menor que la fecha de emisión.')
      .max(fechaVencimiento, 'Este campo no puede ser mayor que la fecha de vencimiento.')
      .isRequired('Este campo es obligatorio.'),
    solicitadoPor: StringType(), // .isRequired('Este campo es obligatorio.'),
    cliente: StringType()
      .isRequired('Este campo es obligatorio.'),
    cantidadBaseDatos: NumberType()
      .min(1, 'Este campo tiene que ser mayor que 0.')
      .isRequired('Este campo es obligatorio.'),
    observaciones: StringType()
  })

  const handleSubmit = async () => {
    if (formRef.current.check()) {
      if (id === undefined) {
        dispatch(addConvenio({
          cantidad_bd: formValue.cantidadBaseDatos,
          cliente_final: formValue.cliente,
          contrato: '7aad845a-a666-4bf5-b631-b4b3e1a66aba',
          facturese_a: user.distribuidor.id,
          fecha_emision: date.toISODate({ date: formValue.fechaEmisionConvenio }),
          no_convenio: formValue.nroConvenio,
          observaciones: formValue.observaciones,
          solicitado_por: ''
        }))
        setTimeout(() => {
          if (isAdd === OPERATIONS.FULFILLED) {
            navigate('/')
          }
        }, 2000)
      } else {
        dispatch(updateConvenio({
          id,
          params: {
            cantidad_bd: formValue.cantidadBaseDatos,
            cliente_final: formValue.cliente,
            contrato: '7aad845a-a666-4bf5-b631-b4b3e1a66aba',
            facturese_a: user.distribuidor.id,
            fecha_emision: date.toISODate({ date: formValue.fechaEmisionConvenio }),
            no_convenio: formValue.nroConvenio,
            observaciones: formValue.observaciones,
            solicitado_por: ''
          }
        }))
        setTimeout(() => {
          if (isUpdate === OPERATIONS.FULFILLED) {
            navigate('/')
          }
        }, 2000)
      }
    }
  }

  return (
    <Form
      fluid
      ref={formRef}
      onChange={setFormValue}
      formValue={formValue}
      model={model}
    >
      <Row>
        <Col xs={24} sm={12} md={12} lg={12}>
          {/* <FormField name='distribuidor' label='Distribuidor' disabled /> */}
          <FormField name='nroContrato' label='Nro. Contrato' required />
          <FormField name='fechaEmision' label='Fecha Emisión' accepter={DatePicker} disabled block />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <FormField name='nroConvenio' label='Nro. Convenio' required />
          <FormField name='fechaVencimiento' label='Fecha Vencimiento' accepter={DatePicker} disabled block />
        </Col>
      </Row>
      {contrato?.fecha_inicial !== undefined &&
        <>
          <Divider />
          <h6 className='heading-small text-muted mb-4'>
            Datos Convenio
          </h6>
          <Row>
            <Col xs={24} sm={12} md={12} lg={12}>
              <FormField
                name='cliente' label='Cliente' accepter={SelectPicker} data={clientesFinales.map(cliente => ({
                  label: cliente.nombre,
                  value: cliente.id
                }))} required block
              />
              <FormField name='solicitadoPor' label='Solicitado Por' accepter={SelectPicker} data={[]} block />
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <FormField name='fechaEmisionConvenio' label='Fecha Emisión Convenio' accepter={DatePicker} required block />
              <FormField name='cantidadBaseDatos' label='Cantidad de Base de Datos' accepter={InputNumber} required />
            </Col>
          </Row>
          <Row>
            <Col xs={24} className='mt-4'>
              <FormField name='observaciones' label='Observaciones' accepter={Textarea} rows={3} />
            </Col>
          </Row>
        </>}
      <Row>
        <Col xs={24} className='mt-4'>
          <ButtonToolbar>
            <Button appearance='primary' size='sm' onClick={handleSubmit} disabled={contrato?.fecha_inicial === undefined} loading={isAdd === OPERATIONS.PENDING}>
              {id === undefined ? 'Guardar' : 'Editar'}
            </Button>
          </ButtonToolbar>
        </Col>
      </Row>
    </Form>
  )
}

export default DatosGeneralesPanel
