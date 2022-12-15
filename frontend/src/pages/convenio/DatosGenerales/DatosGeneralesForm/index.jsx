import { Row, Col, Form, Divider, ButtonToolbar, SelectPicker, DatePicker } from 'rsuite'

import { Button, FormField, Textarea, InputNumber, Loader, FormFieldAddon } from 'components'
import useDatosGeneralesForm from './useDatosGeneralesForm'

function DatosGeneralesForm ({ setCountBD }) {
  const {
    formRef,
    formModel,
    formValue,
    setFormValue,
    isConfirmado,
    isUpdate,
    handleSubmit,
    clientesFinales,
    contrato,
    personasAsociadas,
    nuevoClienteModal,
    isLoading
  } = useDatosGeneralesForm({ setCountBD })

  const renderForm = () => (
    <Form
      fluid
      ref={formRef}
      onChange={setFormValue}
      formValue={formValue}
      model={formModel}
      plaintext={isConfirmado()}
    >
      <Row>
        <Col xs={24} className='mb-4'>
          <FormField name='nroContrato' label='Nro. Contrato' required plaintext={isUpdate()} />
        </Col>
      </Row>
      {contrato?.fecha_inicial !== undefined &&
        <>
          <Row>
            <Col xs={24} sm={12} md={12} lg={12} className='mb-4'>
              <FormField name='fechaEmision' label='Fecha Emisión' accepter={DatePicker} plaintext block />
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <FormField name='fechaVencimiento' label='Fecha Vencimiento' accepter={DatePicker} plaintext block />
            </Col>
          </Row>
          <Divider />
          <h6 className='heading-small text-muted mb-4'>
            Datos Convenio
          </h6>
          <Row>
            <Col xs={24} sm={12} md={12} lg={12} className='mb-4'>
              <FormFieldAddon
                name='cliente'
                label='Cliente'
                accepter={SelectPicker}
                data={clientesFinales.map(cliente => ({
                  label: cliente.nombre,
                  value: cliente.id
                }))}
                renderValue={(value, item) => {
                  if (!item) return <span className='text-muted'>Seleccionar</span>
                  let text = item.label
                  if (text.length > 10) text = text.substring(0, 10) + '...'
                  return <div title={item.label}>{text}</div>
                }}
                buttonInfo={{
                  icon: 'plus',
                  text: 'Nuevo Cliente',
                  onClick: () => nuevoClienteModal.openModal()
                }}
                required
                block
              />
              <div style={{ marginTop: 20 }} />
              <FormField
                name='solicitadoPor' label='Solicitado Por' accepter={SelectPicker} data={personasAsociadas.map(persona => ({
                  label: persona.nombre_completo,
                  value: persona.id
                }))} required block
              />
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
            <Button
              icon='save'
              text='Guardar'
              appearance='primary'
              onClick={handleSubmit}
              hidden={isConfirmado()}
              disabled={contrato?.fecha_inicial === undefined}
            />
          </ButtonToolbar>
        </Col>
      </Row>
    </Form>
  )

  return (
    <>
      {nuevoClienteModal.modal}
      {isLoading()
        ? renderForm()
        : <Loader.Paragraph rows={3} />}
    </>
  )
}

export default DatosGeneralesForm
