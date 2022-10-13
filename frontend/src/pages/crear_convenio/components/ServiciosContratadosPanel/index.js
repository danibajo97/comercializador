import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, ButtonGroup, Schema, SelectPicker, Row, Col, IconButton } from 'rsuite'
import PlusIcon from '@rsuite/icons/Plus'
import MinusIcon from '@rsuite/icons/Minus'
import { toast } from 'react-toastify'

import { FormField, InputNumber } from 'components'
import { getListadoServicios, retrieveConvenio } from 'redux/convenio/convenioSlice'

const ServiciosContratadosItem = ({ label, rowValue = {}, onChange, rowIndex, rowError }) => {
  const dispatch = useDispatch()
  const convenio = useSelector(state => state.convenio.convenio)
  const listadoServicios = useSelector(state => state.convenio.listadoServicios)

  const params = useParams()
  const { id } = params

  useEffect(() => {
    if (id !== undefined) { dispatch(retrieveConvenio({ id })) }
  }, [])

  useEffect(() => {
    if (convenio !== null) {
      dispatch(getListadoServicios({ convenio: convenio.id, plazopago: null }))
    }
  }, [convenio])

  const handleChangeName = value => {
    onChange(rowIndex, { ...rowValue, servicios: value })
  }
  const handleChangeAmount = value => {
    onChange(rowIndex, { ...rowValue, cantidad_bd: value })
  }

  const [labelServicio, labelCantidadBD] = label

  return (
    <Row className='mb-3'>
      <Col xs={17}>
        <FormField
          label={labelServicio}
          name='servicios'
          accepter={SelectPicker}
          data={listadoServicios.map(item => ({
            label: item.producto_nombre,
            value: item.id
          }))}
          value={rowValue.name}
          error={rowError?.servicios?.errorMessage}
          onChange={handleChangeName}
          required
          block
        />

      </Col>
      <Col xs={7}>
        <FormField
          label={labelCantidadBD}
          name='cantidad_bd'
          accepter={InputNumber}
          value={rowValue.cantidad_bd}
          error={rowError?.cantidad_bd?.errorMessage}
          onChange={handleChangeAmount}
          required
        />
      </Col>
    </Row>
  )
}

const ServiciosContratadosInputControl = ({ value = [], onChange, fieldError }) => {
  const errors = fieldError ? fieldError.array : []
  const [serviciosContratados, setServiciosContratados] = React.useState(value)
  const handleChangeServiciosContratados = nextServiciosContratados => {
    setServiciosContratados(nextServiciosContratados)
    onChange(nextServiciosContratados)
  }
  const handleInputChange = (rowIndex, value) => {
    const nextServiciosContratados = [...serviciosContratados]
    nextServiciosContratados[rowIndex] = value
    handleChangeServiciosContratados(nextServiciosContratados)
  }

  const handleMinus = () => {
    handleChangeServiciosContratados(serviciosContratados.slice(0, -1))
  }
  const handleAdd = () => {
    handleChangeServiciosContratados(serviciosContratados.concat([{ servicios: '', cantidad_bd: null }]))
  }

  const label = ['Servicios', 'Base de Datos']

  return (
    <>
      <Row>
        {serviciosContratados.map((rowValue, index) => (
          <ServiciosContratadosItem
            key={index}
            label={label}
            rowIndex={index}
            rowValue={rowValue}
            rowError={errors[index] ? errors[index].object : null}
            onChange={handleInputChange}
          />
        ))}

      </Row>
      <Row className='mt-1'>
        <Col xs={24}>
          <ButtonGroup size='sm'>
            <IconButton onClick={handleAdd} icon={<PlusIcon />} appearance='subtle' color='blue' />
            <IconButton onClick={handleMinus} icon={<MinusIcon />} appearance='subtle' color='red' />
          </ButtonGroup>
        </Col>
      </Row>
    </>
  )
}

const ServiciosContratadosPanel = () => {
  const formRef = React.useRef()
  const [db, serDB] = React.useState(4)
  const [formError, setFormError] = React.useState({})
  const [formValue, setFormValue] = React.useState({
    servicios_contratados: [
      { servicios: '', cantidad_bd: undefined }
    ]
  })

  const params = useParams()
  const { id } = params

  const { ArrayType, StringType, NumberType, ObjectType } = Schema.Types
  const model = Schema.Model({
    servicios_contratados: ArrayType().of(
      ObjectType().shape({
        servicios: StringType().isRequired('Este campo es obligatorio.'),
        cantidad_bd: NumberType().max(db, `No puede exceder de ${db} base de dastos.`).isRequired('Este campo es obligatorio.')
      })
    )
  })

  const guardarForm = () => {
    if (formRef.current.check()) { toast.success('OK') }
  }

  return (
    <Form
      fluid
      checkTrigger='blur'
      ref={formRef}
      onChange={setFormValue}
      onCheck={setFormError}
      formValue={formValue}
      model={model}
    >
      <Row>
        <Col xs={24}>
          <FormField
            label=''
            name='servicios_contratados'
            accepter={ServiciosContratadosInputControl}
            fieldError={formError.servicios_contratados}
          />
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col xs={24}>
          <Button
            size='sm'
            appearance='primary'
            onClick={guardarForm}
          >
            Guardar
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default ServiciosContratadosPanel
