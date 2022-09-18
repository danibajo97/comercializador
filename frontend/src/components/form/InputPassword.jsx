import React, { useState } from 'react'
import { Form, InputGroup } from 'rsuite'
import EyeIcon from '@rsuite/icons/legacy/Eye'
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash'

export default function InputPassword ({ name, label, accepter, required, error, ...rest }) {
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
