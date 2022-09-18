import React from 'react'
import {
  Row,
  Col
} from 'reactstrap'
import { Form, ButtonToolbar, Button, Schema, CheckPicker } from 'rsuite'

import { FormField, Table } from 'components'
import { clienteFinal } from 'constants/mock'

const selectData = clienteFinal.map(item => ({
  label: item.nombre,
  value: item.id
}))

function ClientesFinalesPanel (props) {
  const formRef = React.useRef()
  // const [formError, setFormError] = React.useState({})
  const [formValue, setFormValue] = React.useState({
    cliente_final: []
  })

  const { ArrayType } = Schema.Types
  const model = Schema.Model({
    cliente_final: ArrayType().isRequired('Required.')
  })

  const handleSubmit = () => {
    /* if (!formRef.current.check()) {
    } */
  }

  /* const handleCheckEmail = () => {
    formRef.current.checkForField('email', checkResult => {
      console.log(checkResult)
    })
  } */

  const tableData = () => {
    return clienteFinal.map(data => {
      if (formValue.cliente_final.includes(data.id)) { return data } else return undefined
    }).filter(data => data !== undefined)
  }

  return (
    <Form
      fluid
      ref={formRef}
      onChange={setFormValue}
      // onCheck={setFormError}
      formValue={formValue}
      model={model}
    >
      <Row>
        <Col xs='12' sm='12' md='12' lg='12'>
          <FormField name='cliente_final' label='Cliente Final' accepter={CheckPicker} data={selectData} required block />
        </Col>
      </Row>
      <Row>
        <Col className='mt-4'>
          {tableData().length > 0 && <Table data={tableData()} headers={['Nombre Completo Cliente', 'Correo']} dataKeys={['nombre', 'correo']} height={400} white />}
        </Col>
      </Row>
      <Row>
        <Col xs='12' className='mt-4'>
          <ButtonToolbar>
            <Button appearance='primary' onClick={handleSubmit}>
              Guardar
            </Button>
          </ButtonToolbar>
        </Col>
      </Row>
    </Form>
  )
}

export default ClientesFinalesPanel
