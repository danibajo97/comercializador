import React, { useEffect } from 'react'
import {
  Card,
  CardBody,
  Row,
  Col,
  Container
} from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'rsuite'

import { DefaultHeader, FormField, InputPassword } from 'components'
import useHeader from 'hooks/useHeader'
import useLogin from './useLogin'

export default function Login () {
  useHeader({ title: 'Inicia Sesión' })
  const navigate = useNavigate()
  const { formRef, formValue, setFormValue, formModel, handleSubmit, isAuth, isLoading } = useLogin()

  useEffect(() => {
    if (isLoading === false && isAuth) navigate('/')
  }, [isLoading, isAuth])

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
                    model={formModel}
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
                  style={{ cursor: 'pointer' }}
                  className='text-muted'
                  onClick={() => navigate('/forgot-password')}
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
