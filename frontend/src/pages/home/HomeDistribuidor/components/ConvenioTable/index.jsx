import { useNavigate } from 'react-router-dom'
import { Popover, Whisper, Dropdown, IconButton, Table as TableRS } from 'rsuite'

import Table from 'components/table/Table'
import { renderEmpty } from 'components'
import useConvenioTable from './useConvenioTable'

const ActionCell = ({ rowData, dataKey, ...props }) => {
  const navigate = useNavigate()
  const { handleSelect, deleteAlert, validAlert, confirmAlert } = useConvenioTable()

  return (
    <>
      {deleteAlert} {validAlert} {confirmAlert}
      <TableRS.Cell {...props} className='link-group'>
        <Whisper
          placement='bottomEnd' trigger='click' speaker={({ onClose, left, top, className }, ref) => {
            return (
              <Popover ref={ref} className={className} style={{ left, top }} full>
                <Dropdown.Menu onSelect={eventKey => handleSelect(eventKey, rowData, onClose, navigate)}>
                  <Dropdown.Item eventKey={1}>Datos Generales</Dropdown.Item>
                  <Dropdown.Item eventKey={2} disabled={rowData.cantidad_bd <= 1}>Clientes Finales</Dropdown.Item>
                  <Dropdown.Item eventKey={3}>Servicios Contratados</Dropdown.Item>
                  <Dropdown.Item eventKey={4}>Plazos de Pagos</Dropdown.Item>
                  <Dropdown.Item divider hidden={rowData.estado >= 3} />
                  <Dropdown.Item eventKey={6} hidden={rowData.estado !== 1}>Validar</Dropdown.Item>
                  <Dropdown.Item eventKey={7} hidden={rowData.estado !== 2}>Terminar</Dropdown.Item>
                  <Dropdown.Item divider hidden={rowData.estado >= 3} />
                  <Dropdown.Item eventKey={5} hidden={rowData.estado >= 3}>Eliminar</Dropdown.Item>
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

export default function ConvenioTable ({ convenios, pagination, onSortColumn, sortInfo }) {
  return (
    <>
      <Table
        sortColumn={sortInfo.sortColumn}
        sortType={sortInfo.sortType}
        onSortColumn={onSortColumn}
        data={convenios}
        height={250}
        autoHeight
        renderEmpty={renderEmpty}
      >
        {Table.Column({ header: 'Nro Contrato', dataKey: 'contrato_no', flex: 1, sortable: true })}
        {Table.Column({ header: 'Nro Convenio', dataKey: 'no_convenio', flex: 1, sortable: true })}
        {Table.Column({ header: 'Cliente', dataKey: 'contacto_cliente_final', flex: 2.5, minWidth: 350, sortable: true })}
        {Table.Column({ header: 'Fecha Emisión', dataKey: 'fecha_emision', flex: 1, sortable: true })}
        {Table.ColumnEstado({ header: 'Estado', dataKey: 'estado', flex: 1, minWidth: 120, sortable: true })}
        {Table.Column({ header: 'Base de Datos', dataKey: 'cantidad_bd', flex: 1, sortable: true })}
        {Table.ColumnAccion({ action: ActionCell })}
      </Table>
      {pagination}
    </>
  )
}
