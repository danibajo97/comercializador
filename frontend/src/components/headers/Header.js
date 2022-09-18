import React from 'react'
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

const crearConvenio = () => {
  return (
    <Card className='card-stats mb-4 mb-xl-0' tag={Link} to='/crear-convenio'>
      <CardBody>
        <Row>
          <div className='col'>
            <CardTitle
              tag='h5'
              className='text-uppercase text-muted mb-0'
            >
              Nuevo
            </CardTitle>
            <span className='h2 font-weight-bold mb-0'>
              Convenio
            </span>
          </div>
          <Col className='col-auto'>
            <div className='icon icon-shape bg-info text-white rounded-circle shadow'>
              <i className='fas fa-plus' />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const Header = () => {
  return (
    <>
      <div className='header bg-gradient-info pb-8 pt-7 pt-md-8'>
        <Container fluid>
          <div className='header-body'>
            {/* Card stats */}
            <Row>
              <Col lg='6' xl='3'>
                {crearConvenio()}
              </Col>
              <Col lg='6' xl='3'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h5'
                          className='text-uppercase text-muted mb-0'
                        >
                          New users
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>2,356</span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-warning text-white rounded-circle shadow'>
                          <i className='fas fa-chart-pie' />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='6' xl='3'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h5'
                          className='text-uppercase text-muted mb-0'
                        >
                          Sales
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>924</span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-yellow text-white rounded-circle shadow'>
                          <i className='fas fa-users' />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='6' xl='3'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h5'
                          className='text-uppercase text-muted mb-0'
                        >
                          Performance
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>49,65%</span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-info text-white rounded-circle shadow'>
                          <i className='fas fa-percent' />
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

export default Header
