import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Row, Col, Container, CardHeader } from 'reactstrap'
import { Button, CheckPicker } from 'rsuite'
import { useNavigate } from 'react-router-dom'

import ConvenioTable from './components/ConvenioTable'
import ConvenioHeader from './components/ConvenioHeader'
import { estadosConvenios } from 'constants/'
import useHeader from 'hooks/useHeader'
import { getConveniosAll } from 'redux/convenio/convenioSlice'
import OPERATIONS from 'constants/operationsRedux'
import { Loader } from 'components'

export default function HomeDistribuidor () {
  const dispatch = useDispatch()
  const convenios = useSelector(state => state.convenio.convenios)
  const isConvenios = useSelector(state => state.convenio.isConvenios)

  React.useEffect(() => {
    dispatch(getConveniosAll({ page: 1 }))
  }, [])

  useHeader({ title: 'Inicio' })
  const navigate = useNavigate()
  const [results, setResults] = React.useState([])
  const [totalConvenio, setTotalConvenio] = React.useState(0)
  const [totalConfirmado, setTotalConfirmado] = React.useState(0)
  const [totalEdicion, setTotalEdicion] = React.useState(0)

  React.useEffect(() => {
    setResults(convenios)
    if (isConvenios === OPERATIONS.FULFILLED) {
      const edicion = convenios.filter(convenio => convenio.estado === 1)
      const confirmado = convenios.filter(convenio => convenio.estado === 3)
      setTotalConvenio(convenios.length)
      setTotalConfirmado(confirmado.length)
      setTotalEdicion(edicion.length)
    }
  }, [convenios])

  const estadoData = estadosConvenios.map(item => ({ label: item.text, value: item.id }))

  const onSelectEstado = (value, item, event) => {
    const filterEstado = convenios.filter(convenio => value.includes(convenio.estado))
    setResults(value.length > 0 ? filterEstado : convenios)
  }

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
                    <CheckPicker onSelect={onSelectEstado} className='ml-2 d-none d-md-inline-block' data={estadoData} style={{ width: 180 }} cleanable={false} searchable={false} size='sm' placeholder='Estado' />
                  </Col>
                </Row>
              </CardHeader>
              <Row>
                <Col>
                  {isConvenios === OPERATIONS.FULFILLED
                    ? <ConvenioTable convenios={results} />
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
