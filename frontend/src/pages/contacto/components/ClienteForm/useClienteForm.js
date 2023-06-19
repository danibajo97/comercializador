import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Schema } from 'rsuite'

import { getProvincias, getOrganismos, stateResetOperation as stateResetOperationContacto } from 'redux/contacto/contactoSlice'
import { addContacto as addContactoCF, stateResetOperationAddContacto as stateResetOperationAddContactoCF } from 'redux/clientesFinales/clientesFinalesSlice'
import { addContacto as addContactoDG, stateResetOperationAddContacto as stateResetOperationAddContactoDG } from 'redux/datosGenerales/datosGeneralesSlice'
import OPERATIONS from 'constants/operationsRedux'

export default function useClienteForm ({ closeModal, type }) {
  const dispatch = useDispatch()
  const formRef = useRef()

  const provincias = useSelector(state => state.contacto.provincias)
  const isListProvincia = useSelector(state => state.contacto.isListProvincia)

  const organismos = useSelector(state => state.contacto.organismos)
  const isListOrganismo = useSelector(state => state.contacto.isListOrganismo)

  const isAddContactoCF = useSelector(state => state.clientesFinales.isAddContacto)
  const isAddContactoDG = useSelector(state => state.datosGenerales.isAddContacto)

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
    abreviatura: StringType().isRequired('Este campo es obligatorio.'),
    organismo_id: StringType(),
    telefono: StringType().isRequired('Este campo es obligatorio.'),
    correo: StringType().isEmail('Este campo no es un correo.').isRequired('Este campo es obligatorio.'),
    municipio_id: StringType().isRequired('Este campo es obligatorio.'),
    direccion: StringType().isRequired('Este campo es obligatorio.')
  })

  useEffect(() => {
    dispatch(getProvincias())
    dispatch(getOrganismos())

    return () => {
      dispatch(stateResetOperationContacto())
      dispatch(stateResetOperationAddContactoCF())
      dispatch(stateResetOperationAddContactoDG())
    }
  }, [])

  useEffect(() => {
    const isAdd = type === 'datos_generales' ? isAddContactoDG : isAddContactoCF
    if (isAdd === OPERATIONS.FULFILLED && closeModal) { closeModal() }
  }, [isAddContactoDG, isAddContactoCF])

  const handleSubmit = () => {
    if (formRef.current.check()) {
      const params = {
        ...formValue,
        contacto_existe: false
      }
      if (type === 'datos_generales') {
        dispatch(addContactoDG({ params }))
      } else {
        dispatch(addContactoCF({ params }))
      }
    }
  }

  const isLoading = () => isListProvincia === OPERATIONS.FULFILLED || isListOrganismo === OPERATIONS.FULFILLED

  return { formModel, formRef, formValue, setFormValue, provincias, organismos, handleSubmit, isLoading }
}
