import React from 'react'
import {
  Card,
  Row,
  Col,
  Container,
  CardHeader
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dropdown, Popover } from 'rsuite'

import { DefaultHeader, Loader } from 'components'
import LicenciaTable from './components/LicenciaTable'
import LicenciaForm from './components/LicenciaForm'
import useModal from 'hooks/useModal'

import { getSolicitudLicenciaAll, stateResetOperation } from 'redux/solicitudLicencia/solicitudLicenciaSlice'
import OPERATIONS from 'constants/operationsRedux'

export default function SolicitudLicencia () {
  const dispatch = useDispatch()
  const { modal, openModal } = useModal({
    title: 'Nueva Solicitud de Licencia',
    size: 'sm',
    renderBody: ({ closeModal }) => {
      return <LicenciaForm closeModal={closeModal} />
    }
  })

  const solicitudLicencias = useSelector(state => state.solicitudLicencia.solicitudLicencias)
  const isList = useSelector(state => state.solicitudLicencia.isList)

  React.useEffect(() => {
    dispatch(getSolicitudLicenciaAll({ page: 1 }))

    return () => {
      dispatch(stateResetOperation())
    }
  }, [])

  return (
    <>
      {modal}
      <DefaultHeader />
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
