import React from 'react'

import { Col, Form, Button, ButtonToolbar, Schema } from 'rsuite'

import { InputPassword } from 'components'

function ChangePassword ({ changePassword, closeModal }) {
  const formRef = React.useRef()

  const [formValue, setFormValue] = React.useState({
    password: '',
    newPassword: '',
    repeatPassword: ''
  })

  const { StringType } = Schema.Types
  const model = Schema.Model({
    password: StringType().isRequired('Este campo es obligatorio.'),
    newPassword: StringType().isRequired('Este campo es obligatorio.'),
    repeatPassword: StringType().isRequired('Este campo es obligatorio.')
  })

  const handleSubmit = () => {
    if (formRef.current.check()) {
      changePassword({ ...formValue })
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
      <Col xs={24}>
        <InputPassword name='password' label='Contraseña' />
      </Col>
      <Col xs={24} className='mt-3'>
        <InputPassword name='newPassword' label='Nueva Contraseña' />
      </Col>
      <Col xs={24} className='mt-3'>
        <InputPassword name='repeatPassword' label='Repetir Contraseña' />
      </Col>
      <Col xs={24} className='mt-4'>
        <ButtonToolbar>
          <Button appearance='primary' size='sm' onClick={handleSubmit}>
            Cambiar
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

export default ChangePassword
