<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react'
import { Popover, Whisper, Dropdown, IconButton, Table as TableRS } from 'rsuite'
import MoreIcon from '@rsuite/icons/legacy/More'

import Table from 'components/table/Table'
import usePagination from 'hooks/usePagination'
import useAlert from 'hooks/useAlert'
import { useDispatch } from 'react-redux'
import { deleteSolicitudLicencia } from 'redux/solicitudLicencia/solicitudLicenciaSlice'
import useModal from 'hooks/useModal'
import LicenciaForm from '../LicenciaForm'

const ActionCell = ({ rowData, dataKey, ...props }) => {
  const dispatch = useDispatch()

  const modalSolicitud = useModal({
    title: 'Solicitud de Licencia',
    size: 'sm',
    renderBody: ({ closeModal }) => {
      return (
        <LicenciaForm
          closeModal={closeModal} solicitudLicencia={{
            ...rowData
          }}
        />
      )
    }
  })

  const deleteAlert = useAlert({
    type: 'delete',
    text: 'Se eliminará la solicitud de licencia, esta acción no se puede deshacer.',
    isConfirm: true,
    textConfirm: 'Eliminar Solicitud'
  })

  const operationUpdate = () => {
    modalSolicitud.openModal()
  }

  const operationDelete = () => {
    deleteAlert.setConfirmAccion(() => {
      dispatch(deleteSolicitudLicencia({ id: rowData.id }))
    })
    deleteAlert.openAlert()
  }

  return (
    <>
      {modalSolicitud.modal}{deleteAlert.alert}
      <TableRS.Cell {...props} className='link-group'>
        <Whisper
          placement='bottomEnd' trigger='click' speaker={({ onClose, left, top, className }, ref) => {
            const handleSelect = eventKey => {
              onClose()
              switch (eventKey) {
                case 1:
                  operationUpdate()
                  break
                case 2:
                  operationDelete()
                  break
              }
            }
            return (
              <Popover ref={ref} className={className} style={{ left, top }} full>
                <Dropdown.Menu onSelect={handleSelect}>
                  <Dropdown.Item eventKey={1}>Editar</Dropdown.Item>
                  <Dropdown.Item eventKey={2}>Eliminar</Dropdown.Item>
                </Dropdown.Menu>
              </Popover>
            )
          }}
        >
          <IconButton className='mt--2 mb--2' size='sm' appearance='subtle' icon={<MoreIcon />} />
        </Whisper>
      </TableRS.Cell>
    </>
  )
}

export default function LicenciaTable ({ clientes }) {
  const { pagination, dataPage } = usePagination({ data: clientes })

  return (
    <>
      <Table data={dataPage} autoHeight>
        {Table.Column({ header: 'Nro', dataKey: 'no_solicitud', flex: 0.5 })}
        {Table.Column({ header: 'Fecha', dataKey: 'fecha', flex: 0.8 })}
        {Table.Column({ header: 'Persona que solicita', dataKey: 'solicitado_por_nombre', flex: 1 })}
        {Table.Column({ header: 'Cliente final', dataKey: 'cliente_final_nombre', flex: 1 })}
        {Table.Column({ header: 'Servicio', dataKey: 'servicio_nombre', flex: 1 })}
        {Table.Column({ header: 'Clave Registro', dataKey: 'semilla', flex: 1 })}
        {Table.ColumnBoolean({ header: 'Licencia', dataKey: 'licencia', flex: 1, opcions: { yes: 'Otorgada', no: 'Pendiente' } })}
        {Table.Column({ header: 'Observaciones', dataKey: 'observacion', flex: 1 })}
        {Table.ColumnAccion({ header: 'Acciones', dataKey: 'id', action: ActionCell })}
      </Table>
      {pagination}
    </>
  )
}
=======
import React from 'react'
import { Popover, Whisper, Dropdown, IconButton, Table as TableRS } from 'rsuite'
import MoreIcon from '@rsuite/icons/legacy/More'

import Table from 'components/table/Table'
import usePagination from 'hooks/usePagination'
import useAlert from 'hooks/useAlert'
import { useDispatch } from 'react-redux'
import { deleteSolicitudLicencia } from 'redux/solicitudLicencia/solicitudLicenciaSlice'
import useModal from 'hooks/useModal'
import LicenciaForm from '../LicenciaForm'

const ActionCell = ({ rowData, dataKey, ...props }) => {
  const dispatch = useDispatch()

  const modalSolicitud = useModal({
    title: 'Solicitud de Licencia',
    size: 'sm',
    renderBody: ({ closeModal }) => {
      return (
        <LicenciaForm
          closeModal={closeModal} solicitudLicencia={{
            ...rowData
          }}
        />
      )
    }
  })

  const deleteAlert = useAlert({
    type: 'delete',
    text: 'Se eliminará la solicitud de licencia, esta acción no se puede deshacer.',
    isConfirm: true,
    textConfirm: 'Eliminar Solicitud'
  })

  const operationUpdate = () => {
    modalSolicitud.openModal()
  }

  const operationDelete = () => {
    deleteAlert.setConfirmAccion(() => {
      dispatch(deleteSolicitudLicencia({ id: rowData.id }))
    })
    deleteAlert.openAlert()
  }

  return (
    <>
      {modalSolicitud.modal}{deleteAlert.alert}
      <TableRS.Cell {...props} className='link-group'>
        <Whisper
          placement='bottomEnd' trigger='click' speaker={({ onClose, left, top, className }, ref) => {
            const handleSelect = eventKey => {
              onClose()
              switch (eventKey) {
                case 1:
                  operationUpdate()
                  break
                case 2:
                  operationDelete()
                  break
              }
            }
            return (
              <Popover ref={ref} className={className} style={{ left, top }} full>
                <Dropdown.Menu onSelect={handleSelect}>
                  <Dropdown.Item eventKey={1}>Editar</Dropdown.Item>
                  <Dropdown.Item eventKey={2}>Eliminar</Dropdown.Item>
                </Dropdown.Menu>
              </Popover>
            )
          }}
        >
          <IconButton className='mt--2 mb--2' size='sm' appearance='subtle' icon={<MoreIcon />} />
        </Whisper>
      </TableRS.Cell>
    </>
  )
}

export default function LicenciaTable ({ clientes }) {
  const { pagination, dataPage } = usePagination({ data: clientes })

  return (
    <>
      <Table data={dataPage} autoHeight>
        {Table.Column({ header: 'Nro', dataKey: 'no_solicitud', flex: 0.5 })}
        {Table.Column({ header: 'Fecha', dataKey: 'fecha', flex: 0.8 })}
        {Table.Column({ header: 'Persona que solicita', dataKey: 'solicitado_por_nombre', flex: 1 })}
        {Table.Column({ header: 'Cliente final', dataKey: 'cliente_final_nombre', flex: 1 })}
        {Table.Column({ header: 'Servicio', dataKey: 'servicio_nombre', flex: 1 })}
        {Table.Column({ header: 'Clave Registro', dataKey: 'semilla', flex: 1 })}
        {Table.ColumnBoolean({ header: 'Licencia', dataKey: 'licencia', flex: 1, opcions: { yes: 'Otorgada', no: 'Pendiente' } })}
        {Table.Column({ header: 'Observaciones', dataKey: 'observacion', flex: 1 })}
        {Table.ColumnAccion({ header: 'Acciones', dataKey: 'id', action: ActionCell })}
      </Table>
      {pagination}
    </>
  )
}
>>>>>>> b9e22348c3fbfc0ac0d804ce6a9284166f55da50
=======
import React from 'react'
import { Popover, Whisper, Dropdown, IconButton, Table as TableRS } from 'rsuite'
import MoreIcon from '@rsuite/icons/legacy/More'

import Table from 'components/table/Table'
import usePagination from 'hooks/usePagination'
import useAlert from 'hooks/useAlert'
import { useDispatch } from 'react-redux'
import { deleteSolicitudLicencia } from 'redux/solicitudLicencia/solicitudLicenciaSlice'
import useModal from 'hooks/useModal'
import LicenciaForm from '../LicenciaForm'

const ActionCell = ({ rowData, dataKey, ...props }) => {
  const dispatch = useDispatch()

  const modalSolicitud = useModal({
    title: 'Solicitud de Licencia',
    size: 'sm',
    renderBody: ({ closeModal }) => {
      return (
        <LicenciaForm
          closeModal={closeModal} solicitudLicencia={{
            ...rowData
          }}
        />
      )
    }
  })

  const deleteAlert = useAlert({
    type: 'delete',
    text: 'Se eliminará la solicitud de licencia, esta acción no se puede deshacer.',
    isConfirm: true,
    textConfirm: 'Eliminar Solicitud'
  })

  const operationUpdate = () => {
    modalSolicitud.openModal()
  }

  const operationDelete = () => {
    deleteAlert.setConfirmAccion(() => {
      dispatch(deleteSolicitudLicencia({ id: rowData.id }))
    })
    deleteAlert.openAlert()
  }

  return (
    <>
      {modalSolicitud.modal}{deleteAlert.alert}
      <TableRS.Cell {...props} className='link-group'>
        <Whisper
          placement='bottomEnd' trigger='click' speaker={({ onClose, left, top, className }, ref) => {
            const handleSelect = eventKey => {
              onClose()
              switch (eventKey) {
                case 1:
                  operationUpdate()
                  break
                case 2:
                  operationDelete()
                  break
              }
            }
            return (
              <Popover ref={ref} className={className} style={{ left, top }} full>
                <Dropdown.Menu onSelect={handleSelect}>
                  <Dropdown.Item eventKey={1}>Editar</Dropdown.Item>
                  <Dropdown.Item eventKey={2}>Eliminar</Dropdown.Item>
                </Dropdown.Menu>
              </Popover>
            )
          }}
        >
          <IconButton className='mt--2 mb--2' size='sm' appearance='subtle' icon={<MoreIcon />} />
        </Whisper>
      </TableRS.Cell>
    </>
  )
}

export default function LicenciaTable ({ clientes }) {
  const { pagination, dataPage } = usePagination({ data: clientes })

  return (
    <>
      <Table data={dataPage} autoHeight>
        {Table.Column({ header: 'Nro', dataKey: 'no_solicitud', flex: 0.5 })}
        {Table.Column({ header: 'Fecha', dataKey: 'fecha', flex: 0.8 })}
        {Table.Column({ header: 'Persona que solicita', dataKey: 'solicitado_por_nombre', flex: 1 })}
        {Table.Column({ header: 'Cliente final', dataKey: 'cliente_final_nombre', flex: 1 })}
        {Table.Column({ header: 'Servicio', dataKey: 'servicio_nombre', flex: 1 })}
        {Table.Column({ header: 'Clave Registro', dataKey: 'semilla', flex: 1 })}
        {Table.ColumnBoolean({ header: 'Licencia', dataKey: 'licencia', flex: 1, opcions: { yes: 'Otorgada', no: 'Pendiente' } })}
        {Table.Column({ header: 'Observaciones', dataKey: 'observacion', flex: 1 })}
        {Table.ColumnAccion({ header: 'Acciones', dataKey: 'id', action: ActionCell })}
      </Table>
      {pagination}
    </>
  )
}
>>>>>>> b9e22348c3fbfc0ac0d804ce6a9284166f55da50
