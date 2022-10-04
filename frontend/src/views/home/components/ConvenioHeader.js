import React from 'react'
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap'

const ConvenioHeader = ({ totalConvenio, totalConfirmado, totalEdicion }) => {
  const col = { xl: 3, lg: 6, md: 6, sm: 6, xs: 12 }
  return (
    <>
      <div className='header bg-gradient-info pb-8 pt-7 pt-md-8'>
        <Container fluid>
          <div className='header-body'>
            {/* Card stats */}
            <Row>
              <Col {...col}>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h5'
                          className='text-uppercase text-muted mb-0'
                        >
                          Distribuidor
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>DeSoft VC</span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-info text-white rounded-circle shadow'>
                          <i className='fas fa-user' />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col {...col}>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h5'
                          className='text-uppercase text-muted mb-0'
                        >
                          Total de Convenios
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>{totalConvenio || 0}</span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-blue text-white rounded-circle shadow'>
                          <i className='fas fa-id-card' />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col {...col}>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h5'
                          className='text-uppercase text-muted mb-0'
                        >
                          Confirmados
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>{totalConfirmado || 0}</span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-success text-white rounded-circle shadow'>
                          <i className='fa fa-check-square' />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col {...col}>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h5'
                          className='text-uppercase text-muted mb-0'
                        >
                          Edición
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>{totalEdicion || 0}</span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-warning text-white rounded-circle shadow'>
                          <i className='fa fa-edit' />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default ConvenioHeader
