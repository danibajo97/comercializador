import useAuth from 'hooks/useAuth'
import { useEffect, useRef, useState } from 'react'
import { Schema } from 'rsuite'

import OPERATIONS from 'constants/operationsRedux'
import { useNavigate, useParams } from 'react-router-dom'

const REG_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%/*+?&])([A-Za-z\d$@$!%/*+?&]|[^ ]){8,16}$/

export default function useActivateAccount () {
  const { isActivateAccount, activateAccount, stateResetActivateAccount } = useAuth()
  const params = useParams()
  const navigate = useNavigate()
  const { uuid, token } = params

  const formRef = useRef()
  const [formValue, setFormValue] = useState({
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    repassword: ''
  })

  const { StringType } = Schema.Types
  const formModel = Schema.Model({
    username: StringType()
      .isRequired('Este campo es obligatorio.'),
    firstname: StringType()
      .isRequired('Este campo es obligatorio.'),
    lastname: StringType()
      .isRequired('Este campo es obligatorio.'),
    password: StringType()
      .isRequired('Este campo es obligatorio.'),
    repassword: StringType()
      .pattern(REG_PASSWORD, 'La contraseñas no es valida.')
      .isOneOf([formValue.password], 'La contraseñas no coinciden.')
      .isRequired('Este campo es obligatorio.')
  })

  useEffect(() => {
    return () => stateResetActivateAccount()
  }, [])

  useEffect(() => {
    if (isActivateAccount === OPERATIONS.FULFILLED) { navigate('/login') }
  }, [isActivateAccount])

  const onClickActivateAccount = () => {
    if (formRef.current.check()) {
      const tokenInfo = {
        token, uidb: uuid
      }
      const user = {
        ...formValue
      }
      activateAccount({ tokenInfo, user })
    }
  }

  return { formRef, formValue, setFormValue, formModel, onClickActivateAccount }
}
