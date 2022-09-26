import React, { useEffect } from 'react'
import {
  Row,
  Col
} from 'reactstrap'
import { useParams } from 'react-router-dom'
import { Form, ButtonToolbar, Button, Schema, CheckPicker } from 'rsuite'
import { toast } from 'react-toastify'

import { FormField } from 'components'
import { clienteFinal } from 'constants/mock'
import useConvenio from 'hooks/useConvenio'
import Table from 'components/table/Table'

const selectData = clienteFinal.map(item => ({
  label: item.nombre,
  value: item.id
}))

function ClientesFinalesPanel (props) {
  const [db, serDB] = React.useState(0)
  const params = useParams()
  const { id } = params

  const { convenio } = useConvenio({ id })
  useEffect(() => {
    serDB(convenio.cantidad_bd)
  }, [convenio])

  const formRef = React.useRef()
  const [formValue, setFormValue] = React.useState({
    cliente_final: []
  })

  const { ArrayType } = Schema.Types
  const model = Schema.Model({
    cliente_final: ArrayType().isRequired('Este campo es obligatorio.')
  })

  const handleSubmit = () => {
    if (formRef.current.check()) {
      if (db !== formValue.cliente_final.length) { toast.error(`Debes seleccionar ${db} clientes.`) } else toast.success('OK')
    }
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

  const onSelectClienteFinal = (value, item, event) => {
    if (value.length <= db) {
      setFormValue({
        cliente_final: value
      })
    }
  }

  const onClean = () => {
    setFormValue({
      cliente_final: []
    })
  }

  return (
    <Form
      fluid
      ref={formRef}
      // onChange={onSelectClienteFinal}
      // onCheck={setFormError}
      formValue={formValue}
      model={model}
    >
      <Row>
        <Col xs='12'>
          <FormField name='cliente_final' label='Cliente Final' accepter={CheckPicker} data={selectData} onSelect={onSelectClienteFinal} required block onClean={onClean} />
        </Col>
      </Row>
      <Row>
        <Col className='mt-4'>
          {tableData().length > 0 &&
            <Table data={tableData()} autoHeight>
              {Table.Column({ header: 'Nombre Completo Cliente', dataKey: 'nombre', flex: 1, white: true })}
              {Table.Column({ header: 'Correo', dataKey: 'correo', flex: 1, white: true })}
            </Table>}
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
