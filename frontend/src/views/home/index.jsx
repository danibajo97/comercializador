import React from 'react'
import {
  Card,
  Row,
  Col,
  Container,
  CardHeader
} from 'reactstrap'
import { Button, CheckPicker, Drawer, Placeholder } from 'rsuite'
import { useNavigate } from 'react-router-dom'

import ConvenioTable from './componente/ConvenioTable'
import ConvenioHeader from './componente/ConvenioHeader'
import { convenios as convenioData } from 'constants/mock'
import { estadosConvenios } from 'constants/'
import useHeader from 'hooks/useHeader'

export default function Home () {
  useHeader({ title: 'Inicio' })
  const navigate = useNavigate()
  const [convenios, setConvenios] = React.useState(convenioData)
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const [totalConvenio, setTotalConvenio] = React.useState(0)
  const [totalConfirmado, setTotalConfirmado] = React.useState(0)
  const [totalEdicion, setTotalEdicion] = React.useState(0)

  React.useEffect(() => {
    const edicion = convenios.filter(convenio => convenio.estado === 1)
    const confirmado = convenios.filter(convenio => convenio.estado === 3)

    setTotalConvenio(convenios.length)
    setTotalConfirmado(confirmado.length)
    setTotalEdicion(edicion.length)
  }, [])

  const newConvenio = () => {
    navigate('/datos-generales')
  }

  const estadoData = estadosConvenios.map(item => ({ label: item.text, value: item.id }))

  const onSelectEstado = (value, item, event) => {
    const filterEstado = convenioData.filter(convenio => value.includes(convenio.estado))
    setConvenios(value.length > 0 ? filterEstado : convenioData)
  }

  return (
    <>
      <Drawer open={openDrawer} size='xs' onClose={() => setOpenDrawer(false)}>
        <Drawer.Header>
          <Drawer.Title>Listado de Convenio</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => { }} appearance='primary' color='green' size='sm'>
              <i className='fa fa-filter mr-2' />
              Filtrar
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <Placeholder.Paragraph rows={24} />
        </Drawer.Body>
      </Drawer>
      <ConvenioHeader totalConvenio={totalConvenio} totalConfirmado={totalConfirmado} totalEdicion={totalEdicion} />
      <Container className='mt--7' fluid>
        <Row>
          <Col>
            <Card className='bg-secondary shadow'>
              <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                  <Col xs='12' sm='4'>
                    <h3 className='mb-0'>Listado de Convenios</h3>
                  </Col>
                  <Col className='text-right' xs='12' sm='8'>
                    <Button appearance='primary' size='sm' onClick={newConvenio}>
                      <i className='fa fa-plus mr-2' />
                      Nuevo Convenio
                    </Button>
                    {/* <Button className='ml-2' appearance='primary' color='green' size='sm' onClick={() => setOpenDrawer(true)}>
                      <i className='fa fa-filter mr-2' />
                      Filtro
                    </Button> */}
                    <CheckPicker onSelect={onSelectEstado} className='ml-2' data={estadoData} style={{ width: 180 }} cleanable={false} searchable={false} size='sm' placeholder='Estado' />
                  </Col>
                </Row>
              </CardHeader>
              <Row>
                <Col>
                  <ConvenioTable convenios={convenios} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
