import { useState } from 'react'
import { Modal } from 'reactstrap'
import { Button } from 'rsuite'

import TYPES_ALERT from 'constants/alertType'

export default function useAlert ({ type, text, isConfirm, textConfirm }) {
  const [visible, setVisible] = useState(false)
  const [callback, setCallback] = useState({})

  const openAlert = () => setVisible(true)
  const closeAlert = () => setVisible(false)

  const alertType = TYPES_ALERT[type]

  const renderText = () => typeof text === 'function' ? text() : text

  const confirmAccion = () => {
    callback.execute()
    closeAlert()
  }

  const setConfirmAccion = (callbackConfirmAccion) => setCallback({
    execute: callbackConfirmAccion
  })

  const alert = (
    <Modal
      className='modal-dialog-centered'
      isOpen={visible}
      toggle={() => !visible}
    >
      <div className='modal-body mt-4'>
        <div className='text-center'>
          <i className={`fa fa-${alertType.icon} fa-3x`} />
          <h4 className='heading mt-4 mb-3'>{alertType.text}</h4>
          <div>{renderText()}</div>
        </div>
      </div>
      <div className='modal-footer'>
        {isConfirm &&
          <Button appearance='primary' color={alertType.color} onClick={confirmAccion} size='sm'>
            {textConfirm}
          </Button>}
        <Button className='ml-auto' onClick={closeAlert} appearance='subtle' size='sm'>
          Cerrar
        </Button>
      </div>
    </Modal>
  )

  return { alert, openAlert, closeAlert, setConfirmAccion }
}
