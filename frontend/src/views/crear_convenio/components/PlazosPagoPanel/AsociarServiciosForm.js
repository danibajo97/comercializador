import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Form, Button, ButtonToolbar, Schema, Divider, CheckPicker, SelectPicker } from 'rsuite'

import { getServicioContratado } from 'redux/convenioDatosGenerales/convenioDatosGeneralesSlice'
import { FormField, InputNumber } from 'components'
import { clienteFinal } from 'constants/mock'
import Table from 'components/table/Table'

export function AsociarServiciosForm ({ closeModal }) {
  const formRef = React.useRef()
  const servicioContratado = useSelector(state => state.convenio_datos_generales.servicioContratado)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getServicioContratado())
  }, [])

  const [formValue, setFormValue] = React.useState({
    servicios: '',
    cantidad: undefined,
    clientesAsociados: undefined
  })

  const { NumberType, StringType, ArrayType } = Schema.Types
  const model = Schema.Model({
    servicios: StringType().isRequired('Este campo es obligatorio.'),
    cantidad: NumberType().min(1, 'No puede ser menor que 1.').isRequired('Este campo es obligatorio.'),
    clientesAsociados: ArrayType().isRequired('Este campo es obligatorio.')
  })

  const tableData = () => {
    return clienteFinal.map(data => {
      if (formValue.clientesAsociados && formValue.clientesAsociados.includes(data.id)) { return data } else return undefined
    }).filter(data => data !== undefined)
  }

  const onSelectClienteFinal = (value, item, event) => {
    // if (value.length <= db) {
    setFormValue({
      ...formValue,
      clientesAsociados: value
    })
  }

  const handleSubmit = () => {
    formRef.current.check()
  }

  return (
    <Form
      fluid
      ref={formRef}
      onChange={setFormValue}
      formValue={formValue}
      model={model}
    >

      <Col xs={24} sm={24} md={12} lg={12}>
        <FormField
          name='servicios' label='Servicios' accepter={SelectPicker} required block data={servicioContratado.map(item => ({
            label: item.producto_nombre,
            value: item.id
          }))}
        />
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <FormField name='cantidad' label='Cantidad a Incluir' accepter={InputNumber} required />
      </Col>

      <Col xs={24}>
        <Divider />
        <h6 className='heading-small text-muted mb-4'>
          Clientes a Asociar
        </h6>
      </Col>

      <Col xs={24}>
        <FormField
          name='clientesAsociados' label='Clientes' accepter={CheckPicker} onSelect={onSelectClienteFinal} required block data={clienteFinal.map(item => ({
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

      <Col xs={24} className='mt-4'>
        <ButtonToolbar>
          <Button appearance='primary' size='sm' onClick={handleSubmit}>
            Guardar
          </Button>
          {closeModal &&
            <Button appearance='subtle' color='red' size='sm' onClick={closeModal}>
              Cerrar
            </Button>}
        </ButtonToolbar>
      </Col>

    </Form>
  )
}
