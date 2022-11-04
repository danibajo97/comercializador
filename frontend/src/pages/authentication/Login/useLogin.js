import useAuth from 'hooks/useAuth'
import { useRef, useState } from 'react'
import { Schema } from 'rsuite'

export default function useLogin () {
  const { isAuth, isLoading, login } = useAuth()

  const formRef = useRef()
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const { StringType } = Schema.Types
  const formModel = Schema.Model({
    email: StringType()
      .isEmail('Este campo no es un correo.')
      .isRequired('Este campo es obligatorio.'),
    password: StringType()
      .isRequired('Este campo es obligatorio.')
  })

  const handleSubmit = () => {
    if (formRef.current.check()) {
      login({ email: formValue.email, password: formValue.password })
    }
  }

  return { formRef, formValue, setFormValue, formModel, handleSubmit, isAuth, isLoading }
}
