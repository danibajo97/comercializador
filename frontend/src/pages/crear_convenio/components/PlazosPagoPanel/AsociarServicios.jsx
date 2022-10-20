import React from 'react'
import {
  Panel,
  Stack,
  Button,
  Popover,
  Table as TableRS,
  Whisper,
  Dropdown,
  IconButton
} from 'rsuite'
import Table from 'components/table/Table'
import MoreIcon from '@rsuite/icons/legacy/More'

import { mockServiciosPlazosPago } from 'constants/mock'
import useModal from 'hooks/useModal'
import { AsociarServiciosForm } from './AsociarServiciosForm'

const CantidadCell = ({ rowData, dataKey, ...props }) => {
  const speaker = (
    <Popover title='Cientes'>
      {rowData.clientes.map((item, key) => {
        return (
          <div key={key}>
            <div className=''>{key + 1} - {item}</div>
          </div>
        )
      })}
    </Popover>
  )

  return (
    <TableRS.Cell {...props}>
      <Whisper placement='top' speaker={speaker}>
        <a style={{ cursor: 'pointer' }}>{rowData[dataKey]}</a>
      </Whisper>
    </TableRS.Cell>
  )
}

const ActionCell = ({ rowData, dataKey, ...props }) => {
  return (
    <TableRS.Cell {...props} className='link-group'>
      <Whisper
        placement='bottomEnd' trigger='click' speaker={({ onClose, left, top, className }, ref) => {
          const handleSelect = eventKey => {
            onClose()
            switch (eventKey) {
              case 1: console.log(`/asociar-servicio-plazo-pagos/${rowData.id}/editar`); break
              case 2: console.log(`/asociar-servicio-plazo-pagos/${rowData.id}/eliminar`); break
              default: console.log('Error')
            }
          }
          return (
            <Popover ref={ref} className={className} style={{ left, top }} full>
              <Dropdown.Menu onSelect={handleSelect}>
                <Dropdown.Item eventKey={1} disabled={rowData.estado >= 3}>Editar</Dropdown.Item>
                <Dropdown.Item eventKey={2} disabled={rowData.cantidad_bd <= 1}>Eliminar</Dropdown.Item>
              </Dropdown.Menu>
            </Popover>
          )
        }}
      >
        <IconButton className='mt--2 mb--2' size='sm' appearance='subtle' icon={<MoreIcon />} />
      </Whisper>
    </TableRS.Cell>
  )
}

export default function AsociarServicios ({ id }) {
  const renderEmpty = () => {
    if (id !== null) { return <div className='text-center text-muted mt-5 mb-5'>No hay elementos disponibles</div> } else { return <div className='text-center text-muted mt-5 mb-5'>Seleccione un plazo de pago</div> }
  }

  const renderCantidadCell = ({ header, dataKey }) => {
    return (
      <TableRS.Column flexGrow={1}>
        <TableRS.HeaderCell style={Table.styleHeader}>
          {header}
        </TableRS.HeaderCell>
        <CantidadCell dataKey={dataKey} style={Table.styleCell} />
      </TableRS.Column>
    )
  }

  const renderColumnAccion = (dataKey) => {
    return (
      <TableRS.Column width={100}>
        <TableRS.HeaderCell style={Table.styleHeader}>
          Acciones
        </TableRS.HeaderCell>
        <ActionCell dataKey={dataKey} style={Table.styleCell} />
      </TableRS.Column>
    )
  }

  return (
    <>
      <Table data={id ? mockServiciosPlazosPago : []} autoHeight renderEmpty={renderEmpty}>
        {Table.Column({ header: 'Servicio', dataKey: 'servicio', flex: 1 })}
        {/* {Table.Column({ header: 'Cantidad', dataKey: 'cantidad', flex: 1})} */}
        {renderCantidadCell({ header: 'Cantidad', dataKey: 'cantidad' })}
        {Table.ColumnNumberFormat({ header: 'Precio', dataKey: 'precio', flex: 1 })}
        {Table.ColumnNumberFormat({ header: 'A Facturar', dataKey: 'aFacturar', flex: 1 })}
        {renderColumnAccion('id')}
      </Table>
    </>
  )
}
