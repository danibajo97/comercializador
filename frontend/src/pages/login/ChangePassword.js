import React from 'react'
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
import InputPassword from 'components/form/InputPassword'

export default function ChangePassword () {
  useHeader({ title: 'Cambiar Contraseña' })
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
                    <small>Bienvenido al comercializador, escriba su nueva contraseña</small>
                  </div>
                  <Form model={model} fluid>
                    <Row>
                      <Col xs='12' className='mb-3'>
                        <InputPassword name='password' label='Contraseña' />
                      </Col>
                      <Col xs='12'>
                        <InputPassword name='repeat_password' label='Repetir Contraseña' />
                      </Col>
                      <Col xs='12'>
                        <div className='text-center'>
                          <Button className='mt-4' appearance='primary' size='sm'>
                            Cambiar
                            <i className='fa fa-arrow-right ml-2' />
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
