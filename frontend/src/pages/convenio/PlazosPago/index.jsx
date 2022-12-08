import { Card, Container, CardHeader } from 'reactstrap'
import { Row, Col } from 'rsuite'

import AsociarPlazosPago from './AsociarPlazosPago'
import AsociarServicios from './AsociarServicios'

import { DefaultHeader, Button } from 'components'
import useHeader from 'hooks/useHeader'
import usePlazosPago from './usePlazosPago'

function PlazosPago () {
  useHeader({ title: 'Convenios' })

  const {
    selectedId,
    setSelectedId,
    modalPlazoPago,
    modalServicio,
    isComfirmado,
    goToBack
  } = usePlazosPago()

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
                    <Button
                      icon='plus'
                      text='Adicionar'
                      appearance='primary'
                      hidden={isComfirmado()}
                      onClick={() => modalPlazoPago.openModal()}
                      className='mr-2'
                    />
                    <Button
                      icon='arrow-left'
                      text='Atrás'
                      appearance='default'
                      onClick={goToBack}
                    />
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
                    <Button
                      icon='plus'
                      text='Adicionar'
                      appearance='primary'
                      hidden={isComfirmado()}
                      onClick={() => modalServicio.openModal()}
                      disabled={selectedId === null}
                    />
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
