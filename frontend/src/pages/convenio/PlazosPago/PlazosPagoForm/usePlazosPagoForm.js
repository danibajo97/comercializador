import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Schema } from 'rsuite'
import { retrieveConvenio, stateResetOperation as stateResetOperationConvenio } from 'redux/convenio/convenioSlice'
import { getPlazoPagoAll, addPlazoPago, updatePlazoPago, stateResetOperation as stateResetOperationPlazosPagos } from 'redux/plazoPago/plazoPagoSlice'
import OPERATIONS from 'constants/operationsRedux'
import { date } from 'utils'

export default function usePlazosPagoForm ({ closeModal, convenioId, plazoPago = null }) {
  const dispatch = useDispatch()
  const formRef = useRef()

  const convenio = useSelector(state => state.convenio.convenio)
  const isRetrieve = useSelector(state => state.convenio.isRetrieve)
  const isAdd = useSelector(state => state.plazoPago.isAdd)
  const isUpdate = useSelector(state => state.plazoPago.isUpdate)

  const [formValue, setFormValue] = useState({
    plazoDePago: plazoPago?.dias || 30,
    fecha: undefined
  })

  const { NumberType, DateType } = Schema.Types
  const formModel = Schema.Model({
    plazoDePago: NumberType().min(1, 'No puede ser menor que 1.').isRequired('Este campo es obligatorio.'),
    fecha: DateType()
  })

  useEffect(() => {
    dispatch(retrieveConvenio({ id: convenioId }))

    return () => {
      dispatch(stateResetOperationConvenio())
      dispatch(stateResetOperationPlazosPagos())
    }
  }, [])

  useEffect(() => {
    if (convenio) {
      setFormValue({
        ...formValue,
        fecha: date.setDate({
          date: convenio.fecha_emision,
          days: formValue.plazoDePago
        })
      })
    }
  }, [convenio])

  useEffect(() => {
    if (isAdd === OPERATIONS.FULFILLED || isUpdate === OPERATIONS.FULFILLED) {
      dispatch(getPlazoPagoAll({ convenio: convenioId }))
      if (closeModal) closeModal()
    }
  }, [isAdd, isUpdate])

  const handleSubmit = () => {
    if (formRef.current.check()) {
      const params = {
        negocio: convenioId,
        dias: parseInt(formValue.plazoDePago),
        fecha: date.toISODate({ date: formValue.fecha })
      }

      if (plazoPago === null) {
        dispatch(addPlazoPago({ params }))
      } else {
        dispatch(updatePlazoPago({ id: plazoPago.id, params }))
      }
    }
  }

  const onChangeDays = (value) => {
    const incremento = date.setDate({ date: convenio.fecha_emision, days: value })
    setFormValue({
      plazoDePago: value,
      fecha: incremento
    })
  }

  const isLoading = () => isRetrieve === OPERATIONS.FULFILLED

  return {
    formRef,
    formValue,
    setFormValue,
    formModel,
    convenio,
    onChangeDays,
    handleSubmit,
    isLoading
  }
}
