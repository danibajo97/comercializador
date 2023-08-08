import { Col, Form, ButtonToolbar, Divider, DatePicker } from 'rsuite'

import { FormField, InputNumber, Loader, Button } from 'components'
import usePlazosPagoForm from './usePlazosPagoForm'

export function PlazosPagoForm ({ closeModal, convenioId, plazoPago = null }) {
  const {
    formRef,
    formValue,
    setFormValue,
    formModel,
    convenio,
    onChangeDays,
    handleSubmit,
    isLoading,
    isAddUpdate
  } = usePlazosPagoForm({ closeModal, convenioId, plazoPago })

  const renderForm = () => (
    <Form
      fluid
      ref={formRef}
      onChange={setFormValue}
      formValue={formValue}
      model={formModel}
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
