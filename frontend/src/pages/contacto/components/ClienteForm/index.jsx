import { Col, Form, Button, ButtonToolbar, SelectPicker } from 'rsuite'

import { FormField, Textarea, Loader } from 'components'
import useClienteForm from './useClienteForm'

export default function ClienteForm ({ closeModal }) {
  const {
    formModel,
    formRef,
    formValue,
    setFormValue,
    provincias,
    handleSubmit,
    isLoading,
    dataOrganismo
  } = useClienteForm({ closeModal })

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
          <FormField name='organismo_id' label='Organismo' accepter={SelectPicker} data={dataOrganismo} block required />
          <FormField name='correo' label='Correo' required />
        </Col>
        <Col xs={24} sm={12}>
          <FormField name='abreviatura' label='Abreviatura' />
          <FormField name='telefono' label='Teléfono' />
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
          <FormField name='direccion' label='Dirección' accepter={Textarea} rows={3} />
        </Col>
        <Col xs={24} className='mt-4'>
          <ButtonToolbar>
            <Button appearance='primary' size='sm' onClick={handleSubmit}>
              Guardar
            </Button>
            {closeModal &&
              <Button appearance='subtle' color='red' size='sm' onClick={closeModal}>
                Cerrar
              </Button>}
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
    </>
  )
}
