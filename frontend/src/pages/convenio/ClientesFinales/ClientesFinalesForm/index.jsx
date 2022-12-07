import { Row, Col } from 'reactstrap'
import { Form, ButtonToolbar, CheckPicker } from 'rsuite'

import { FormField, Loader, Button } from 'components'
import Table from 'components/table/Table'

import useClientesFinalesForm from './useClientesFinalesForm'

function ClientesFinalesPanel () {
  const {
    formRef,
    formValue,
    formModel,
    isConfirmado,
    isLoading,
    listClientesFinales,
    nuevoContacto,
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
      plaintext={isConfirmado()}
    >
      <Row hidden={isConfirmado()}>
        <Col xs='12'>
          <FormField
            name='cliente_final'
            label='Cliente Final'
            accepter={CheckPicker}
            data={listClientesFinales.map(cliente => ({
              label: cliente.nombre,
              value: cliente.id
            }))}
            onSelect={onSelectClienteFinal}
            onClean={onClean}
            disabledItemValues={nuevoContacto}
            required
            block
          />
        </Col>
      </Row>
      <Row>
        <Col className='mt-4'>
          {tableData().length > 0 &&
            <Table data={tableData()} autoHeight>
              {Table.Column({ header: 'Nombre Completo Cliente', dataKey: 'nombre_completo', flex: 1, white: true, minWidth: 250 })}
              {Table.Column({ header: 'Correo', dataKey: 'correo', flex: 1, white: true, minWidth: 200 })}
            </Table>}
        </Col>
      </Row>
      <Row>
        <Col xs='12' className='mt-4'>
          <ButtonToolbar>
            <Button
              icon='save'
              text='Guardar'
              appearance='primary'
              onClick={handleSubmit}
              hidden={isConfirmado()}
            />
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
            {!isConfirmado() && isClientesFinalesRelacionados()}
            {renderForm()}
          </>)
        : <Loader.Paragraph rows={5} />}
    </>
  )
}

export default ClientesFinalesPanel
