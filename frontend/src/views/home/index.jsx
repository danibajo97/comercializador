import React from 'react'
import {
  Card,
  Row,
  Col,
  Container,
  CardHeader
} from 'reactstrap'

import { Header } from 'components'
import ConvenioTable from './componente/ConvenioTable'

export default function Home (props) {
  return (
    <>
      <Header />
      <Container className='mt--7' fluid>
        <Row>
          <Col>
            <Card className='bg-secondary shadow'>
              <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                  <Col xs='8'>
                    <h3 className='mb-0'>Listado de Convenios</h3>
                  </Col>
                  <Col className='text-right' xs='4' />
                </Row>
              </CardHeader>
              <Row>
                <Col>
                  <ConvenioTable />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
