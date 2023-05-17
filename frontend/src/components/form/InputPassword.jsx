import { useState } from 'react'
import { Form, InputGroup, Whisper, Tooltip } from 'rsuite'
import EyeIcon from '@rsuite/icons/legacy/Eye'
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash'
import InfoIcon from '@rsuite/icons/legacy/Info'

export default function InputPassword ({ name, label, accepter, required, error, information, ...rest }) {
  const [visible, setVisible] = useState(false)

  return (
    <>
      {label && <Form.ControlLabel className='text-muted text-sm'>{label}: {required && <span className='text-danger'>*</span>}</Form.ControlLabel>}
      <InputGroup inside size='sm'>
        <Form.Control data-testid={`${name}-testid`} name={name} {...rest} size='sm' type={visible ? 'text' : 'password'} />
        <InputGroup.Button onClick={() => setVisible(!visible)}>
          {visible ? <EyeIcon /> : <EyeSlashIcon />}
        </InputGroup.Button>
        {information && (
          <InputGroup.Addon style={{ right: 25 }}>
            <Whisper placement='top' speaker={<Tooltip>{information}</Tooltip>}>
              <InfoIcon />
            </Whisper>
          </InputGroup.Addon>)}
      </InputGroup>
      {error && <Form.HelpText className='text-danger'>{error}</Form.HelpText>}
    </>
  )
}
