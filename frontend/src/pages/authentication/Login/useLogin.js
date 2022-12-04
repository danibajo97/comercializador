import { useRef, useState } from 'react'
import { Schema } from 'rsuite'

import useAuth from 'hooks/useAuth'

export default function useLogin () {
  const { isAuth, isLoading, login } = useAuth()

  const formRef = useRef()
  const [formValue, setFormValue] = useState({
    username: '',
    password: ''
  })

  const { StringType } = Schema.Types
  const formModel = Schema.Model({
    username: StringType()
      .isRequired('Este campo es obligatorio.'),
    password: StringType()
      .isRequired('Este campo es obligatorio.')
  })

  const handleSubmit = () => {
    if (formRef.current.check()) {
      login({ username: formValue.username, password: formValue.password })
    }
  }

  return { formRef, formValue, setFormValue, formModel, handleSubmit, isAuth, isLoading }
}
