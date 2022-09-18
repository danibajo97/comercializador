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

export default function Login ({ setHeaderVisible }) {
  const navigate = useNavigate()

  useEffect(() => { setHeaderVisible(false) }, [])

  const irCrearCuenta = evt => {
    evt.preventDefault()
    navigate('/register')
  }

  return (
    <>
      <DefaultHeader height={8} />
      <Container className='mt--7' fluid>
        <Row>
          <Col xs='12' sm='8' md='6' lg='5' xl='4' xxl='3' className='center'>
            <Card className='bg-secondary shadow p-3'>
              <CardBody>
                <Col>
                  <div className='text-center text-muted mb-5'>
                    <h3>Comercializador - Datazucar</h3>
                    <small>Inicia Sesión con sus Credenciales</small>
                  </div>
                  <Form fluid>
                    <Row>
                      <Col xs='12'>
                        <FormField name='username' label='Usuario' />
                        <InputPassword name='password' label='Contraseña' />
                      </Col>
                      <Col xs='12'>
                        <div className='text-center'>
                          <Button className='mt-4' appearance='primary' size='sm'>
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
              <Col className='text-left' xs='6'>
                <a
                  className='text-muted'
                  href='#pablo'
                  onClick={(e) => e.preventDefault()}
                >
                  <small>¿Se te olvidó tu contraseña?</small>
                </a>
              </Col>
              <Col className='text-right' xs='6'>
                <a
                  className='text-muted'
                  href='#pablo'
                  onClick={irCrearCuenta}
                >
                  <small>Crear una nueva cuenta</small>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}
