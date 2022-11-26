import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popover, Table as TableRS, Whisper, Dropdown, IconButton } from 'rsuite'

import { getPlazoPagoServicioAll, deletePlazoPagoServicio, stateResetOperation } from 'redux/plazoPagoServicio/plazoPagoServicioSlice'
import OPERATIONS from 'constants/operationsRedux'
import Table from 'components/table/Table'
import { Loader } from 'components'
import usePagination from 'hooks/usePagination'
import useModal from 'hooks/useModal'
import { AsociarServiciosForm } from '../AsociarServiciosForm'
import { useParams } from 'react-router-dom'
import useAlert from 'hooks/useAlert'

const ActionCell = ({ rowData, dataKey, ...props }) => {
  const dispatch = useDispatch()
  const params = useParams()
  const { id } = params

  const deleteAlert = useAlert({
    type: 'eliminar',
    text: 'Se eliminará el servicio, esta acción no se puede deshacer.',
    isConfirm: true,
    textConfirm: 'Eliminar Servicio'
  })

  const operationDelete = () => {
    deleteAlert.setConfirmAccion(() => {
      dispatch(deletePlazoPagoServicio({ id: rowData.id }))
    })
    deleteAlert.openAlert()
  }

  const modalServicio = useModal({
    title: 'Editar Servicios',
    renderBody: ({ closeModal }) => {
      return (
        <AsociarServiciosForm
          closeModal={closeModal} convenioId={id} plazoPagoId={rowData.plazo} servicioAsociado={{
            id: rowData.id,
            servicio: rowData.servicio,
            usuariosfinales: rowData.usuariosfinales,
            cantidad: rowData.cantidad
          }}
        />
      )
    }
  })

  const operationUpdate = () => {
    modalServicio.openModal()
  }

  return (
    <>
      {deleteAlert.alert}{modalServicio.modal}
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
          <IconButton
            className='mt--2 mb--2 pl-2 pr-2'
            size='sm'
            appearance='subtle'
            icon={<i className='fa fa-ellipsis-v' />}
          />
        </Whisper>
      </TableRS.Cell>
    </>
  )
}

const CantidadCell = ({ rowData, dataKey, ...props }) => {
  const count = rowData[dataKey]
  const text = count > 1 ? 'Clientes' : 'Cliente'

  const speaker = (
    <Popover title={text}>
      {rowData.usuarios_finales.map((item, key) => {
        return (
          <div key={key}>
            <p className='mb-1' style={{ fontSize: '0.95rem' }}>{key + 1} - {item.contacto}</p>
          </div>
        )
      })}
    </Popover>
  )

  return (
    <TableRS.Cell {...props}>
      <Whisper placement='top' speaker={speaker}>
        <a style={{ cursor: 'pointer' }}>{count} {text}</a>
      </Whisper>
    </TableRS.Cell>
  )
}

export default function AsociarServicios ({ id, isConfirmado }) {
  const dispatch = useDispatch()
  const plazoPagoServicio = useSelector(state => state.plazoPagoServicio.plazoPagoServicio)
  const isList = useSelector(state => state.plazoPagoServicio.isList)

  const { pagination, dataPage } = usePagination({ data: id ? plazoPagoServicio : [] })

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getPlazoPagoServicioAll({ plazoPagoId: id }))
    }
  }, [id])

  useEffect(() => {
    return () => {
      dispatch(stateResetOperation())
    }
  }, [])

  const renderEmpty = () => {
    if (id !== null) { return <div className='text-center text-muted mt-5 mb-5'>No hay elementos disponibles</div> } else { return <div className='text-center text-muted mt-5 mb-5'>Seleccione un plazo de pago</div> }
  }

  const renderCantidadCell = ({ header, dataKey, minWidth }) => {
    return (
      <TableRS.Column flexGrow={1} minWidth={minWidth}>
        <TableRS.HeaderCell style={Table.styleHeader}>
          {header}
        </TableRS.HeaderCell>
        <CantidadCell dataKey={dataKey} style={Table.styleCell} />
      </TableRS.Column>
    )
  }

  const renderTable = () => (
    <>
      <Table data={id ? dataPage : []} autoHeight renderEmpty={renderEmpty}>
        {Table.Column({ header: 'Servicio', dataKey: 'servicio_nombre', flex: 2.8, minWidth: 280 })}
        {renderCantidadCell({ header: 'Cantidad', dataKey: 'cantidad', minWidth: 100 })}
        {Table.ColumnNumberFormat({ header: 'Precio', dataKey: 'servicio_precio', flex: 1, minWidth: 100 })}
        {!isConfirmado && Table.ColumnAccion({ action: ActionCell })}
      </Table>
      {pagination}
    </>
  )

  return (
    <>
      {isList === OPERATIONS.FULFILLED
        ? renderTable()
        : <Loader.Grid rows={4} columns={5} />}
    </>
  )
}
