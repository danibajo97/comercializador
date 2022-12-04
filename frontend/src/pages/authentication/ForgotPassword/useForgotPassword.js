import { useRef, useState } from 'react'
import { Schema } from 'rsuite'

export default function useForgotPassword () {
  const formRef = useRef()
  const [formValue, setFormValue] = useState({
    email: ''
  })

  const { StringType } = Schema.Types
  const formModel = Schema.Model({
    email: StringType()
      .isEmail('Por favor, introduce una dirección de correo electrónico válida.')
      .isRequired('Este campo es obligatorio.')
  })

  const onClickForgotPassword = () => {
    console.log({ email: formValue.email })
  }

  return { formRef, formValue, setFormValue, formModel, onClickForgotPassword }
}
