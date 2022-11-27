import React from 'react'
import {
  Card,
  Row,
  Col,
  Container,
  CardHeader,
  CardBody
} from 'reactstrap'
import { Panel, Button } from 'rsuite'
import { useNavigate, useParams } from 'react-router-dom'

import { DefaultHeader } from 'components'
import ServiciosContratadosForm from './ServiciosContratadosForm'
import useHeader from 'hooks/useHeader'

function ServiciosContratados (props) {
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
                  <Col xs='8'>
                    <h3 className='mb-0'>Convenios <span className='text-muted'>(Servicios Contratados)</span></h3>
                  </Col>
                  <Col className='text-right' xs='4'>
                    <Button
                      className='mr-2'
                      size='sm'
                      appearance='default'
                      onClick={() => navigate('/')}
                    >
                      <i className='d-sm-block d-md-none fa fa-arrow-left' />
                      <div className='mf-2 d-none d-md-inline-block'>Atrás</div>
                    </Button>
                    <Button
                      size='sm'
                      appearance='primary'
                      onClick={() => navigate(`/plazos-pago/${id}`)}
                    >
                      <i className='d-sm-block d-md-none fa fa-arrow-right' />
                      <div className='mf-2 d-none d-md-inline-block'>Ir a plazos de pagos</div>
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs='12'>
                    <Panel bordered>
                      <ServiciosContratadosForm />
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

export default ServiciosContratados
