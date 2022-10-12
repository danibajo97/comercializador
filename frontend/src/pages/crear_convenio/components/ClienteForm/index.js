import React from 'react'
import { Col, Form, Button, ButtonToolbar, Schema, SelectPicker } from 'rsuite'

import { FormField, Textarea } from 'components'

export default function ClienteForm ({ closeModal }) {
  const formRef = React.useRef()

  const [formValue, setFormValue] = React.useState({
    nombre: '',
    abreviatura: '',
    organismo: '',
    telefono: '',
    correo: '',
    pais: '',
    provNumi: '',
    direccion: ''
  })

  const { StringType } = Schema.Types
  const model = Schema.Model({
    nombre: StringType().isRequired('Este campo es obligatorio.'),
    abreviatura: StringType(),
    organismo: StringType().isRequired('Este campo es obligatorio.'),
    telefono: StringType(),
    correo: StringType().isRequired('Este campo es obligatorio.'),
    pais: StringType().isRequired('Este campo es obligatorio.'),
    provNumi: StringType().isRequired('Este campo es obligatorio.'),
    direccion: StringType()
  })

  const handleSubmit = () => {
    if (formRef.current.check()) { if (closeModal) closeModal() }
  }

  return (
    <div>
      <Form
        fluid
        ref={formRef}
        onChange={setFormValue}
        formValue={formValue}
        model={model}
      >
        <Col xs={12}>
          <FormField name='nombre' label='Nombre' required />
          <FormField name='organismo' label='Organismo' required />
          <FormField name='correo' label='Correo' required />
          <FormField name='provNumi' label='Provincia y Municipio' accepter={SelectPicker} data={[]} block required />
        </Col>
        <Col xs={12}>
          <FormField name='abreviatura' label='Abreviatura' />
          <FormField name='telefono' label='Teléfono' />
          <FormField name='pais' label='País' accepter={SelectPicker} data={[]} block required />
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
}
