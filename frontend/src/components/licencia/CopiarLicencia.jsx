import { useState, useEffect } from 'react'
import { ButtonToolbar, Col, Form } from 'rsuite'

import OPERATIONS from 'constants/operationsRedux'
import { Textarea, FormField, Button, InputPassword } from 'components'
import useAuth from 'hooks/useAuth'

export default function CopiarLicencia ({ textLicencia, closeModal }) {
  const {
    isVerifyPassword,
    hasPassword,
    verifyPassword,
    stateVerifyPassword
  } = useAuth()

  const [isCopiado, setIsCopiado] = useState(false)
  const [password, setPassword] = useState(false)

  const copyToTextArea = () => {
    navigator.clipboard.writeText(textLicencia)
    setIsCopiado(true)
  }

  useEffect(() => {
    return () => stateVerifyPassword()
  }, [])

  const formCopiarLicencia = () => (
    <Form
      fluid
      formValue={{
        licencia: textLicencia
      }}
    >
      <FormField name='licencia' label='' accepter={Textarea} rows={5} disabled />
      <Col xs={24} className='mt-0 ml--1'>
        <ButtonToolbar>
          <Button
            icon='copy'
            text={isCopiado ? 'Copiado' : 'Copiar Licencia'}
            appearance='primary'
            onClick={copyToTextArea}
            disabled={isCopiado}
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

  const formPassword = () => (
    <Form
      fluid
    >
      <Col xs={24}>
        <InputPassword name='password' onChange={value => setPassword(value)} label='Entre su Contraseña' />
      </Col>
      <Col xs={24} className='mt-4'>
        <ButtonToolbar>
          <Button
            icon='key'
            text='Verificar Contraseña'
            appearance='primary'
            onClick={() => verifyPassword({ password })}
            loading={isVerifyPassword === OPERATIONS.PENDING}
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
      {hasPassword ? formCopiarLicencia() : formPassword()}
    </>
  )
}
