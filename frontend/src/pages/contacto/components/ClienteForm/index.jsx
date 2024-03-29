import { Col, Form, ButtonToolbar, SelectPicker } from 'rsuite'

import { FormField, Textarea, Loader, Button } from 'components'
import useClienteForm from './useClienteForm'

export default function ClienteForm ({ closeModal, type }) {
  const {
    formModel,
    formRef,
    formValue,
    setFormValue,
    provincias,
    handleSubmit,
    isLoading,
    isAdd,
    organismos
  } = useClienteForm({ closeModal, type })

  const renderForm = () => (
    <div>
      <Form
        fluid
        ref={formRef}
        onChange={setFormValue}
        formValue={formValue}
        model={formModel}
      >
        <Col xs={24} sm={12} className='mb-4'>
          <FormField name='nombre' label='Nombre' required />
          <FormField
            name='organismo_id' label='Organismo' accepter={SelectPicker} data={organismos.map(d => ({
              label: d.nombre,
              value: d.id
            }))} block required
          />
          <FormField name='correo' label='Correo' required />
        </Col>
        <Col xs={24} sm={12}>
          <FormField name='abreviatura' label='Abreviatura' required />
          <FormField name='telefono' label='Teléfono' required />
          <FormField
            name='municipio_id' label='Provincia y Municipio' accepter={SelectPicker} data={provincias.map(d => ({
              label: d.municipio_nombre,
              value: d.municipio_id,
              agrupar: d.provincia
            }))}
            renderMenuGroup={(label, item) => <strong>{label} ({item.children.length})</strong>}
            groupBy='agrupar' block required
          />
        </Col>
        <Col xs={24} className='mt-4'>
          <FormField name='direccion' label='Dirección' accepter={Textarea} rows={3} required />
        </Col>
        <Col xs={24} className='mt-4'>
          <ButtonToolbar>
            <Button
              icon='save'
              text='Guardar'
              appearance='primary'
              onClick={handleSubmit}
              loading={isAdd()}
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
    </div>
  )

  return (
    <>
      {
        isLoading()
          ? renderForm()
          : <Loader.Paragraph rows={7} />
      }
      <Loader.Dialog loading={isAdd()} content='Guardando' />
    </>
  )
}
