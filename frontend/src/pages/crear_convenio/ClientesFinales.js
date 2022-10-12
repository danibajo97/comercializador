import React from 'react'
import {
  Card,
  Row,
  Col,
  Container,
  CardHeader,
  CardBody
} from 'reactstrap'
import { Button, Panel } from 'rsuite'
import { useNavigate } from 'react-router-dom'

import { DefaultHeader } from 'components'
import ClientesFinalesPanel from './components/ClientesFinalesPanel'
import ClienteForm from './components/ClienteForm'
import useModal from 'hooks/useModal'

function ClientesFinales () {
  const navigate = useNavigate()
  const { modal, openModal } = useModal({
    title: 'Nuevo Cliente',
    renderBody: ({ closeModal }) => {
      return <ClienteForm closeModal={closeModal} />
    }
  })

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
                    <h3 className='mb-0'>Convenios <span className='text-muted'>(Clientes Finales)</span></h3>

                  </Col>
                  <Col className='text-right' xs='4'>
                    <Button
                      className='mr-2'
                      size='sm'
                      appearance='primary'
                      onClick={openModal}
                    >
                      Nuevo Cliente
                    </Button>
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
                  <Col xs='12'>
                    <Panel bordered>
                      <ClientesFinalesPanel />
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
