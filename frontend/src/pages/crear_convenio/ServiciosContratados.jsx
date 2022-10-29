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
import { useNavigate } from 'react-router-dom'

import { DefaultHeader } from 'components'
import ServiciosContratadosPanel from './components/ServiciosContratadosPanel'

function ServiciosContratados (props) {
  const navigate = useNavigate()

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
                      size='sm'
                      appearance='default'
                      onClick={() => navigate(-1)}
                    >
                      <i className='d-sm-block d-md-none fa fa-arrow-left' />
                      <div className='mf-2 d-none d-md-inline-block'>Atrás</div>
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs='12'>
                    <Panel bordered>
                      <ServiciosContratadosPanel />
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
