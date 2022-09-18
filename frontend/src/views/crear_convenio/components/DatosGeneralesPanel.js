import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Row,
  Col
} from 'reactstrap'
import { Form, Button, Divider, ButtonToolbar, Schema, SelectPicker, DatePicker } from 'rsuite'

import { FormField, Textarea, InputNumber } from 'components'

import { contrato, getBuscarContrato, clienteFinal, getClienteFinal, getFacturarseA } from 'redux/convenioDatosGenerales/convenioDatosGeneralesSlice'

const selectData = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice'].map(item => ({
  label: item,
  value: item
}))

function DatosGeneralesPanel (props) {
  const contratoState = useSelector(contrato)
  const clienteFinalState = useSelector(clienteFinal)
  // const facturarseAState = useSelector(facturarseA)
  // const loadingState = useSelector(loading)
  // const errorState = useSelector(error)
  const dispatch = useDispatch()
  const formRef = React.useRef()
  // const [formError, setFormError] = React.useState({})
  const [formValue, setFormValue] = React.useState({
    distribuidor: 'Desoft',
    nroContrato: '',
    fechaEmision: undefined,
    fechaVencimiento: undefined,
    nroConvenio: '',
    fechaEmisionConvenio: undefined,
    facturarseA: '',
    solicitadoPor: '',
    cliente: '',
    cantidadBaseDatos: '',
    observaciones: ''
  })

  const { nroContrato } = formValue

  React.useEffect(() => {
    const numero = nroContrato; const contacto = 'f8a95b2b-a037-5d67-a126-c70657685274'
    dispatch(getBuscarContrato({ numero, contacto }))
    dispatch(getClienteFinal({ contacto }))
    dispatch(getFacturarseA({ contacto }))
  }, [nroContrato])

  React.useEffect(() => {
    setFormValue({
      ...formValue,
      fechaEmision: contratoState?.fecha_inicial ? new Date(contratoState.fecha_inicial) : undefined,
      fechaVencimiento: contratoState?.fecha_final ? new Date(contratoState.fecha_final) : undefined
    })
  }, [contratoState])

  const { StringType, NumberType, DateType } = Schema.Types
  const model = Schema.Model({
    distribuidor: StringType().isRequired('Este campo es obligatorio.'),
    nroContrato: StringType().isRequired('Este campo es obligatorio.'),
    fechaEmision: DateType().isRequired('Este campo es obligatorio.'),
    fechaVencimiento: DateType().isRequired('Este campo es obligatorio.'),

    nroConvenio: StringType().isRequired('Este campo es obligatorio.'),
    fechaEmisionConvenio: DateType().isRequired('Este campo es obligatorio.'),
    facturarseA: StringType().isRequired('Este campo es obligatorio.'),
    solicitadoPor: StringType().isRequired('Este campo es obligatorio.'),
    cliente: StringType().isRequired('Este campo es obligatorio.'),
    cantidadBaseDatos: NumberType().isRequired('Este campo es obligatorio.'),
    observaciones: StringType()
  })

  const handleSubmit = () => {
    formRef.current.check()
    // if (!formRef.current.check()) { }
  }

  /* const handleCheckEmail = () => {
    formRef.current.checkForField('email', checkResult => {
      console.log(checkResult)
    })
  } */

  return (
    <Form
      fluid
      ref={formRef}
      onChange={setFormValue}
      // onCheck={setFormError}
      formValue={formValue}
      model={model}
    >
      <Row>
        <Col xs='12' sm='12' md='12' lg='6'>
          {/* <FormField name='distribuidor' label='Distribuidor' disabled /> */}
          <FormField name='nroContrato' label='Nro. Contrato' required />
          <FormField name='fechaEmision' label='Fecha Emisión' accepter={DatePicker} disabled block />
        </Col>
        <Col xs='12' sm='12' md='12' lg='6'>
          <FormField name='nroConvenio' label='Nro. Convenio' required />
          <FormField name='fechaVencimiento' label='Fecha Vencimiento' accepter={DatePicker} disabled block />
        </Col>
      </Row>
      {contratoState?.fecha_inicial !== undefined &&
        <>
          <Divider />
          <h6 className='heading-small text-muted mb-4'>
            Datos Convenio
          </h6>
          <Row>
            <Col xs='12' sm='12' md='12' lg='6'>

              <FormField
                name='facturarseA' label='Facturarse a' disabled
              />
              <FormField
                name='cliente' label='Cliente' accepter={SelectPicker} data={clienteFinalState.map(item => ({
                  label: item.nombre,
                  value: item.id
                }))} required block
              />
              <FormField name='cantidadBaseBatos' label='Cantidad de Base de Datos' accepter={InputNumber} required />
            </Col>
            <Col xs='12' sm='12' md='12' lg='6'>
              <FormField name='fechaEmisionConvenio' label='Fecha Emisión Convenio' accepter={DatePicker} required block />
              <FormField name='solicitadoPor' label='Solicitado Por' accepter={SelectPicker} data={selectData} block />
            </Col>
          </Row>
          <Row>
            <Col xs='12' className='mt-4'>
              <FormField name='observaciones' label='Observaciones' accepter={Textarea} rows={3} />
            </Col>
          </Row>
        </>}
      <Row>
        <Col xs='12' className='mt-4'>
          <ButtonToolbar>
            <Button appearance='primary' onClick={handleSubmit}>
              Guardar
            </Button>
          </ButtonToolbar>
        </Col>
      </Row>
    </Form>
  )
}

export default DatosGeneralesPanel
