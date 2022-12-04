import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, CheckPicker, Col, DateRangePicker, Drawer, Form } from 'rsuite'

import { getServiciosActualizacion, stateResetOperation } from 'redux/solicitudLicencia/solicitudLicenciaSlice'

import { FormField } from 'components'

const INIT_FILTER = {
  nro: '',
  fecha: [],
  persona: '',
  cliente: '',
  servicio: [],
  licencia: []
}

export default function useFilterLicencia ({ setValueFilter }) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const [formValue, setFormValue] = useState(INIT_FILTER)
  const serviciosActualizacion = useSelector(state => state.solicitudLicencia.serviciosActualizacion)

  const estadoData = [
    { label: 'Pendiente', value: true },
    { label: 'Otorgado', value: false }
  ]

  useEffect(() => {
    dispatch(getServiciosActualizacion({ cliente: null }))

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
        <Drawer.Title>Filtrar Licencia</Drawer.Title>
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
            <FormField name='nro' label='Nro' />
            <FormField name='fecha' label='Fecha' accepter={DateRangePicker} placement='bottomEnd' showWeekNumbers block />
            <FormField name='cliente' label='Cliente Final' />
            <FormField
              name='servicio' label='Servicio' accepter={CheckPicker} data={serviciosActualizacion.map(item => ({
                label: item.servicio_descripcion,
                value: item.servicio_id
              }))} block
            />
            <FormField name='licencia' label='Licencia' accepter={CheckPicker} data={estadoData} block />
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
