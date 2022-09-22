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

export default function Register () {
  useHeader({ title: 'Nueva Cuenta' })
  const navigate = useNavigate()

  const irInicioSesion = evt => {
    evt.preventDefault()
    navigate('/login')
  }

  return (
    <>
      <DefaultHeader height={7} />
      <Container className='mt--7' fluid>
        <Row>
          <Col xs='12' sm='12' md='8' lg='7' xl='6' xxl='5' className='center'>
            <Card className='bg-secondary shadow p-3'>
              <CardBody>
                <Col>
                  <div className='text-center text-muted mb-5'>
                    <h3>Comercializador - Datazucar</h3>
                    <small>Crear una nueva cuenta</small>
                  </div>
                  <Form fluid>
                    <Row>
                      <Col xs='12' sm='6' className='mb-4'>
                        <FormField name='firstname' label='Nombre' required />
                        <FormField name='username' label='Usuario' required />
                        <InputPassword name='password' label='Contraseña' required />
                      </Col>
                      <Col xs='12' sm='6'>
                        <FormField name='lastname' label='Apellidos' required />
                        <FormField name='email' label='Correo' required />
                        <InputPassword name='re_password' label='Repetir Contraseña' required />
                      </Col>
                    </Row>
                    <div className='text-center'>
                      <Button className='mt-4' appearance='primary' size='sm'>
                        Crear Cuenta
                      </Button>
                    </div>
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
