import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Badge } from 'reactstrap'
import { Popover, Whisper, Dropdown, IconButton, Table as TableRS } from 'rsuite'
import MoreIcon from '@rsuite/icons/legacy/More'

import Table from 'components/table/Table'
import { estadosConvenios } from 'constants/'
import { renderEmpty } from 'components'
import { deleteConvenio } from 'redux/convenio/convenioSlice'
import usePagination from 'hooks/usePagination'

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
              default:
                console.log('Error')
            }
          }
          return (
            <Popover ref={ref} className={className} style={{ left, top }} full>
              <Dropdown.Menu onSelect={handleSelect}>
                <Dropdown.Item eventKey={1}>Datos Generales</Dropdown.Item>
                <Dropdown.Item eventKey={2} disabled={rowData.cantidad_bd <= 1}>Gestión de Clientes Finales</Dropdown.Item>
                <Dropdown.Item eventKey={3}>Servicios Contratados</Dropdown.Item>
                <Dropdown.Item eventKey={4}>Asociando Plazos de Pagos</Dropdown.Item>
                <Dropdown.Item divider hidden={rowData.estado >= 3} />
                <Dropdown.Item eventKey={5} hidden={rowData.estado >= 3}>Eliminar</Dropdown.Item>
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
  const { pagination, dataPage } = usePagination({ data: convenios, title: 'Convenios' })

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
      {pagination}
    </>
  )
}
