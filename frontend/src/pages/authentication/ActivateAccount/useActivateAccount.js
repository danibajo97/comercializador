import { useRef, useState } from 'react'
import { Schema } from 'rsuite'

export default function useActivateAccount () {
  const formRef = useRef()
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const { StringType } = Schema.Types
  const formModel = Schema.Model({
    first_name: StringType().isRequired('Este campo es obligatorio.'),
    last_name: StringType().isRequired('Este campo es obligatorio.'),
    password: StringType().isRequired('Este campo es obligatorio.'),
    re_password: StringType().isRequired('Este campo es obligatorio.')
  })

  const onClickActivateAccount = (uuid, token) => {
    console.log({ uuid, token })
  }

  return { formRef, formValue, setFormValue, formModel, onClickActivateAccount }
}
