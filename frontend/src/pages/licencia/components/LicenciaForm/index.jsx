import { Col, Form, ButtonToolbar, SelectPicker, DatePicker, Radio, RadioGroup } from 'rsuite'

import { FormField, Textarea, Loader, Button } from 'components'
import useLicenciaForm from './useLicenciaForm'

export default function LicenciaForm ({ closeModal, solicitudLicencia }) {
  const {
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
  } = useLicenciaForm({ solicitudLicencia, closeModal })

  const renderForm = () => (
    <Form
      fluid
      ref={formRef}
      onChange={setFormValue}
      formValue={formValue}
      model={formModel}
    >
      <Col xs={24}>
        <Form.Group controlId='tipo' className='mb-2' hidden={isUpdate()}>
          <Form.ControlLabel className='text-muted text-sm'>Tipo: <span className='text-danger'>*</span></Form.ControlLabel>
          <Form.Control name='tipo' accepter={RadioGroup} inline>
            <Radio value='venta'>Venta</Radio>
            <Radio value='actualizacion'>Actualización</Radio>
          </Form.Control>
        </Form.Group>
        <FormField
          name='convenio'
          label='Convenio'
          accepter={SelectPicker}
          data={convenios.map(convenio => ({
            label: convenio.no_convenio + ' - ' + convenio.contacto_cliente_final,
            value: convenio.id
          }))}
          block
          required={formValue.tipo === 'venta'}
          hidden={formValue.tipo !== 'venta'}
        />
        <FormField name='fecha' label='Fecha' accepter={DatePicker} block required />
        <FormField
          name='clienteSolicita' label='Persona que Solicita' accepter={SelectPicker} data={personasAsociadas.map(persona => ({
            label: persona.nombre_completo,
            value: persona.id
          }))} block required
        />
        <FormField
          name='clienteFinal'
          label='Cliente Final'
          accepter={SelectPicker}
          data={clienteData}
          block
          required
          readOnly={isFormClienteFinal()}
          loading={isFormClienteFinal()}
        />
        <FormField
          name='servicio'
          label='Servicio'
          accepter={SelectPicker}
          data={servicioData}
          block
          required
          readOnly={isFormServicios()}
          loading={isFormServicios()}
        />
        <FormField name='claveRegistro' label='Clave de Registro' required />
        <FormField name='observaciones' label='Observaciones' accepter={Textarea} rows={3} />
      </Col>
      <Col xs={24} className='mt-4'>
        <ButtonToolbar>
          <Button
            icon='save'
            text='Guardar'
            appearance='primary'
            onClick={handleSubmit}
          />
          {closeModal &&
            <Button
              icon='times'
              text='Cerrar'
              appearance='subtle'
              color='red'
              onClick={closeModal}
            />}
        </ButtonToolbar>
      </Col>
    </Form>
  )

  return (
    <>
      {isLoading()
        ? renderForm()
        : <Loader.Paragraph rows={16} />}
    </>
  )
}
