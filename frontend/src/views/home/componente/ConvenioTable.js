import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Row, Col } from 'reactstrap'
import { Popover, Whisper, Dropdown, IconButton, Table, Pagination } from 'rsuite'
import MoreIcon from '@rsuite/icons/legacy/More'

import { styleHeader, styleCell } from 'constants/styles/table'
import { estadosConvenios } from 'constants/'
import { renderEmpty } from 'components'

const ActionCell = ({ rowData, dataKey, ...props }) => {
  const navigate = useNavigate()
  return (
    <Table.Cell {...props} className='link-group'>
      <Whisper
        placement='bottomEnd' trigger='click' speaker={({ onClose, left, top, className }, ref) => {
          const handleSelect = eventKey => {
            onClose()
            switch (eventKey) {
              case 1: navigate(`/datos-generales/${rowData[dataKey]}`); break
              case 2: navigate(`/clientes-finales/${rowData[dataKey]}`); break
              case 3: navigate(`/servicios-contratados/${rowData[dataKey]}`); break
              case 4: navigate(`/plazos-pagos/${rowData[dataKey]}`); break
              case 5: console.log(`/eliminar/${rowData[dataKey]}`); break
              case 6: console.log(`/cancelar/${rowData[dataKey]}`); break
              default: console.log('Error')
            }
          }
          return (
            <Popover ref={ref} className={className} style={{ left, top }} full>
              <Dropdown.Menu onSelect={handleSelect}>
                <Dropdown.Item eventKey={1} disabled={rowData.estado >= 3}>Datos Generales</Dropdown.Item>
                <Dropdown.Item eventKey={2} disabled={rowData.cantidad_bd <= 1}>Gestión de Clientes Finales</Dropdown.Item>
                <Dropdown.Item eventKey={3}>Servicios Contratados</Dropdown.Item>
                <Dropdown.Item eventKey={4} hidden>Asociando Plazos de Pagos</Dropdown.Item>
                <Dropdown.Item divider />
                <Dropdown.Item eventKey={5} hidden={rowData.estado >= 3}>Eliminar</Dropdown.Item>
                <Dropdown.Item eventKey={6} hidden={rowData.estado <= 2}>Cancelar</Dropdown.Item>
              </Dropdown.Menu>
            </Popover>
          )
        }}
      >
        <IconButton appearance='subtle' icon={<MoreIcon />} />
      </Whisper>
    </Table.Cell>
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

  const renderColumn = (header, dataKey, flex) => {
    return (
      <Table.Column flexGrow={flex}>
        <Table.HeaderCell style={styleHeader}>
          {header}
        </Table.HeaderCell>
        <Table.Cell dataKey={dataKey} style={styleCell} />
      </Table.Column>
    )
  }

  const renderColumnEstado = (header, dataKey, flex) => {
    return (
      <Table.Column flexGrow={flex}>
        <Table.HeaderCell style={styleHeader}>
          {header}
        </Table.HeaderCell>
        <Table.Cell style={styleCell}>
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
        </Table.Cell>
      </Table.Column>
    )
  }

  const renderColumnAccion = (dataKey) => {
    return (
      <Table.Column width={100}>
        <Table.HeaderCell style={styleHeader}>
          Acciones
        </Table.HeaderCell>
        <ActionCell dataKey={dataKey} style={styleCell} />
      </Table.Column>
    )
  }

  return (
    <>
      <Table data={dataPage} height={450} autoHeight renderEmpty={renderEmpty}>
        {renderColumn('Comercializador', 'contacto_facturese_a', 2)}
        {renderColumn('Nro Contrato', 'contrato_no', 1)}
        {renderColumn('Cliente', 'contacto_cliente_final', 2)}
        {renderColumn('Nro Convenio', 'no_convenio', 1)}
        {renderColumn('Fecha Emisión', 'fecha_emision', 1)}
        {renderColumnEstado('Estado', 'estado', 1)}
        {renderColumn('Cantidad', 'cantidad_bd', 1)}
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
