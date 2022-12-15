import { Row, Col } from 'reactstrap'
import { Form, ButtonToolbar, CheckPicker, Badge } from 'rsuite'

import { Loader, Button, FormFieldAddon } from 'components'
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
    handleSubmit,
    modalInfo
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
          <FormFieldAddon
            name='cliente_final'
            label='Cliente Final'
            accepter={CheckPicker}
            data={listClientesFinales.map(cliente => ({
              label: cliente.nombre,
              value: cliente.id
            }))}
            renderValue={(value, item) => {
              const context = `${item.length} cliente${item.length === 1 ? '' : 's'}`
              let text = item.map(i => i.label).join(', ')
              if (text.length > 40) text = text.substring(0, 40) + '...'
              return (
                <>
                  <span className='d-none d-md-inline-block'>{text}</span>
                  <Badge style={{ backgroundColor: '#3498FF', fontSize: 14, margin: 1 }} content={context} />
                </>
              )
            }}
            onSelect={onSelectClienteFinal}
            onClean={onClean}
            disabledItemValues={nuevoContacto}
            required
            block
            buttonInfo={{
              icon: 'plus',
              text: 'Nuevo Cliente',
              onClick: modalInfo.openModal
            }}
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
      {modalInfo.modal}
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
