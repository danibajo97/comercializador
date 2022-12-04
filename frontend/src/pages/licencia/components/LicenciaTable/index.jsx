import { useEffect } from 'react'
import { Popover, Whisper, Dropdown, IconButton, Table as TableRS } from 'rsuite'

import Table from 'components/table/Table'
import useAlert from 'hooks/useAlert'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSolicitudLicencia, otorgarSolicitudLicencia, getSolicitudLicenciaAll, stateResetOperation } from 'redux/solicitudLicencia/solicitudLicenciaSlice'
import useModal from 'hooks/useModal'
import LicenciaForm from '../LicenciaForm'
import { CopiarLicencia } from 'components'
import OPERATIONS from 'constants/operationsRedux'

const PAGINATION_LIMIT = parseInt(process.env.REACT_APP_PAGINATION_LIMIT)

const ActionCell = ({ rowData, dataKey, ...props }) => {
  const isOtorgada = rowData.otorgada
  const dispatch = useDispatch()

  const isOtorgar = useSelector(state => state.solicitudLicencia.isOtorgar)

  useEffect(() => {
    if (isOtorgar === OPERATIONS.FULFILLED) { dispatch(getSolicitudLicenciaAll({ pagination: { page: 1, limit: PAGINATION_LIMIT } })) }
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
          <IconButton className='mt--2 mb--2 pl-2 pr-2' size='sm' appearance='subtle' icon={<i className='fa fa-ellipsis-v' />} />
        </Whisper>
      </TableRS.Cell>
    </>
  )
}

export default function LicenciaTable ({ clientes, pagination }) {
  return (
    <>
      <Table data={clientes} autoHeight>
        {Table.Column({ header: 'Nro', dataKey: 'no_solicitud', flex: 0.3, minWidth: 50 })}
        {Table.Column({ header: 'Fecha', dataKey: 'fecha', flex: 0.5 })}
        {Table.Column({ header: 'Persona que solicita', dataKey: 'solicitado_por_nombre', flex: 1, minWidth: 200 })}
        {Table.Column({ header: 'Cliente final', dataKey: 'cliente_final_nombre', flex: 1.5, minWidth: 200 })}
        {Table.Column({ header: 'Servicio', dataKey: 'servicio_nombre', flex: 1.5, minWidth: 200 })}
        {Table.ColumnBoolean({ header: 'Licencia', dataKey: 'licencia', flex: 1, opcions: { yes: 'Otorgada', no: 'Pendiente' } })}
        {Table.Column({ header: 'Observación', dataKey: 'observacion', flex: 2, minWidth: 250 })}
        {Table.ColumnAccion({ action: ActionCell })}
      </Table>
      {pagination}
    </>
  )
}
