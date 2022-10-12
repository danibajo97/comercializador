import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Badge, Row, Col } from 'reactstrap'
import { Popover, Whisper, Dropdown, IconButton, Table as TableRS, Pagination } from 'rsuite'
import MoreIcon from '@rsuite/icons/legacy/More'

import Table from 'components/table/Table'
import { estadosConvenios } from 'constants/'
import { renderEmpty } from 'components'
import { deleteConvenio } from 'redux/convenio/convenioSlice'

const ActionCell = ({ rowData, dataKey, ...props }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const operationDelete = async ({ id }) => {
    dispatch(deleteConvenio({ id }))
  }

  return (
    <TableRS.Cell {...props} className='link-group'>
      <Whisper
        placement='bottomEnd' trigger='click' speaker={({ onClose, left, top, className }, ref) => {
          const handleSelect = eventKey => {
            onClose()
            switch (eventKey) {
              case 1:
                navigate(`/datos-generales/${rowData.id}`)
                break
              case 2:
                navigate(`/clientes-finales/${rowData.id}`)
                break
              case 3:
                navigate(`/servicios-contratados/${rowData.id}`)
                break
              case 4:
                navigate(`/plazos-pago/${rowData.id}`)
                break
              case 5:
                operationDelete({ id: rowData.id })
                break
              case 6:
                console.log(`/cancelar/${rowData.id}`)
                break
              default:
                console.log('Error')
            }
          }
          return (
            <Popover ref={ref} className={className} style={{ left, top }} full>
              <Dropdown.Menu onSelect={handleSelect}>
                <Dropdown.Item eventKey={1} disabled={rowData.estado >= 3}>Datos Generales</Dropdown.Item>
                <Dropdown.Item eventKey={2} disabled={rowData.cantidad_bd <= 1}>Gestión de Clientes Finales</Dropdown.Item>
                <Dropdown.Item eventKey={3}>Servicios Contratados</Dropdown.Item>
                <Dropdown.Item eventKey={4}>Asociando Plazos de Pagos</Dropdown.Item>
                <Dropdown.Item divider />
                <Dropdown.Item eventKey={5} hidden={rowData.estado >= 3}>Eliminar</Dropdown.Item>
                <Dropdown.Item eventKey={6} hidden={rowData.estado <= 2}>Cancelar</Dropdown.Item>
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

export default function ConvenioTable ({ convenios }) {
  const [limit, setLimit] = React.useState(10)
  const [page, setPage] = React.useState(1)

  const handleChangeLimit = dataKey => {
    setPage(1)
    setLimit(dataKey)
  }

  const dataPage = convenios.filter((v, i) => {
    const start = limit * (page - 1)
    const end = start + limit
    return i >= start && i < end
  })

  const renderColumnEstado = (header, dataKey, flex) => {
    return (
      <TableRS.Column flexGrow={flex}>
        <TableRS.HeaderCell style={Table.styleHeader}>
          {header}
        </TableRS.HeaderCell>
        <TableRS.Cell style={Table.styleCell}>
          {rowData => {
            return (
              <div className='mt--1'>
                <Badge className='badge-dot text-dark'>
                  <i className={`bg-${estadosConvenios[rowData[dataKey] - 1].color}`} />
                </Badge>
                {estadosConvenios[rowData[dataKey] - 1].text}
              </div>
            )
          }}
        </TableRS.Cell>
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
      <Table data={dataPage} height={450} autoHeight renderEmpty={renderEmpty}>
        {Table.Column({ header: 'Nro Contrato', dataKey: 'contrato_no', flex: 1 })}
        {Table.Column({ header: 'Cliente', dataKey: 'contacto_cliente_final', flex: 2.5 })}
        {Table.Column({ header: 'Nro Convenio', dataKey: 'no_convenio', flex: 1 })}
        {Table.Column({ header: 'Fecha Emisión', dataKey: 'fecha_emision', flex: 1 })}
        {renderColumnEstado('Estado', 'estado', 1)}
        {Table.Column({ header: 'Base de Datos', dataKey: 'cantidad_bd', flex: 1 })}
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
            layout={[`Total de Convenios: ${convenios.length}`, '-', 'pager']}
            total={convenios.length}
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
