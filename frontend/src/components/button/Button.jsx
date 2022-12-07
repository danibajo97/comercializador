import { Button as ButtonRS, Popover, Whisper } from 'rsuite'

export default function Button ({ appearance, icon, text, onClick, ...props }) {
  const tooltip = (
    <Popover className='d-sm-block d-md-none'>
      <p className='m-0 text-center'>
        {text}
      </p>
    </Popover>
  )

  const iconButton = () => {
    if (typeof icon === 'string') { return <i className={`fa fa-${icon}`} /> }

    const IconComp = icon
    return <IconComp />
  }

  return (
    <Whisper placement='bottom' trigger='hover' controlId='control-id-hover' speaker={tooltip}>
      <ButtonRS
        size='sm'
        appearance={appearance}
        onClick={onClick}
        {...props}
      >
        {iconButton()}
        <div className='ml-2 d-none d-md-inline-block'>{text}</div>
      </ButtonRS>
    </Whisper>
  )
}
