import { Col, Form, Button, ButtonToolbar } from 'rsuite'

import { InputPassword } from 'components'
import useChangePassword from './useChangePassword'

export default function ChangePassword ({ closeModal }) {
  const {
    formRef,
    formValue,
    setFormValue,
    formModel,
    handleSubmit
  } = useChangePassword({ closeModal })

  return (
    <Form
      fluid
      ref={formRef}
      onChange={setFormValue}
      formValue={formValue}
      model={formModel}
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
        <h4>Requisitos de la contraseña:</h4>
        <ul>
          <li>Caracteres en mayúsculas y minúsculas.</li>
          <li>Un mínimo de 8 caracteres.</li>
          <li>Un máximo de 16 caracteres.</li>
          <li>Carácter especial ($@$!%/*+?&).</li>
        </ul>
      </Col>
      <Col xs={24} className='mt-4'>
        <ButtonToolbar>
          <Button appearance='primary' size='sm' onClick={handleSubmit}>
            Cambiar Contraseña
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
