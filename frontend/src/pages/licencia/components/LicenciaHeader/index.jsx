import useAuth from 'hooks/useAuth'
import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import { CardHeader } from 'components'

const ConvenioHeader = ({ totalLicencia, totalOtorgada, totalPendiente }) => {
  const { user } = useAuth()

  const col = { xl: 3, lg: 6, md: 6, sm: 6, xs: 12 }
  return (
    <>
      <div className='header bg-gradient-info pb-8 pt-7 pt-md-8'>
        <Container fluid>
          <div className='header-body'>
            <Row>
              <Col {...col}>
                <CardHeader title='Cliente' value={user?.distribuidor?.nombre || 'Cargando...'} icon='user' color='info' />
              </Col>
              <Col {...col}>
                <CardHeader title='Total de licencias' value={totalLicencia || 0} icon='id-card' color='blue' />
              </Col>
              <Col {...col}>
                <CardHeader title='Otorgada' value={totalOtorgada || 0} icon='check-square' color='success' />
              </Col>
              <Col {...col}>
                <CardHeader title='Pendiente' value={totalPendiente || 0} icon='edit' color='warning' />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default ConvenioHeader
