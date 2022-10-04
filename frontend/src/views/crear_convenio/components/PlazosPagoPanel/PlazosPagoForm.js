import React from 'react'
import { Col, Form, Button, ButtonToolbar, Schema, Divider } from 'rsuite'

import { FormField, InputNumber } from 'components'

export function PlazosPagoForm ({ closeModal }) {
  const formRef = React.useRef()

  const [formValue, setFormValue] = React.useState({
    plazoDePago: 30
  })

  const { NumberType } = Schema.Types
  const model = Schema.Model({
    plazoDePago: NumberType().min(1, 'No puede ser menor que 1.').isRequired('Este campo es obligatorio.')
  })

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
        <FormField name='numero' label='Número' disabled value='VLS-1' />
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <FormField name='cliente' label='Cliente' disabled value='DeSoft VC' />
      </Col>

      <Col xs={24}>
        <Divider />
        <h6 className='heading-small text-muted mb-4'>
          Información del plazo de pago
        </h6>
      </Col>

      <Col xs={24} sm={24} md={12} lg={12}>
        <FormField name='plazoDePago' label='Plazo de Pago (En días)' accepter={InputNumber} required />
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <FormField name='fecha' label='Fecha' disabled value='2022-10-26' />
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
