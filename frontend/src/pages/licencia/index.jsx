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
import useFilterLicencia from './useFilterLicencia'

export default function SolicitudLicencia () {
  const {
    user,
    title,
    modal,
    openModal,
    solicitudLicencias,
    isList,
    totalLicencia,
    totalOtorgada,
    totalPendiente,
    pagination,
    setValueFilter
  } = useLicencia()

  useHeader({ title: title() })

  const { drawerFilter, open } = useFilterLicencia({ setValueFilter })

  return (
    <>
      {drawerFilter}
      {modal}
      {user?.rol === ROL.CLIENTE
        ? <ConvenioHeader totalLicencia={totalLicencia} totalOtorgada={totalOtorgada} totalPendiente={totalPendiente} />
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
                    <Button appearance='primary' size='sm' onClick={open}>
                      <i className='d-sm-block d-md-none fa fa-filter ' />
                      <div className='mf-2 d-none d-md-inline-block'>Filtrar</div>
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <Row>
                <Col>
                  {isList === OPERATIONS.FULFILLED
                    ? <LicenciaTable clientes={solicitudLicencias} pagination={pagination} />
                    : <Loader.Grid rows={8} columns={7} />}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
