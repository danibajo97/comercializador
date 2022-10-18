import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, ButtonGroup, Schema, SelectPicker, Row, Col, IconButton, Placeholder, Divider } from 'rsuite'
import PlusIcon from '@rsuite/icons/Plus'
import MinusIcon from '@rsuite/icons/Minus'

import { FormField, InputNumber } from 'components'
import { getListadoServicios, retrieveConvenio, stateResetOperation as stateResetOperationConvenio } from 'redux/convenio/convenioSlice'
import { addServiciosContratados, getServiciosContratadosAll, stateResetOperation as stateResetOperationServiciosContratados } from 'redux/serviciosContratados/serviciosContratadosSlice'
import OPERATIONS from 'constants/operationsRedux'

const ServiciosContratadosItem = ({ label, rowValue = {}, onChange, rowIndex, rowError }) => {
  const listadoServicios = useSelector(state => state.convenio.listadoServicios)

  const handleChangeName = value => {
    onChange(rowIndex, { ...rowValue, servicios: value })
  }
  const handleChangeAmount = value => {
    onChange(rowIndex, { ...rowValue, cantidad_bd: value })
  }

  const [labelServicio, labelCantidadBD] = label

  return (
    <>
      <Row className='mb-3'>
        <Col xs={24} sm={7} hidden>
          <FormField
            label='Id'
            name='id'
            value={rowValue.id}
            // error={rowError?.id?.errorMessage}
            // onChange={handleChangeAmount}
            hidden
          />
        </Col>
        <Col xs={24} sm={17}>
          <FormField
            label={labelServicio}
            name='servicios'
            accepter={SelectPicker}
            data={listadoServicios.map(item => ({
              label: item.producto_nombre,
              value: item.id
            }))}
            value={rowValue.servicios}
            error={rowError?.servicios?.errorMessage}
            onChange={handleChangeName}
            required
            block
          />
        </Col>
        <Col className='d-block d-sm-none mt-3' />
        <Col xs={24} sm={7}>
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
    </>
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
          <div key={index}>
            <ServiciosContratadosItem
              label={label}
              rowIndex={index}
              rowValue={rowValue}
              rowError={errors[index] ? errors[index].object : null}
              onChange={handleInputChange}
            />
            <div className='d-block d-sm-none'>
              <Divider hidden={serviciosContratados.length === index + 1} />
            </div>
          </div>
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
  const dispatch = useDispatch()
  const formRef = React.useRef()
  const [db, serDB] = React.useState(4)
  const [formError, setFormError] = React.useState({})
  const [formValue, setFormValue] = React.useState({
    servicios_contratados: [
      { id: undefined, servicios: '', cantidad_bd: undefined }
    ]
  })

  const params = useParams()
  const { id } = params

  const convenio = useSelector(state => state.convenio.convenio)
  const listadoServicios = useSelector(state => state.convenio.listadoServicios)
  const isListServicios = useSelector(state => state.convenio.isListServicios)

  const serviciosContratados = useSelector(state => state.serviciosContratados.serviciosContratados)
  const isList = useSelector(state => state.serviciosContratados.isList)

  useEffect(() => {
    if (id !== undefined) {
      dispatch(retrieveConvenio({ id }))
      dispatch(getServiciosContratadosAll({ convenio: id }))
    }
    return () => {
      dispatch(stateResetOperationConvenio())
      dispatch(stateResetOperationServiciosContratados())
    }
  }, [])

  useEffect(() => {
    const data = serviciosContratados.map(sc => {
      return { id: sc.id, servicios: sc.servicio, cantidad_bd: sc.cantidad }
    })
    if (data.length > 0) { setFormValue({ servicios_contratados: data }) }
  }, [serviciosContratados])

  useEffect(() => {
    if (convenio !== null) {
      serDB(convenio.cantidad_bd)
      dispatch(getListadoServicios({ convenio: convenio.id, plazopago: null }))
    }
  }, [convenio])

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
    if (formRef.current.check()) {
      const params = formValue.servicios_contratados.map((sc, index) => {
        const servicio = listadoServicios.find(ls => ls.id === sc.servicios)
        return {
          id: sc.id,
          convenio: convenio.id,
          servicio: servicio.id,
          cantidad: sc.cantidad_bd,
          a_facturar: servicio.precio_moneda,
          precio: servicio.precio_moneda
        }
      })
      const a = { convenio: convenio.id, params }
      console.log({ a })
      dispatch(addServiciosContratados(a))
    }
  }

  const hasError = () => Object.keys(formError).length !== 0

  const renderForm = () => {
    return (
      <Form
        fluid
        checkTrigger='change'
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
              disabled={hasError()}
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

  return (
    <>
      {isList === OPERATIONS.FULFILLED && isListServicios === OPERATIONS.FULFILLED
        ? renderForm()
        : <Placeholder.Paragraph rows={3} />}
    </>
  )
}

export default ServiciosContratadosPanel
