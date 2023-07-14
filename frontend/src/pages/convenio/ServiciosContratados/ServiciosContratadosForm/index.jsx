import { useState } from 'react'
import { Form, ButtonGroup, SelectPicker, Row, Col, IconButton, Divider } from 'rsuite'
import PlusIcon from '@rsuite/icons/Plus'
import MinusIcon from '@rsuite/icons/Minus'

import { FormField, InputNumber, Loader, Button } from 'components'
import useServiciosContratadosForm from './useServiciosContratadosForm'
import { useSelector } from 'react-redux'

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

const ServiciosContratadosInputControl = ({ value = [], onChange, fieldError, plaintext }) => {
  const errors = fieldError ? fieldError.array : []
  const [serviciosContratados, setServiciosContratados] = useState(value)
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
      <Row className='mt-1' hidden={plaintext}>
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

function ServiciosContratadosForm () {
  const {
    formRef,
    formModel,
    formValue,
    setFormValue,
    formError,
    setFormError,
    hasError,
    isComfirmado,
    isLoading,
    isServiciosContratadosRelacionado,
    guardarForm,
    isAddServContratados
  } = useServiciosContratadosForm()

  const renderForm = () => {
    return (
      <Form
        fluid
        checkTrigger='change'
        ref={formRef}
        onChange={setFormValue}
        onCheck={setFormError}
        formValue={formValue}
        model={formModel}
        plaintext={isComfirmado()}
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
              icon='save'
              text='Guardar'
              appearance='primary'
              disabled={hasError()}
              hidden={isComfirmado()}
              onClick={guardarForm}
              loading={isAddServContratados()}
            />
          </Col>
        </Row>
      </Form>
    )
  }

  return (
    <>
      {isLoading()
        ? (
          <>
            {!isComfirmado() && isServiciosContratadosRelacionado()}
            {renderForm()}
          </>)
        : <Loader.Paragraph rows={3} />}
      <Loader.Dialog loading={isAddServContratados()} content='Guardando...' />
    </>
  )
}

export default ServiciosContratadosForm
