import React, { useState, useEffect } from 'react'
import {
  Card,
  CardBody,
  Row,
  Col,
  Container
} from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Schema } from 'rsuite'

import { DefaultHeader, FormField, InputPassword } from 'components'
import useHeader from 'hooks/useHeader'
import useAuth from 'hooks/useAuth'

export default function Login () {
  const { isAuth, isLoading, login } = useAuth()
  const navigate = useNavigate()

  useHeader({ title: 'Inicia Sesión' })

  useEffect(() => {
    if (isLoading === false && isAuth) navigate('/')
  }, [isLoading, isAuth])

  const formRef = React.useRef()
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const { StringType } = Schema.Types
  const model = Schema.Model({
    email: StringType().isEmail('Este campo no es un correo.').isRequired('Este campo es obligatorio.'),
    password: StringType().isRequired('Este campo es obligatorio.')
  })

  const irForgotPassword = evt => {
    evt.preventDefault()
    navigate('/forgot-password')
  }

  const handleSubmit = () => {
    if (formRef.current.check()) {
      login({ email: formValue.email, password: formValue.password })
    }
  }

  return (
    <>
      <DefaultHeader height={8} />
      <Container className='mt--7' fluid>
        <Row>
          <Col xs='12' sm='8' md='6' lg='5' xl='3' className='center'>
            <Card className='bg-secondary shadow p-3'>
              <CardBody>
                <Col>
                  <div className='text-center text-muted mb-5'>
                    <h3>Comercializador - Datazucar</h3>
                    <small>Inicia Sesión con sus Credenciales</small>
                  </div>
                  <Form
                    fluid
                    ref={formRef}
                    onChange={setFormValue}
                    formValue={formValue}
                    model={model}
                  >
                    <Row>
                      <Col xs='12'>
                        <FormField name='email' label='Correo' />
                        <InputPassword name='password' label='Contraseña' />
                      </Col>
                      <Col xs='12'>
                        <div className='text-center'>
                          <Button className='mt-4' appearance='primary' size='sm' onClick={handleSubmit} loading={isLoading}>
                            Iniciar Sesión
                            <i className='fa fa-arrow-right ml-2' />
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </CardBody>
            </Card>
            <Row className='mt-3'>
              <Col className='text-center' xs='12'>
                <a
                  className='text-muted'
                  href='#pablo'
                  onClick={irForgotPassword}
                >
                  <small>¿Se te olvidó tu contraseña?</small>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}
