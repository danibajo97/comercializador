import React from 'react'
import PropTypes from 'prop-types'
import { Input, Form } from 'rsuite'

const FormField = (props) => {
  const { name, label, accepter, required, error, ...rest } = props
  return (
    <Form.Group controlId={`${name}-id`}>
      {label && <Form.ControlLabel>{label}: {required && <span className='text-danger'>*</span>}</Form.ControlLabel>}
      <Form.Control name={name} accepter={accepter} {...rest} />
      {error && <Form.HelpText className='text-danger'>{error}</Form.HelpText>}
    </Form.Group>
  )
}

FormField.propTypes = {
  label: PropTypes.string.isRequired
}

FormField.defaultProps = {
  block: true
}

export default FormField

export const Textarea = (props) => <Input {...props} as='textarea' />
export const InputNumber = (props) => <Input {...props} as='input' type='number' value={props.value ?? 0} />
