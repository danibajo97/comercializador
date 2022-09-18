import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'rsuite'

const FormField = ({ name, label, accepter, required, error, ...rest }) => {
  return (
    <Form.Group controlId={`${name}-id`}>
      {label && <Form.ControlLabel className='text-muted text-sm'>{label}: {required && <span className='text-danger'>*</span>}</Form.ControlLabel>}
      <Form.Control name={name} accepter={accepter} {...rest} size='sm' />
      {error && <Form.HelpText className='text-danger'>{error}</Form.HelpText>}
    </Form.Group>
  )
}

FormField.propTypes = {
  label: PropTypes.string.isRequired
}

export default FormField

/* export const Textarea = (props) => <Input {...props} as='textarea' /> */

/* export const InputNumber = (props) => <Input {...props} as='input' type='number' value={props.value ?? 0} /> */

/* export const InputPassword = ({ name, label, accepter, required, error, ...rest }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      {label && <Form.ControlLabel className='text-muted text-sm'>{label}: {required && <span className='text-danger'>*</span>}</Form.ControlLabel>}
      <InputGroup inside size='sm'>
        <Form.Control name={name} {...rest} size='sm' type={visible ? 'text' : 'password'} />
        <InputGroup.Button onClick={() => setVisible(!visible)}>
          {visible ? <EyeIcon /> : <EyeSlashIcon />}
        </InputGroup.Button>
      </InputGroup>
      {error && <Form.HelpText className='text-danger'>{error}</Form.HelpText>}
    </>
  )
}
 */
