import { Col, Form, ButtonToolbar, Divider, CheckPicker, SelectPicker, Message } from 'rsuite'

import { FormField, Loader, Button, Table } from 'components'
import useAsociarServiciosForm from './useAsociarServiciosForm'

export function AsociarServiciosForm ({ closeModal, convenioId, plazoPagoId, servicioAsociado = null }) {
  const {
    formRef,
    formValue,
    formModel,
    serviciosContratados,
    onSelectServicio,
    cantidadBD,
    clientesFinales,
    onChangeClienteFinal,
    tableData,
    handleSubmit,
    isLoading,
    isAddUpdate
  } = useAsociarServiciosForm({ closeModal, convenioId, plazoPagoId, servicioAsociado })

  const renderForm = () => (
    <Form
      fluid
      ref={formRef}
      // TODO: onChange={setFormValue} se quito el evento para controlar la cantidad de clientes a seleccionar
      formValue={formValue}
      model={formModel}
    >
      <Col xs={24} sm={24} md={24} lg={24} className='mb-2'>
        <FormField
          name='servicios'
          label='Servicios'
          accepter={SelectPicker}
          required block
          cleanable={false}
          onSelect={onSelectServicio}
          data={serviciosContratados.map(item => ({
            label: item.producto_nombre,
            value: item.servicio,
            cantidad: item.cantidad
          }))}
        />
      </Col>
      {formValue.servicios && (
        <>
          <Col xs={24}>
            <Divider />
            <h6 className='heading-small text-muted mb-4'>
              Clientes a Asociar
            </h6>
          </Col>
          <Col xs={24}>
            <Message showIcon style={{ backgroundColor: '#E3F3FD' }} className='mb-4 ml--1 mr--1'>
              El servicio seleccionado corresponde a {cantidadBD} base de dato{cantidadBD !== 1 && 's'}.
            </Message>
          </Col>
          <Col xs={24}>
            <FormField
              name='clientesAsociados'
              label='Clientes'
              accepter={CheckPicker}
              onChange={onChangeClienteFinal}
              required block data={clientesFinales.map(item => ({
                label: item.nombre,
                value: item.id
              }))}
            />
          </Col>
          <Col xs={24} className='mt-4'>
            {tableData().length > 0 &&
              <Table data={tableData()} autoHeight>
                {Table.Column({ header: 'Nombre Completo Cliente', dataKey: 'nombre', flex: 1, white: true })}
                {Table.Column({ header: 'Correo', dataKey: 'correo', flex: 1, white: true })}
              </Table>}
          </Col>
        </>)}
      <Col xs={24} className='mt-4'>
        <ButtonToolbar>
          <Button
            icon='save'
            text='Guardar'
            appearance='primary'
            onClick={handleSubmit}
            loading={isAddUpdate()}
          />
          {closeModal &&
            <Button
              icon='times'
              text='Cerrar'
              appearance='subtle'
              color='red'
              onClick={closeModal}
            />}
        </ButtonToolbar>
      </Col>
    </Form>
  )

  return (
    <>
      {isLoading()
        ? renderForm()
        : <Loader.Paragraph rows={4} />}
      <Loader.Dialog loading={isAddUpdate()} content='Guardando...' />
    </>
  )
}
