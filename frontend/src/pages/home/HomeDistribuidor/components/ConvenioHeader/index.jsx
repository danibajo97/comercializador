import { Container, Row, Col } from 'reactstrap'

import useAuth from 'hooks/useAuth'
import { CardHeader } from 'components'

const ConvenioHeader = ({ totalConvenio, totalTerminado, totalEdicion }) => {
  const { user } = useAuth()

  const col = { xl: 3, lg: 6, md: 6, sm: 6, xs: 12 }
  return (
    <>
      <div className='header bg-gradient-info pb-8 pt-7 pt-md-8'>
        <Container fluid>
          <div className='header-body'>
            <Row>
              <Col {...col}>
                <CardHeader title='Distribuidor' value={user?.distribuidor?.nombre || 'Cargando...'} icon='user' color='info' />
              </Col>
              <Col {...col}>
                <CardHeader title='Total de Convenios' value={totalConvenio || 0} icon='id-card' color='blue' />
              </Col>
              <Col {...col}>
                <CardHeader title='Terminados' value={totalTerminado || 0} icon='check-square' color='success' />
              </Col>
              <Col {...col}>
                <CardHeader title='Edición' value={totalEdicion || 0} icon='edit' color='warning' />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default ConvenioHeader
