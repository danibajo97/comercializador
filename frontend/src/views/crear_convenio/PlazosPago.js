import React, { useState } from 'react'
import {
  Card,
  Container,
  CardHeader,
  CardBody
} from 'reactstrap'
import {
  Row,
  Col,
  Button
} from 'rsuite'
import { useNavigate } from 'react-router-dom'

import { DefaultHeader } from 'components'
import AsociarPlazosPago from './components/PlazosPagoPanel/AsociarPlazosPago'
import AsociarServicios from './components/PlazosPagoPanel/AsociarServicios'

function PlazosPago (props) {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(null)

  return (
    <>
      <DefaultHeader />
      <Container className='mt--7' fluid>
        <Row>
          <Col xs={24}>
            <Card className='bg-secondary shadow'>
              <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                  <Col xs={16}>
                    <h3 className='mb-0'>Convenios <span className='text-muted'>(Plazos de Pago)</span></h3>
                  </Col>
                  <Col className='text-right' xs={8}>
                    <Button
                      size='sm'
                      appearance='default'
                      onClick={() => navigate(-1)}
                    >
                      <i className='fa fa-arrow-left mr-2' />
                      Atrás
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs={24}>
                    <Row>
                      <Col xs={24} sm={24} md={24} lg={12} className='mb-3'>
                        <AsociarPlazosPago setSelectedId={setSelectedId} />
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12}>
                        <AsociarServicios id={selectedId} />
                      </Col>
                    </Row>
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

export default PlazosPago
