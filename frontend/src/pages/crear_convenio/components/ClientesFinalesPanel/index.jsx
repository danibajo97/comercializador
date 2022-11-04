import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Form, ButtonToolbar, Button, Schema, CheckPicker, Message } from 'rsuite'
import { toast } from 'react-toastify'

import { FormField, Loader } from 'components'
import Table from 'components/table/Table'

import { retrieveConvenio, stateResetOperation as stateResetOperationConvenio } from 'redux/convenio/convenioSlice'
import { getListaClientesFinales, addClientesFinales, getClientesFinales, stateResetOperation as stateResetOperationClientesFinales } from 'redux/clientesFinales/clientesFinalesSlice'
import OPERATIONS from 'constants/operationsRedux'

function ClientesFinalesPanel () {
  const dispatch = useDispatch()
  const [db, serDB] = React.useState(2)
  const params = useParams()
  const { id } = params

  const formRef = React.useRef()
  const [formValue, setFormValue] = React.useState({
    cliente_final: []
  })

  const { ArrayType } = Schema.Types
  const model = Schema.Model({
    cliente_final: ArrayType().isRequired('Este campo es obligatorio.')
  })

  const convenio = useSelector(state => state.convenio.convenio)
  const listClientesFinales = useSelector(state => state.clientesFinales.listClientesFinales)
  const isListClientesFinales = useSelector(state => state.clientesFinales.isListClientesFinales)
  const isList = useSelector(state => state.clientesFinales.isList)
  const clientesFinales = useSelector(state => state.clientesFinales.clientesFinales)

  useEffect(() => {
    if (id !== undefined) {
      dispatch(retrieveConvenio({ id }))
      dispatch(getListaClientesFinales({ convenio: id }))
      dispatch(getClientesFinales({ convenio: id }))
    }
    return () => {
      dispatch(stateResetOperationConvenio())
      dispatch(stateResetOperationClientesFinales())
    }
  }, [])

  useEffect(() => {
    const data = clientesFinales.map(cf => cf.id)
    if (data.length > 0) { setFormValue({ cliente_final: data }) }
  }, [clientesFinales])

  useEffect(() => {
    if (convenio !== null) {
      serDB(convenio.cantidad_bd)
    }
  }, [convenio])

  const handleSubmit = () => {
    if (formRef.current.check()) {
      if (formValue.cliente_final.length > db) {
        toast.error(`Debes seleccionar ${db} clientes.`)
      } else {
        const params = formValue.cliente_final
        dispatch(addClientesFinales({ convenio: id, params }))
      }
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

  const isClientesFinalesRelacionados = () => {
    const isRelacionado = clientesFinales.some(cf => !cf.relacionado)
    return !isRelacionado
      ? <></>
      : (
        <Message showIcon style={{ backgroundColor: '#E3F3FD' }} header='Información' className='mb-4 ml--1 mr--1'>
          Existen clientes finales usados, si se modifican, los plazos de pagos se eliminarán.
        </Message>)
  }

  const isComfirmado = () => convenio && convenio.estado === 3

  console.log(isComfirmado())

  const renderForm = () => (
    <Form
      fluid
      ref={formRef}
      formValue={formValue}
      model={model}
      disabled={isComfirmado()}
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
            <Button appearance='primary' size='sm' onClick={handleSubmit} hidden={isComfirmado()}>
              Guardar
            </Button>
          </ButtonToolbar>
        </Col>
      </Row>
    </Form>
  )

  return (
    <>
      {isList === OPERATIONS.FULFILLED && isListClientesFinales === OPERATIONS.FULFILLED
        ? (
          <>
            {!isComfirmado() && isClientesFinalesRelacionados()}
            {renderForm()}
          </>)
        : <Loader.Paragraph rows={5} />}
    </>
  )
}

export default ClientesFinalesPanel
