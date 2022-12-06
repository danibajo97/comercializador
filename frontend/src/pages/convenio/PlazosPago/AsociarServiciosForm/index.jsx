import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Form, ButtonToolbar, Schema, Divider, CheckPicker, SelectPicker, Message } from 'rsuite'

import { FormField, Loader, Button } from 'components'
import Table from 'components/table/Table'
import { getPlazoPagoServicioAll, addPlazoPagoServicio, updatePlazoPagoServicio, stateResetOperation as stateResetOperationPlazoPagoServicio } from 'redux/plazoPagoServicio/plazoPagoServicioSlice'
import { getClientesFinales, stateResetOperation as stateResetOperationClientesFinales } from 'redux/clientesFinales/clientesFinalesSlice'
import { getServiciosContratadosAll, stateResetOperation as stateResetOperationServiciosContratados } from 'redux/serviciosContratados/serviciosContratadosSlice'
import OPERATIONS from 'constants/operationsRedux'
import { toast } from 'react-toastify'

export function AsociarServiciosForm ({ closeModal, convenioId, plazoPagoId, servicioAsociado = null }) {
  const [cantidadBD, setCantidadBD] = useState(null)
  const formRef = useRef()
  const dispatch = useDispatch()

  const clientesFinales = useSelector(state => state.clientesFinales.clientesFinales)
  const isListClientesFinales = useSelector(state => state.clientesFinales.isList)
  const serviciosContratados = useSelector(state => state.serviciosContratados.serviciosContratados)
  const isListServiciosContratados = useSelector(state => state.serviciosContratados.isList)

  const isAdd = useSelector(state => state.plazoPagoServicio.isAdd)
  const isUpdate = useSelector(state => state.plazoPagoServicio.isUpdate)

  useEffect(() => {
    dispatch(getClientesFinales({ convenio: convenioId }))
    dispatch(getServiciosContratadosAll({ convenio: convenioId }))

    return () => {
      dispatch(stateResetOperationPlazoPagoServicio())
      dispatch(stateResetOperationServiciosContratados())
      dispatch(stateResetOperationClientesFinales())
    }
  }, [])

  useEffect(() => {
    if (servicioAsociado !== null && serviciosContratados.length > 0) {
      const serviciosContratadosFind = serviciosContratados.find(sc => sc.servicio === servicioAsociado.servicio)
      setCantidadBD(serviciosContratadosFind.cantidad)
    }
  }, [serviciosContratados])

  useEffect(() => {
    if (isAdd === OPERATIONS.FULFILLED || isUpdate === OPERATIONS.FULFILLED) {
      dispatch(getPlazoPagoServicioAll({ plazoPagoId }))
      if (closeModal) closeModal()
    }
  }, [isAdd, isUpdate])

  const [formValue, setFormValue] = useState({
    servicios: servicioAsociado?.servicio,
    cantidad: servicioAsociado?.cantidad,
    clientesAsociados: servicioAsociado?.usuariosfinales
  })

  const { StringType, ArrayType } = Schema.Types
  const model = Schema.Model({
    servicios: StringType()
      .isRequired('Este campo es obligatorio.'),
    clientesAsociados: ArrayType()
      .isRequired('Este campo es obligatorio.')
  })

  const tableData = () => {
    return clientesFinales.map(data => {
      if (formValue.clientesAsociados && formValue.clientesAsociados.includes(data.id)) { return data } else return undefined
    }).filter(data => data !== undefined)
  }

  const handleSubmit = () => {
    if (formRef.current.check()) {
      if (formValue.cantidad !== cantidadBD) {
        toast.error('No coinciden las base de datos.')
        return
      }
      const params = {
        cantidad: formValue.cantidad,
        plazo: plazoPagoId,
        servicio: formValue.servicios,
        usuariosfinales: formValue.clientesAsociados
      }
      if (servicioAsociado === null) {
        dispatch(addPlazoPagoServicio({ params }))
      } else {
        dispatch(updatePlazoPagoServicio({ id: servicioAsociado.id, params }))
      }
    }
  }

  const onSelectServicio = (value, item, event) => {
    setCantidadBD(item.cantidad)
    setFormValue({
      ...formValue,
      servicios: value
    })
  }

  const onChangeClienteFinal = (value, event) => {
    const count = cantidadBD || 1
    if (value.length <= count) {
      setFormValue({
        ...formValue,
        clientesAsociados: value,
        cantidad: value.length
      })
    }
  }

  const renderForm = () => (
    <Form
      fluid
      ref={formRef}
      // TODO: onChange={setFormValue} se quito el evento para controlar la cantidad de clientes a seleccionar
      formValue={formValue}
      model={model}
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
      {/* Todo: este campo es solo de informacion
      <Col xs={24} sm={24} md={12} lg={12}>
        <FormField name='cantidad' label='Cantidad a Incluir' accepter={InputNumber} required readOnly />
      </Col>
      */}
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
      {isListClientesFinales === OPERATIONS.FULFILLED && isListServiciosContratados === OPERATIONS.FULFILLED
        ? renderForm()
        : <Loader.Paragraph rows={4} />}
    </>
  )
}
