import React, { useState } from 'react'
import { Textarea, FormField } from 'components'
import { Button, ButtonToolbar, Col, Form } from 'rsuite'

export default function CopiarLicencia ({ textLicencia, closeModal }) {
  const [isCopiado, setIsCopiado] = useState(false)

  const copyToTextArea = () => {
    navigator.clipboard.writeText(textLicencia)
    setIsCopiado(true)
  }

  return (
    <Form
      fluid
      formValue={{
        licencia: textLicencia
      }}
    >
      <FormField name='licencia' label='' accepter={Textarea} rows={5} disabled />
      <Col xs={24} className='mt-0 ml--1'>
        <ButtonToolbar>
          <Button appearance='primary' size='sm' onClick={copyToTextArea} disabled={isCopiado}>
            {isCopiado ? 'Copiado' : 'Copiar Licencia'}
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
