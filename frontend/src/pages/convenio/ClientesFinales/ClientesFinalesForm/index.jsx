import React from 'react'
import { Row, Col } from 'reactstrap'
import { Form, ButtonToolbar, Button, CheckPicker } from 'rsuite'

import { FormField, Loader } from 'components'
import Table from 'components/table/Table'

import useClientesFinalesForm from './useClientesFinalesForm'

function ClientesFinalesPanel () {
  const {
    formRef,
    formValue,
    formModel,
    isComfirmado,
    isLoading,
    listClientesFinales,
    tableData,
    onSelectClienteFinal,
    onClean,
    isClientesFinalesRelacionados,
    handleSubmit
  } = useClientesFinalesForm()

  const renderForm = () => (
    <Form
      fluid
      ref={formRef}
      formValue={formValue}
      model={formModel}
      plaintext={isComfirmado()}
    >
      <Row hidden={isComfirmado()}>
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
      {isLoading()
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
