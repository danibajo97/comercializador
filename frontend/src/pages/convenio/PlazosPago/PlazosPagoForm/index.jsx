import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Form, ButtonToolbar, Schema, Divider, DatePicker } from 'rsuite'

import { FormField, InputNumber, Loader, Button } from 'components'
import { retrieveConvenio, stateResetOperation as stateResetOperationConvenio } from 'redux/convenio/convenioSlice'
import { getPlazoPagoAll, addPlazoPago, updatePlazoPago, stateResetOperation as stateResetOperationPlazosPagos } from 'redux/plazoPago/plazoPagoSlice'
import OPERATIONS from 'constants/operationsRedux'
import { date } from 'utils'

export function PlazosPagoForm ({ closeModal, convenioId, plazoPago = null }) {
  const dispatch = useDispatch()
  const formRef = useRef()

  const convenio = useSelector(state => state.convenio.convenio)
  const isRetrieve = useSelector(state => state.convenio.isRetrieve)
  const isAdd = useSelector(state => state.plazoPago.isAdd)
  const isUpdate = useSelector(state => state.plazoPago.isUpdate)

  const [formValue, setFormValue] = useState({
    plazoDePago: plazoPago?.dias || 30,
    fecha: undefined
  })

  const { NumberType, DateType } = Schema.Types
  const model = Schema.Model({
    plazoDePago: NumberType().min(1, 'No puede ser menor que 1.').isRequired('Este campo es obligatorio.'),
    fecha: DateType()
  })

  useEffect(() => {
    dispatch(retrieveConvenio({ id: convenioId }))

    return () => {
      dispatch(stateResetOperationConvenio())
      dispatch(stateResetOperationPlazosPagos())
    }
  }, [])

  useEffect(() => {
    if (convenio) {
      setFormValue({
        ...formValue,
        fecha: date.setDate({
          date: convenio.fecha_emision,
          days: formValue.plazoDePago
        })
      })
    }
  }, [convenio])

  useEffect(() => {
    if (isAdd === OPERATIONS.FULFILLED || isUpdate === OPERATIONS.FULFILLED) {
      dispatch(getPlazoPagoAll({ convenio: convenioId }))
      if (closeModal) closeModal()
    }
  }, [isAdd, isUpdate])

  const handleSubmit = () => {
    if (formRef.current.check()) {
      const params = {
        negocio: convenioId,
        dias: parseInt(formValue.plazoDePago),
        fecha: date.toISODate({ date: formValue.fecha })
      }

      if (plazoPago === null) {
        dispatch(addPlazoPago({ params }))
      } else {
        dispatch(updatePlazoPago({ id: plazoPago.id, params }))
      }
    }
  }

  const onChangeDays = (value) => {
    const incremento = date.setDate({ date: convenio.fecha_emision, days: value })
    setFormValue({
      plazoDePago: value,
      fecha: incremento
    })
  }

  const renderForm = () => (
    <Form
      fluid
      ref={formRef}
      onChange={setFormValue}
      formValue={formValue}
      model={model}
    >
      <Col xs={24} sm={24} md={12} lg={12} className='mb-4'>
        <FormField name='numero' label='Número' value={convenio?.no_convenio} disabled />
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <FormField name='cliente' label='Cliente' value={convenio?.contacto_facturese_a} disabled />
      </Col>
      <Col xs={24}>
        <Divider />
        <h6 className='heading-small text-muted mb-4'>
          Información del plazo de pago
        </h6>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} className='mb-4'>
        <FormField name='plazoDePago' label='Plazo de Pago (En días)' accepter={InputNumber} onChange={onChangeDays} />
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <FormField name='fecha' label='Fecha' accepter={DatePicker} disabled block />
      </Col>
      <Col xs={24} className='mt-4'>
        <ButtonToolbar>
          <Button
            icon={plazoPago === null ? 'save' : 'edit'}
            text={plazoPago === null ? 'Guardar' : 'Editar'}
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
      {isRetrieve === OPERATIONS.FULFILLED
        ? renderForm()
        : <Loader.Paragraph rows={4} />}
    </>
  )
}
