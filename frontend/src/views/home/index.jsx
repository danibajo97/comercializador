import React from 'react'
import {
  Card,
  Row,
  Col,
  Container,
  CardHeader,
  CardBody
} from 'reactstrap'

import { DefaultHeader } from '../../components'

export default function Home (props) {
  return (
    <>
      <DefaultHeader />
      <Container className='mt--7' fluid>
        <Row>
          <Col className='order-xl-1'>
            <Card className='bg-secondary shadow'>
              <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                  <Col>
                    <h3 className='mb-0'>Card</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <br />
                <br />
                <br />
                <br />
                <br />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
