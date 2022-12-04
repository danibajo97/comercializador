import { useEffect, useRef, useState } from 'react'
import { Schema } from 'rsuite'

import useAuth from 'hooks/useAuth'
import OPERATIONS from 'constants/operationsRedux'

const REG_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%/*+?&])([A-Za-z\d$@$!%/*+?&]|[^ ]){8,16}$/

export default function useChangePassword ({ closeModal }) {
  const { isChangePassword, changePassword, stateResetChangePassword } = useAuth()
  const formRef = useRef()

  const [formValue, setFormValue] = useState({
    password: '',
    newPassword: '',
    repeatPassword: ''
  })

  const { StringType } = Schema.Types
  const formModel = Schema.Model({
    password: StringType()
      .isRequired('Este campo es obligatorio.'),
    newPassword: StringType()
      .pattern(REG_PASSWORD, 'La contraseñas no es valida.')
      .isRequired('Este campo es obligatorio.'),
    repeatPassword: StringType()
      .pattern(REG_PASSWORD, 'La contraseñas no es valida.')
      .isOneOf([formValue.newPassword], 'La contraseñas no coinciden.')
      .isRequired('Este campo es obligatorio.')
  })

  const handleSubmit = () => {
    if (formRef.current.check()) {
      changePassword({ ...formValue })
    }
  }

  useEffect(() => {
    return () => {
      stateResetChangePassword()
    }
  }, [])

  useEffect(() => {
    if (isChangePassword === OPERATIONS.FULFILLED && closeModal) closeModal()
  }, [isChangePassword])

  return {
    formRef,
    formValue,
    setFormValue,
    formModel,
    handleSubmit
  }
}
