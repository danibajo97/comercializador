import {
  Card,
  CardBody,
  Row,
  Col,
  Container
} from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'rsuite'

import { DefaultHeader, FormField } from 'components'
import useHeader from 'hooks/useHeader'
import useForgotPassword from './useForgotPassword'

export default function ForgotPassword () {
  useHeader({ title: ' Olvidado su Contraseña' })
  const navigate = useNavigate()
  const { formRef, formValue, setFormValue, formModel, onClickForgotPassword } = useForgotPassword()

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
                  <Form
                    fluid
                    ref={formRef}
                    onChange={setFormValue}
                    formValue={formValue}
                    model={formModel}
                  >
                    <Row>
                      <Col xs='12'>
                        <FormField name='email' label='Entre su correo' />
                      </Col>
                      <Col xs='12'>
                        <div className='text-center'>
                          <Button className='mt-4' appearance='primary' size='sm' onClick={onClickForgotPassword}>
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
                  style={{ cursor: 'pointer' }}
                  className='text-muted'
                  onClick={() => navigate('/login')}
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
