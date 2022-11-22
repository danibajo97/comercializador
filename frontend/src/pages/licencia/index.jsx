import React from 'react'
import {
  Card,
  Row,
  Col,
  Container,
  CardHeader
} from 'reactstrap'
import { Button } from 'rsuite'

import { DefaultHeader, Loader } from 'components'
import LicenciaTable from './components/LicenciaTable'

import OPERATIONS from 'constants/operationsRedux'
import ConvenioHeader from 'pages/licencia/components/LicenciaHeader'
import ROL from 'constants/rol'
import useHeader from 'hooks/useHeader'
import useLicencia from './useLicencia'

export default function SolicitudLicencia () {
  const { user, title, modal, openModal, solicitudLicencias, isList } = useLicencia()
  useHeader({ title: title() })

  return (
    <>
      {modal}
      {user?.rol === ROL.CLIENTE
        ? <ConvenioHeader totalLicencia={0} totalOtorgada={0} totalPendient={0} />
        : <DefaultHeader />}
      <Container className='mt--7' fluid>
        <Row>
          <Col>
            <Card className='bg-secondary shadow'>
              <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                  <Col xs='8'>
                    <h3 className='mb-0'>Solicitud de Licencia</h3>
                  </Col>
                  <Col className='text-right' xs='4'>
                    <Button
                      className='mr-2'
                      size='sm'
                      appearance='primary'
                      onClick={openModal}
                    >
                      <i className='d-sm-block d-md-none fa fa-plus' />
                      <div className='mf-2 d-none d-md-inline-block'>Nueva Licencia</div>
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <Row>
                <Col>
                  {isList === OPERATIONS.FULFILLED ? <LicenciaTable clientes={solicitudLicencias} /> : <Loader.Paragraph rows={3} />}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
