import React, { useState } from 'react'
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
import DatosGeneralesForm from './DatosGeneralesForm'
import useHeader from 'hooks/useHeader'

function DatosGenerales (props) {
  const [countBD, setCountBD] = useState(1)
  useHeader({ title: 'Convenios' })
  const navigate = useNavigate()

  const params = useParams()
  const { id } = params

  const botonSiguiente = (db) => {
    if (id === undefined) return <></>
    else {
      const botonText = parseInt(db) === 1 ? 'servicios contratados' : 'clientes finales'
      const botonURL = parseInt(db) === 1 ? 'servicios-contratados' : 'clientes-finales'
      return (
        <Button
          size='sm'
          appearance='primary'
          onClick={() => navigate(`/${botonURL}/${id}`)}
        >
          <i className='d-sm-block d-md-none fa fa-arrow-right' />
          <div className='mf-2 d-none d-md-inline-block'>Ir a {botonText}</div>
        </Button>
      )
    }
  }

  return (
    <>
      <DefaultHeader />
      <Container className='mt--7' fluid>
        <Row>
          <Col>
            <Card className='bg-secondary shadow'>
              <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                  <Col xs='8'>
                    <h3 className='mb-0'>Convenios <span className='text-muted'>(Datos Generales)</span></h3>
                  </Col>
                  <Col className='text-right' xs='4'>
                    <Button
                      className='mr-2'
                      size='sm'
                      appearance='default'
                      onClick={() => navigate(-1)}
                    >
                      <i className='d-sm-block d-md-none fa fa-arrow-left' />
                      <div className='mf-2 d-none d-md-inline-block'>Atrás</div>
                    </Button>
                    {botonSiguiente(countBD)}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs='12'>
                    <Panel bordered>
                      <DatosGeneralesForm setCountBD={setCountBD} />
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

export default DatosGenerales
