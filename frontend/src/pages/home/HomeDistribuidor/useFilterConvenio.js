import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AutoComplete, Button, CheckPicker, Col, DateRangePicker, Drawer, Form, RangeSlider } from 'rsuite'

import { FormField } from 'components'
import estadosConvenios from 'constants/estadosConvenios'
import { getClientesFinales, stateResetOperation } from 'redux/datosGenerales/datosGeneralesSlice'

const INIT_FILTER = {
  nroContrato: '',
  nroConvenio: '',
  cliente: '',
  fecha: [],
  estado: [],
  baseDatos: [1, 20]
}

export default function useFilterConvenio ({ setValueFilter }) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const [formValue, setFormValue] = useState(INIT_FILTER)

  const clientesFinales = useSelector(state => state.datosGenerales.clientesFinales)

  const estadoData = estadosConvenios.map(item => {
    if (item.visible) { return { label: item.text, value: item.id } } else { return undefined }
  }).filter(item => item !== undefined)

  useEffect(() => {
    dispatch(getClientesFinales())

    return () => {
      dispatch(stateResetOperation())
    }
  }, [])

  const clickFiltar = () => {
    setValueFilter(formValue)
    setOpen(false)
  }

  const clickLimpiarFiltar = () => {
    setFormValue(INIT_FILTER)
  }

  const drawerFilter = (
    <Drawer size='xs' keyboard backdrop='static' open={open} onClose={() => setOpen(false)}>
      <Drawer.Header>
        <Drawer.Title>Filtar Convenios</Drawer.Title>
        <Drawer.Actions>
          <Button size='sm' appearance='primary' onClick={clickFiltar}>
            Filtrar
          </Button>
          <Button size='sm' appearance='default' onClick={clickLimpiarFiltar}>
            Limpiar
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>
        <Form
          fluid
          onChange={setFormValue}
          formValue={formValue}
          className='ml--4 mr--4'
        >
          <Col xs={24} className='mb-4'>
            <FormField name='nroContrato' label='Nro Contrato' />
            <FormField name='nroConvenio' label='Nro Convenio' />
            <FormField name='cliente' label='Cliente' accepter={AutoComplete} data={clientesFinales.map(cliente => cliente.nombre)} />
            <FormField name='fecha' label='Fecha' accepter={DateRangePicker} placement='bottomEnd' showWeekNumbers block />
            <FormField name='estado' label='Estado' accepter={CheckPicker} data={estadoData} value={formValue.estado} block />
            <FormField name='baseDatos' label='Cantidad de Base de Datos' accepter={RangeSlider} defaultValue={[1, 20]} min={1} step={1} max={20} />
          </Col>
        </Form>
      </Drawer.Body>
    </Drawer>
  )

  return {
    drawerFilter,
    open: () => setOpen(true)
  }
}
