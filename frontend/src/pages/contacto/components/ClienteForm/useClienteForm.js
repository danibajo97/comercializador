import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Schema } from 'rsuite'

import { getProvincias, addContacto, stateResetOperation } from 'redux/contacto/contactoSlice'
import OPERATIONS from 'constants/operationsRedux'

export default function useClienteForm ({ closeModal }) {
  const dispatch = useDispatch()
  const formRef = useRef()

  const provincias = useSelector(state => state.contacto.provincias)
  const isListProvincia = useSelector(state => state.contacto.isListProvincia)

  const isAdd = useSelector(state => state.contacto.isAdd)

  const [formValue, setFormValue] = useState({
    nombre: '',
    abreviatura: '',
    organismo_id: '',
    telefono: '',
    correo: '',
    municipio_id: '',
    direccion: ''
  })

  const { StringType } = Schema.Types
  const formModel = Schema.Model({
    nombre: StringType().isRequired('Este campo es obligatorio.'),
    abreviatura: StringType(),
    organismo_id: StringType(), // .isRequired('Este campo es obligatorio.'),
    telefono: StringType(),
    correo: StringType().isEmail('Este campo no es un correo.').isRequired('Este campo es obligatorio.'),
    municipio_id: StringType().isRequired('Este campo es obligatorio.'),
    direccion: StringType()
  })

  useEffect(() => {
    dispatch(getProvincias())

    return () => {
      dispatch(stateResetOperation())
    }
  }, [])

  useEffect(() => {
    if (isAdd === OPERATIONS.FULFILLED && closeModal) { closeModal() }
  }, [isAdd])

  const handleSubmit = () => {
    if (formRef.current.check()) {
      const UUID_PAIS = '01a9aeac-7488-47ba-9d81-019d8a5a7981'
      const params = {
        ...formValue,
        pais_id: UUID_PAIS,
        contacto_existe: false
      }
      dispatch(addContacto({ params }))
    }
  }

  const dataOrganismo = [
    {
      label: 'Azcuba',
      value: 'ccc021fb-3dce-5877-8fe6-75691c66fc23'
    }
  ]

  const isLoading = () => isListProvincia === OPERATIONS.FULFILLED

  return { formModel, formRef, formValue, setFormValue, provincias, dataOrganismo, handleSubmit, isLoading }
}
