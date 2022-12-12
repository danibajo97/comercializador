import {
  Card,
  Row,
  Col,
  Container,
  CardHeader,
  CardBody
} from 'reactstrap'
import { Panel } from 'rsuite'
import { useNavigate, useParams } from 'react-router-dom'

import { DefaultHeader, Button } from 'components'
import ClientesFinalesForm from './ClientesFinalesForm'
import useHeader from 'hooks/useHeader'

function ClientesFinales () {
  useHeader({ title: 'Convenios' })
  const navigate = useNavigate()

  const params = useParams()
  const { id } = params

  return (
    <>
      <DefaultHeader />
      <Container className='mt--7' fluid>
        <Row>
          <Col>
            <Card className='bg-secondary shadow'>
              <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                  <Col xs='6' md='4'>
                    <h3 className='mb-0'>Convenios <span className='text-muted'>(Clientes Finales)</span></h3>

                  </Col>
                  <Col className='text-right' xs='6' md='8'>
                    <Button
                      icon='arrow-left'
                      text='Atrás'
                      appearance='default'
                      onClick={() => navigate('/')}
                      className='mr-2'
                    />
                    <Button
                      icon='arrow-right'
                      text='Ir a servicios contratados'
                      appearance='primary'
                      onClick={() => navigate(`/servicios-contratados/${id}`)}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs='12'>
                    <Panel bordered>
                      <ClientesFinalesForm />
                    </Panel>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ClientesFinales
