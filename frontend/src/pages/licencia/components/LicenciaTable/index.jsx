import React from 'react'
import { Popover, Whisper, Dropdown, IconButton, Table as TableRS } from 'rsuite'
import MoreIcon from '@rsuite/icons/legacy/More'

import Table from 'components/table/Table'
import usePagination from 'hooks/usePagination'
import useAlert from 'hooks/useAlert'
import { useDispatch } from 'react-redux'
import { deleteSolicitudLicencia, otorgarSolicitudLicencia } from 'redux/solicitudLicencia/solicitudLicenciaSlice'
import useModal from 'hooks/useModal'
import LicenciaForm from '../LicenciaForm'
import { CopiarLicencia } from 'components'

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

  const modalCopiarLicencia = useModal({
    title: 'Copiar de Licencia',
    size: 'sm',
    renderBody: ({ closeModal }) => {
      return (
        <CopiarLicencia closeModal={closeModal} textLicencia={rowData.observacion} />
      )
    }
  })

  const deleteAlert = useAlert({
    type: 'delete',
    text: 'Se eliminará la solicitud de licencia, esta acción no se puede deshacer.',
    isConfirm: true,
    textConfirm: 'Eliminar Solicitud'
  })

  const otorgarLicenciaAlert = useAlert({
    type: 'licencia',
    text: 'Se otorgará la licencia, esta acción no se puede deshacer.',
    isConfirm: true,
    textConfirm: 'Otorgar Licencia'
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

  const operationOtorgarLicencia = () => {
    otorgarLicenciaAlert.setConfirmAccion(() => {
      dispatch(otorgarSolicitudLicencia({ detalle: rowData.iddetalle }))
    })
    otorgarLicenciaAlert.openAlert()
  }

  const operationCopiarLicencia = () => {
    modalCopiarLicencia.openModal()
  }

  return (
    <>
      {modalCopiarLicencia.modal}{modalSolicitud.modal}{deleteAlert.alert}{otorgarLicenciaAlert.alert}
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
                case 3:
                  operationOtorgarLicencia()
                  break
                case 4:
                  operationCopiarLicencia()
                  break
              }
            }
            return (
              <Popover ref={ref} className={className} style={{ left, top }} full>
                <Dropdown.Menu onSelect={handleSelect}>
                  <Dropdown.Item eventKey={4}>Copiar Licencia</Dropdown.Item>
                  <Dropdown.Item eventKey={3}>Otorgar Licencia</Dropdown.Item>
                  <Dropdown.Item divider />
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
        {Table.Column({ header: 'Nro', dataKey: 'no_solicitud', flex: 0.3 })}
        {Table.Column({ header: 'Fecha', dataKey: 'fecha', flex: 0.6 })}
        {Table.Column({ header: 'Persona que solicita', dataKey: 'solicitado_por_nombre', flex: 1 })}
        {Table.Column({ header: 'Cliente final', dataKey: 'cliente_final_nombre', flex: 1.2 })}
        {Table.Column({ header: 'Servicio', dataKey: 'servicio_nombre', flex: 1.2 })}
        {/* {Table.Column({ header: 'Clave Registro', dataKey: 'semilla', flex: 1 })} */}
        {Table.ColumnBoolean({ header: 'Licencia', dataKey: 'licencia', flex: 1, opcions: { yes: 'Otorgada', no: 'Pendiente' } })}
        {Table.Column({ header: 'Observación', dataKey: 'observacion', flex: 2 })}
        {Table.ColumnAccion({ header: 'Acciones', dataKey: 'id', action: ActionCell })}
      </Table>
      {pagination}
    </>
  )
}
