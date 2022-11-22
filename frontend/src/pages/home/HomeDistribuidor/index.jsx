import React from 'react'
import { Card, Row, Col, Container, CardHeader } from 'reactstrap'
import { Button, CheckPicker } from 'rsuite'
import { useNavigate } from 'react-router-dom'

import ConvenioTable from './components/ConvenioTable'
import ConvenioHeader from './components/ConvenioHeader'
import { Loader } from 'components'
import useHeader from 'hooks/useHeader'
import useHomeDistribuidor from './useHomeDistribuidor'

export default function HomeDistribuidor () {
  useHeader({ title: 'Inicio' })
  const navigate = useNavigate()
  const { data, loading, totalConvenio, totalConfirmado, totalEdicion, estadoData, onSelectEstado, pagination } = useHomeDistribuidor()

  return (
    <>
      <ConvenioHeader totalConvenio={totalConvenio} totalConfirmado={totalConfirmado} totalEdicion={totalEdicion} />
      <Container className='mt--7' fluid>
        <Row>
          <Col>
            <Card className='bg-secondary shadow'>
              <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                  <Col xs='10' sm='10' md='4'>
                    <h3 className='mb-0'>Listado de Convenios</h3>
                  </Col>
                  <Col className='text-right' xs='2' sm='2' md='8'>
                    <Button appearance='primary' size='sm' onClick={() => navigate('/datos-generales')}>
                      <i className='d-sm-block d-md-none fa fa-plus ' />
                      <div className='mf-2 d-none d-md-inline-block'>Nuevo Convenio</div>
                    </Button>
                    <CheckPicker
                      onSelect={onSelectEstado}
                      className='ml-2 d-none d-md-inline-block'
                      data={estadoData}
                      style={{ width: 180 }}
                      cleanable={false}
                      searchable={false}
                      size='sm'
                      placeholder='Estado'
                    />
                  </Col>
                </Row>
              </CardHeader>
              <Row>
                <Col>
                  {loading
                    ? <ConvenioTable convenios={data} pagination={pagination} />
                    : <Loader.Grid rows={7} columns={6} />}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
