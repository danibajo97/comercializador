import React, { useEffect } from 'react'
import { Popover, Whisper, Dropdown, IconButton, Table as TableRS } from 'rsuite'
import MoreIcon from '@rsuite/icons/legacy/More'

import Table from 'components/table/Table'
import usePagination from 'hooks/usePagination'
import useAlert from 'hooks/useAlert'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSolicitudLicencia, otorgarSolicitudLicencia, getSolicitudLicenciaAll, stateResetOperation } from 'redux/solicitudLicencia/solicitudLicenciaSlice'
import useModal from 'hooks/useModal'
import LicenciaForm from '../LicenciaForm'
import { CopiarLicencia } from 'components'
import OPERATIONS from 'constants/operationsRedux'

const ActionCell = ({ rowData, dataKey, ...props }) => {
  const isOtorgada = rowData.otorgada
  const dispatch = useDispatch()

  const isOtorgar = useSelector(state => state.solicitudLicencia.isOtorgar)

  useEffect(() => {
    if (isOtorgar === OPERATIONS.FULFILLED) { dispatch(getSolicitudLicenciaAll({ page: 1 })) }
  }, [isOtorgar])

  useEffect(() => {
    dispatch(stateResetOperation())
  }, [])

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
    title: 'Copiar Licencia',
    size: 'sm',
    renderBody: ({ closeModal }) => {
      return (
        <CopiarLicencia closeModal={closeModal} textLicencia={rowData.licencia} />
      )
    }
  })

  const deleteAlert = useAlert({
    type: 'eliminar',
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
                  <Dropdown.Item eventKey={4} hidden={!isOtorgada}>Copiar Licencia</Dropdown.Item>
                  <Dropdown.Item eventKey={3} hidden={isOtorgada}>Otorgar Licencia</Dropdown.Item>
                  <Dropdown.Item divider hidden={isOtorgada} />
                  <Dropdown.Item eventKey={1} hidden={isOtorgada}>Editar</Dropdown.Item>
                  <Dropdown.Item eventKey={2} hidden={isOtorgada}>Eliminar</Dropdown.Item>
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

export default function LicenciaTable ({ clientes, pagination }) {
  // const { pagination, dataPage } = usePagination({ data: clientes })

  return (
    <>
      <Table data={clientes} autoHeight>
        {Table.Column({ header: 'Nro', dataKey: 'no_solicitud', flex: 1 })}
        {Table.Column({ header: 'Fecha', dataKey: 'fecha', flex: 1 })}
        {Table.Column({ header: 'Persona que solicita', dataKey: 'solicitado_por_nombre', flex: 1.2 })}
        {Table.Column({ header: 'Cliente final', dataKey: 'cliente_final_nombre', flex: 2 })}
        {Table.Column({ header: 'Servicio', dataKey: 'servicio_nombre', flex: 2 })}
        {Table.ColumnBoolean({ header: 'Licencia', dataKey: 'licencia', flex: 1.2, opcions: { yes: 'Otorgada', no: 'Pendiente' } })}
        {Table.Column({ header: 'Observación', dataKey: 'observacion', flex: 3 })}
        {Table.ColumnAccion({ header: 'Acciones', dataKey: 'id', action: ActionCell })}
      </Table>
      {pagination}
    </>
  )
}
