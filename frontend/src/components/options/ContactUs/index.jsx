import { useRef, useState } from 'react'
import { Col, Form, ButtonToolbar, Schema } from 'rsuite'

import { FormField, Textarea, Button } from 'components'

function ContactUs ({ closeModal }) {
  const formRef = useRef()

  const [formValue, setFormValue] = useState({
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
          <Button
            icon='paper-plane'
            text='Enviar'
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
}

export default ContactUs
