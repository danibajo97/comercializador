import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Row, Col } from 'reactstrap'
import { Popover, Whisper, Dropdown, IconButton, Table as TableRS, Pagination } from 'rsuite'
import MoreIcon from '@rsuite/icons/legacy/More'

import Table from 'components/table/Table'

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

export default function ClientesTable ({ clientes }) {
  const [limit, setLimit] = React.useState(10)
  const [page, setPage] = React.useState(1)

  const handleChangeLimit = dataKey => {
    setPage(1)
    setLimit(dataKey)
  }

  const dataPage = clientes.filter((v, i) => {
    const start = limit * (page - 1)
    const end = start + limit
    return i >= start && i < end
  })

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
      <Table data={dataPage} autoHeight>
        {Table.Column({ header: 'Nombre', dataKey: 'nombre', flex: 2 })}
        {Table.Column({ header: 'Abreviatura', dataKey: 'abreviatura', flex: 1 })}
        {Table.Column({ header: 'teléfono', dataKey: 'telefono', flex: 1 })}
        {Table.Column({ header: 'Correo', dataKey: 'correo', flex: 1 })}
        {Table.Column({ header: 'Dirección', dataKey: 'direccion', flex: 1 })}
        {renderColumnAccion('id')}
      </Table>
      <Row>
        <Col className='ml-3 mr-3 mt-1 mb-1'>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size='sm'
            layout={[`Total de Convenios: ${clientes.length}`, '-', 'pager']}
            total={clientes.length}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </Col>
      </Row>
    </>
  )
}
