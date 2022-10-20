import React, { useState } from 'react'
import { Card, Container, CardHeader } from 'reactstrap'
import { Row, Col, Button } from 'rsuite'
import { useNavigate } from 'react-router-dom'

import { DefaultHeader } from 'components'
import AsociarPlazosPago from './components/PlazosPagoPanel/AsociarPlazosPago'
import AsociarServicios from './components/PlazosPagoPanel/AsociarServicios'
import useModal from 'hooks/useModal'
import { PlazosPagoForm } from './components/PlazosPagoPanel/PlazosPagoForm'
import { AsociarServiciosForm } from './components/PlazosPagoPanel/AsociarServiciosForm'

function PlazosPago () {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(null)

  const modalPlazoPago = useModal({
    title: 'Nuevo Plazos de Pagos',
    renderBody: ({ closeModal }) => {
      return <PlazosPagoForm closeModal={closeModal} />
    }
  })

  const modalServicio = useModal({
    title: 'Nuevo Servicios',
    renderBody: ({ closeModal }) => {
      return <AsociarServiciosForm closeModal={closeModal} />
    }
  })

  const col = { xs: 24, sm: 24, md: 24, lg: 24, xl: 12 }

  return (
    <>
      {modalPlazoPago.modal}
      {modalServicio.modal}
      <DefaultHeader />
      <Container className='mt--7' fluid>
        <Row>
          <Col {...col} className='mb-2'>
            <Card className='bg-secondary shadow'>
              <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                  <Col xs={16}>
                    <h3 className='mb-0'>Convenios <span className='text-muted'>(Plazos de Pago)</span></h3>
                  </Col>
                  <Col className='text-right' xs={8}>
                    <Button appearance='primary' size='sm' color='blue' onClick={() => modalPlazoPago.openModal()} className='mr-2'>Adicionar</Button>
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
              <AsociarPlazosPago setSelectedId={setSelectedId} />
            </Card>
          </Col>
          <Col {...col}>
            <Card className='bg-secondary shadow'>
              <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                  <Col xs={16}>
                    <h3 className='mb-0'>Convenios <span className='text-muted'>(Asociar Servicios a Plazo de Pago)</span>
                    </h3>
                  </Col>
                  <Col className='text-right' xs={8}>
                    <Button appearance='primary' size='sm' color='blue' onClick={() => modalServicio.openModal()} disabled={selectedId === null}>Adicionar</Button>
                  </Col>
                </Row>
              </CardHeader>
              <AsociarServicios id={selectedId} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PlazosPago
