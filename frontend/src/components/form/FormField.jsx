import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'rsuite'

const FormField = ({ name, label, accepter, required, error, hidden, ...rest }) => {
  return (
    <Form.Group controlId={`${name}-id`} hidden={hidden}>
      {label && <Form.ControlLabel className='text-muted text-sm'>{label}: {required && <span className='text-danger'>*</span>}</Form.ControlLabel>}
      <Form.Control data-testid={`${name}-testid`} name={name} accepter={accepter} hidden={hidden} {...rest} size='sm' />
      {error && <Form.HelpText className='text-danger'>{error}</Form.HelpText>}
    </Form.Group>
  )
}

FormField.propTypes = {
  label: PropTypes.string.isRequired
}

export default FormField
