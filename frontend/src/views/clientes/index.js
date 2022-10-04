import React from 'react'
import {
  Card,
  Row,
  Col,
  Container,
  CardHeader
} from 'reactstrap'
import { Button } from 'rsuite'

import { DefaultHeader } from 'components'
import ClienteForm from 'views/crear_convenio/components/ClienteForm'
import useModal from 'hooks/useModal'
import ClientesTable from './components/ClientesTable'
import { clienteFinal } from 'constants/mock'

function Clientes () {
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
                    <h3 className='mb-0'>Clientes</h3>
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
                  </Col>
                </Row>
              </CardHeader>
              <Row>
                <Col>
                  <ClientesTable clientes={clienteFinal} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Clientes
