import React, { useState } from 'react'
import { Card, Container, CardHeader } from 'reactstrap'
import { Row, Col, Button } from 'rsuite'
import { useNavigate, useParams } from 'react-router-dom'

import { DefaultHeader } from 'components'
import AsociarPlazosPago from './components/PlazosPagoPanel/AsociarPlazosPago'
import AsociarServicios from './components/PlazosPagoPanel/AsociarServicios'
import useModal from 'hooks/useModal'
import { PlazosPagoForm } from './components/PlazosPagoPanel/PlazosPagoForm'
import { AsociarServiciosForm } from './components/PlazosPagoPanel/AsociarServiciosForm'
import useConvenio from 'hooks/useConvenio'

function PlazosPago () {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(null)

  const params = useParams()
  const { id } = params

  const { convenio } = useConvenio({ id })

  const modalPlazoPago = useModal({
    title: 'Nuevo Plazos de Pagos',
    renderBody: ({ closeModal }) => {
      return <PlazosPagoForm closeModal={closeModal} convenioId={id} />
    }
  })

  const modalServicio = useModal({
    title: 'Nuevo Servicios',
    renderBody: ({ closeModal }) => {
      return <AsociarServiciosForm closeModal={closeModal} />
    }
  })

  const isComfirmado = () => convenio && convenio.estado === 3

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
                    <Button appearance='primary' size='sm' hidden={isComfirmado()} color='blue' onClick={() => modalPlazoPago.openModal()} className='mr-2'>
                      <i className='d-sm-block d-md-none fa fa-plus' />
                      <div className='mf-2 d-none d-md-inline-block'>Adicionar</div>
                    </Button>
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
              <AsociarPlazosPago setSelectedId={setSelectedId} isConfirmado={isComfirmado()} />
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
                    <Button appearance='primary' size='sm' hidden={isComfirmado()} color='blue' onClick={() => modalServicio.openModal()} disabled={selectedId === null}>
                      <i className='d-sm-block d-md-none fa fa-plus' />
                      <div className='mf-2 d-none d-md-inline-block'>Adicionar</div>
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <AsociarServicios id={selectedId} isConfirmado={isComfirmado()} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PlazosPago
