import {
  Card,
  CardBody,
  Row,
  Col,
  Container
} from 'reactstrap'
import { Form, Button } from 'rsuite'

import { DefaultHeader, FormField, InputPassword } from 'components'
import useHeader from 'hooks/useHeader'
import useActivateAccount from './useActivateAccount'

export default function ActivateAccount () {
  useHeader({ title: 'Activar Cuenta' })
  const { formRef, formValue, setFormValue, formModel, onClickActivateAccount } = useActivateAccount()

  return (
    <>
      <DefaultHeader height={6} />
      <Container className='mt--8' fluid>
        <Row>
          <Col xs='12' sm='8' md='6' lg='5' xl='3' className='center'>
            <Card className='bg-secondary shadow p-3 '>
              <CardBody>
                <Col>
                  <div className='text-center text-muted mb-5'>
                    <h3>Comercializador - Datazucar</h3>
                    <small>Bienvenido al comercializador, ingrese sus datos para poder activar su cuenta.</small>
                  </div>
                  <Form
                    fluid
                    ref={formRef}
                    onChange={setFormValue}
                    formValue={formValue}
                    model={formModel}
                  >
                    <Row>
                      <Col xs='12' className='mb-3'>
                        <FormField name='firstname' label='Nombre' />
                        <FormField name='lastname' label='Apellidos' />
                        <FormField name='username' label='Usuario' />
                        <InputPassword name='password' label='Contraseña' />
                        <div className='mb-4' />
                        <InputPassword name='repassword' label='Repetir Contraseña' />
                      </Col>
                      <Col className='text-center mt-4'>
                        <Button appearance='primary' size='sm' onClick={onClickActivateAccount}>
                          Activar Cuenta
                          <i className='fa fa-arrow-right ml-2' />
                        </Button>
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
