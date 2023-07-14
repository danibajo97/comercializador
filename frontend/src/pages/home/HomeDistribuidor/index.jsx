import { Card, Row, Col, Container, CardHeader } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

import ConvenioTable from './components/ConvenioTable'
import ConvenioHeader from './components/ConvenioHeader'
import { Loader, Button } from 'components'
import useHeader from 'hooks/useHeader'
import useHomeDistribuidor from './useHomeDistribuidor'
import useFilterConvenio from './useFilterConvenio'

export default function HomeDistribuidor () {
  useHeader({ title: 'Inicio' })
  const navigate = useNavigate()
  const {
    data,
    loading,
    validando,
    terminando,
    deleting,
    totalConvenio,
    totalTerminado,
    totalEdicion,
    pagination,
    setValueFilter,
    onSortColumn,
    sortInfo
  } = useHomeDistribuidor()

  const { drawerFilter, open } = useFilterConvenio({ setValueFilter })

  const loadingText = () => {
    if (validando) {
      return 'Validando...'
    }
    if (terminando) {
      return 'Terminando...'
    }
    if (deleting) {
      return 'Eliminando...'
    }
  }

  return (
    <>
      {drawerFilter}
      <ConvenioHeader totalConvenio={totalConvenio} totalTerminado={totalTerminado} totalEdicion={totalEdicion} />
      <Container className='mt--7' fluid>
        <Row>
          <Col>
            <Card className='bg-secondary shadow'>
              <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                  <Col xs='5'>
                    <h3 className='mb-0'>Listado de Convenios</h3>
                  </Col>
                  <Col className='text-right' xs='7'>
                    <Button
                      icon='plus'
                      text='Nuevo Convenio'
                      appearance='primary'
                      onClick={() => navigate('/datos-generales')}
                      className='mr-2'
                    />
                    <Button
                      icon='filter'
                      text='Filtrar'
                      appearance='primary'
                      onClick={open}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <Row>
                <Col>
                  {loading
                    ? <ConvenioTable convenios={data} pagination={pagination} onSortColumn={onSortColumn} sortInfo={sortInfo} />
                    : <Loader.Grid rows={7} columns={6} />}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
      <Loader.Dialog
        loading={validando || terminando || deleting}
        content={loadingText()}
      />
    </>
  )
}
