import React from 'react'
import {
  Card,
  Row,
  Col,
  Container,
  CardHeader,
  CardBody
} from 'reactstrap'
import { Steps, Panel, ButtonGroup, Button, Stack, Placeholder } from 'rsuite'

import { DefaultHeader } from 'components'
import DatosGeneralesPanel from './components/DatosGeneralesPanel'
import ClientesFinalesPanel from './components/ClientesFinalesPanel'
import ServiciosContratadosPanel from './components/ServiciosContratadosPanel'

const stepAll = 5
const stepTitle = ['Datos Generales', 'Gestión de Clientes Finales', 'Servicios Contratados', 'Asociando Plazos de Pagos', 'Finalización']
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

const EmptyComp = () => <Placeholder.Paragraph rows={12} />

function CrearConvenio (props) {
  const [step, setStep] = React.useState(0)

  const onChange = nextStep => {
    setStep(nextStep < 0 ? 0 : nextStep > stepAll - 1 ? 4 : nextStep)
  }
  const onNext = () => onChange(step + 1)
  const onPrevious = () => onChange(step - 1)

  const setpRender = (step) => {
    const stepComponents = {
      0: <DatosGeneralesPanel />,
      1: <ClientesFinalesPanel />,
      2: <ServiciosContratadosPanel />,
      3: <EmptyComp />,
      4: <EmptyComp />
    }
    return stepComponents[step]
  }

  return (
    <>
      <DefaultHeader />
      <Container className='mt--7' fluid>
        <Row>
          <Col>
            <Card className='bg-secondary shadow'>
              <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                  <Col xs='8'>
                    <h3 className='mb-0'>Crear Convenio</h3>
                  </Col>
                  <Col className='text-right' xs='4' />
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs='12' sm='12' md='4' lg='4' xl='3'>
                    <Steps
                      current={step} vertical style={{
                        width: 250,
                        display: 'inline-table',
                        verticalAlign: 'top'
                      }}
                    >
                      <Steps.Item title={stepTitle[0]} description={lorem} />
                      <Steps.Item title={stepTitle[1]} description={lorem} />
                      <Steps.Item title={stepTitle[2]} description={lorem} />
                      <Steps.Item title={stepTitle[3]} description={lorem} />
                      <Steps.Item title={stepTitle[4]} description={lorem} />
                    </Steps>
                  </Col>
                  <Col xs='12' sm='12' md='8' lg='8' xl='9'>
                    <Panel bordered>
                      <h6 className='heading-small text-muted mb-4'>
                        {stepTitle[step]}
                      </h6>
                      {setpRender(step, stepTitle[step])}
                    </Panel>
                    <br />
                    <Stack justifyContent='flex-end'>
                      <ButtonGroup>
                        <Button
                          appearance='primary' onClick={onPrevious} disabled={step === 0}
                        >
                          Anterior
                        </Button>
                        <Button
                          appearance='primary' onClick={onNext} disabled={step === stepAll - 1}
                        >
                          Siguiente
                        </Button>
                      </ButtonGroup>
                    </Stack>

                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CrearConvenio
