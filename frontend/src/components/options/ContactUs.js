import React from 'react'

import { Col, Form, Button, ButtonToolbar, Schema } from 'rsuite'

import { FormField, Textarea } from 'components'

function ContactUs ({ closeModal }) {
  const formRef = React.useRef()

  const [formValue, setFormValue] = React.useState({
    asunto: '',
    descripcion: ''
  })

  const { StringType } = Schema.Types
  const model = Schema.Model({
    asunto: StringType().isRequired('Este campo es obligatorio.'),
    descripcion: StringType().isRequired('Este campo es obligatorio.')
  })

  const handleSubmit = () => {
    if (formRef.current.check()) {
      if (closeModal) closeModal()
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
      <Col xs={24} className='mt-3'>
        <FormField name='asunto' label='Asunto' required />
      </Col>
      <Col xs={24} className='mt-3'>
        <FormField name='descripcion' label='Descripción' accepter={Textarea} rows={5} required />
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
}

export default ContactUs
