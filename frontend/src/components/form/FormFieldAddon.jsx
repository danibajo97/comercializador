import PropTypes from 'prop-types'
import { Form, InputGroup } from 'rsuite'

import { Button } from 'components'

const FormFieldAddon = ({ name, label, accepter, required, error, hidden, plaintext, buttonInfo, ...rest }) => {
  return (
    <div hidden={hidden}>
      {label && <Form.ControlLabel className='text-muted text-sm'>{label}: {required && <span className='text-danger'>*</span>}</Form.ControlLabel>}
      <Form.Control name={name} accepter={accepter} {...rest} size='sm' hidden={!plaintext} />
      <InputGroup size='sm' hidden={plaintext}>
        <Form.Control data-testid={`${name}-testid`} name={name} accepter={accepter} hidden={hidden} {...rest} size='sm' />
        <InputGroup.Addon className='mr--2' hidden={plaintext}>
          <Button
            icon={buttonInfo.icon}
            text={buttonInfo.text}
            appearance='primary'
            onClick={() => buttonInfo.onClick()}
          />
        </InputGroup.Addon>
      </InputGroup>
      {error && <Form.HelpText className='text-danger'>{error}</Form.HelpText>}
    </div>
  )
}

FormFieldAddon.propTypes = {
  label: PropTypes.string.isRequired
}

export default FormFieldAddon
