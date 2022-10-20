import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Form, ButtonToolbar, Button, Schema, CheckPicker } from 'rsuite'
import { toast } from 'react-toastify'

import { FormField } from 'components'
import Table from 'components/table/Table'

import { retrieveConvenio, stateResetOperation as stateResetOperationConvenio } from 'redux/convenio/convenioSlice'
import { getListaClientesFinales, stateResetOperation as stateResetOperationClientesFinales } from 'redux/clientesFinales/clientesFinalesSlice'

function ClientesFinalesPanel () {
  const dispatch = useDispatch()
  const [db, serDB] = React.useState(2)
  const params = useParams()
  const { id } = params

  const convenio = useSelector(state => state.convenio.convenio)
  const listClientesFinales = useSelector(state => state.clientesFinales.listClientesFinales)
  const isListClientesFinales = useSelector(state => state.clientesFinales.isListClientesFinales)

  console.log({ listClientesFinales, isListClientesFinales })

  useEffect(() => {
    if (id !== undefined) {
      dispatch(retrieveConvenio({ id }))
      dispatch(getListaClientesFinales({ convenio: id }))
    }
    return () => {
      dispatch(stateResetOperationConvenio())
      dispatch(stateResetOperationClientesFinales())
    }
  }, [])

  useEffect(() => {
    if (convenio !== null) {
      serDB(convenio.cantidad_bd)
    }
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
      if (db !== formValue.cliente_final.length) {
        toast.error(`Debes seleccionar ${db} clientes.`)
      } else toast.success('OK')
    }
  }

  const tableData = () => {
    return listClientesFinales.map(data => {
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
          <FormField
            name='cliente_final' label='Cliente Final' accepter={CheckPicker} data={listClientesFinales.map(cliente => ({
              label: cliente.nombre,
              value: cliente.id
            }))} onSelect={onSelectClienteFinal} onClean={onClean} required block
          />
        </Col>
      </Row>
      <Row>
        <Col className='mt-4'>
          {tableData().length > 0 &&
            <Table data={tableData()} autoHeight>
              {Table.Column({ header: 'Nombre Completo Cliente', dataKey: 'nombre_completo', flex: 1, white: true })}
              {Table.Column({ header: 'Correo', dataKey: 'correo', flex: 1, white: true })}
            </Table>}
        </Col>
      </Row>
      <Row>
        <Col xs='12' className='mt-4'>
          <ButtonToolbar>
            <Button appearance='primary' size='sm' onClick={handleSubmit}>
              Guardar
            </Button>
          </ButtonToolbar>
        </Col>
      </Row>
    </Form>
  )
}

export default ClientesFinalesPanel
