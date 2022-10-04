import React, { useState } from 'react'
import { Modal, Button } from 'rsuite'

export default function useModal ({ title, renderBody, footer = false }) {
  const [visible, setVisible] = useState(false)

  const openModal = () => setVisible(true)
  const closeModal = () => setVisible(false)

  const modal = (
    <Modal backdrop='static' size='md' open={visible} onClose={closeModal}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderBody({ openModal, closeModal })}
      </Modal.Body>
      {footer &&
        <Modal.Footer>
          <Button onClick={closeModal} appearance='subtle' color='red'>
            Cerrar
          </Button>
        </Modal.Footer>}
    </Modal>
  )

  return { modal, openModal, closeModal }
}
