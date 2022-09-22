import React, { useEffect } from 'react'
import {
  Card,
  CardBody,
  Row,
  Col,
  Container
} from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Schema } from 'rsuite'

import { DefaultHeader, FormField } from 'components'
import useHeader from 'hooks/useHeader'

export default function ForgotPassword () {
  useHeader({ title: ' Olvidado su Contraseña' })
  const navigate = useNavigate()

  const { StringType } = Schema.Types
  const model = Schema.Model({
    email: StringType()
      .isEmail('Por favor, introduce una dirección de correo electrónico válida.')
      .isRequired('Este campo es obligatorio.')
  })

  const irInicioSesion = evt => {
    evt.preventDefault()
    navigate('/login')
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
                    <small>Se has olvidado su contraseña</small>
                  </div>
                  <Form model={model} fluid>
                    <Row>
                      <Col xs='12'>
                        <FormField name='email' label='Entre su correo' />
                      </Col>
                      <Col xs='12'>
                        <div className='text-center'>
                          <Button className='mt-4' appearance='primary' size='sm'>
                            Seguir
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
              <Col className='text-center'>
                <a
                  className='text-muted'
                  href='#pablo'
                  onClick={irInicioSesion}
                >
                  <small>Ir al Inicia de Sesión</small>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}
