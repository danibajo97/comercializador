import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AutoComplete, Button, CheckPicker, Col, DateRangePicker, Drawer, Form, RangeSlider } from 'rsuite'

import { FormField } from 'components'
import estadosConvenios from 'constants/estadosConvenios'
import { getClientesFinales, stateResetOperation } from 'redux/datosGenerales/datosGeneralesSlice'

import FilterClearIcon from '@rsuite/icons/Funnel'

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
        <Drawer.Title>Filtrar Convenios</Drawer.Title>
        <Drawer.Actions>
          <Button appearance='primary' size='sm' onClick={clickFiltar}>
            <i className='d-sm-block d-md-none fa fa-filter ' />
            <div className='mf-2 d-none d-md-inline-block'>Filtrar</div>
          </Button>
          <Button appearance='default' size='sm' onClick={clickLimpiarFiltar}>
            <FilterClearIcon className='d-sm-block d-md-none' />
            <div className='mf-2 d-none d-md-inline-block'>Limpiar</div>
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
