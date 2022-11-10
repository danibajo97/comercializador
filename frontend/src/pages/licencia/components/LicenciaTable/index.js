import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Row, Col } from 'reactstrap'
import { Popover, Whisper, Dropdown, IconButton, Table as TableRS, Pagination } from 'rsuite'
import MoreIcon from '@rsuite/icons/legacy/More'

import Table from 'components/table/Table'
import usePagination from 'hooks/usePagination'

const ActionCell = ({ rowData, dataKey, ...props }) => {
  return (
    <TableRS.Cell {...props} className='link-group'>
      <Whisper
        placement='bottomEnd' trigger='click' speaker={({ onClose, left, top, className }, ref) => {
          const handleSelect = eventKey => {
            onClose()
            switch (eventKey) {
              case 1: console.log(`/eliminar/${rowData.id}`); break
              case 2: console.log(`/cancelar/${rowData.id}`); break
              default: console.log('Error')
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
  )
}

export default function LicenciaTable ({ clientes }) {
  const { pagination, dataPage } = usePagination({ data: clientes, title: 'Clientes' })

  return (
    <>
      <Table data={dataPage} autoHeight>
        {Table.Column({ header: 'Nro', dataKey: 'no_solicitud', flex: 0.5 })}
        {Table.Column({ header: 'Fecha', dataKey: 'fecha', flex: 0.8 })}
        {Table.Column({ header: 'Persona que solicita', dataKey: 'solicitado_por_nombre', flex: 1 })}
        {Table.Column({ header: 'Cliente final', dataKey: 'cliente_final_nombre', flex: 1 })}
        {Table.Column({ header: 'Servicio', dataKey: 'servicio_nombre', flex: 1 })}
        {Table.Column({ header: 'Clave Registro', dataKey: 'semilla', flex: 1 })}
        {Table.Column({ header: 'Licencia', dataKey: 'licencia', flex: 1 })}
        {Table.Column({ header: 'Observaciones', dataKey: 'observacion', flex: 1 })}
        {Table.ColumnAccion({ header: 'Acciones', dataKey: 'id', action: ActionCell })}
      </Table>
      {pagination}
    </>
  )
}
