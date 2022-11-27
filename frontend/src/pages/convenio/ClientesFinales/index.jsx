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
import { useNavigate, useParams } from 'react-router-dom'

import { DefaultHeader } from 'components'
import ClientesFinalesForm from './ClientesFinalesForm'
import ClienteForm from 'pages/contacto/components/ClienteForm'
import useModal from 'hooks/useModal'
import useHeader from 'hooks/useHeader'

function ClientesFinales () {
  useHeader({ title: 'Convenios' })

  const params = useParams()
  const { id } = params

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
                      appearance='default'
                      onClick={() => navigate('/')}
                    >
                      <i className='d-sm-block d-md-none fa fa-arrow-left' />
                      <div className='mf-2 d-none d-md-inline-block'>Atrás</div>
                    </Button>
                    <Button
                      className='mr-2'
                      size='sm'
                      appearance='primary'
                      onClick={openModal}
                    >
                      <i className='d-sm-block d-md-none fa fa-plus' />
                      <div className='mf-2 d-none d-md-inline-block'>Nuevo Cliente</div>
                    </Button>
                    <Button
                      size='sm'
                      appearance='primary'
                      onClick={() => navigate(`/servicios-contratados/${id}`)}
                    >
                      <i className='d-sm-block d-md-none fa fa-arrow-right' />
                      <div className='mf-2 d-none d-md-inline-block'>Ir a servicios contratados</div>
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs='12'>
                    <Panel bordered>
                      <ClientesFinalesForm />
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
