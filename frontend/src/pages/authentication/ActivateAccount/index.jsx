import {
  Card,
  CardBody,
  Row,
  Col,
  Container
} from 'reactstrap'
import { useParams } from 'react-router-dom'
import { Form, Button } from 'rsuite'

import { DefaultHeader, FormField } from 'components'
import useHeader from 'hooks/useHeader'
import InputPassword from 'components/form/InputPassword'
import useActivateAccount from './useActivateAccount'

export default function ActivateAccount () {
  useHeader({ title: 'Activar Cuenta' })
  // const navigate = useNavigate()
  const { formRef, formValue, setFormValue, formModel, onClickActivateAccount } = useActivateAccount()

  const params = useParams()
  const { uuid, token } = params

  return (
    <>
      <DefaultHeader height={8} />
      <Container className='mt--7' fluid>
        <Row>
          <Col xs='12' sm='12' md='8' lg='7' xl='6' xxl='5' className='center'>
            <Card className='bg-secondary shadow p-3'>
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
                      <Col xs='12' sm='6' className='mb-4'>
                        <FormField name='first_name' label='Nombre' />
                      </Col>
                      <Col xs='12' sm='6' className='mb-4'>
                        <FormField name='last_name' label='Apellidos' />
                      </Col>
                      <Col xs='12' sm='6' className='mb-4'>
                        <InputPassword name='password' label='Contraseña' />
                      </Col>
                      <Col xs='12' sm='6' className='mb-4'>
                        <InputPassword name='repeat_password' label='Repetir Contraseña' />
                      </Col>
                    </Row>
                    <Row>
                      <Col className='text-center mt-4'>
                        <Button appearance='primary' size='sm' onClick={() => onClickActivateAccount(uuid, token)}>
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
