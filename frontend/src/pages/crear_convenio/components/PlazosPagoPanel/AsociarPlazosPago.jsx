import React, { useEffect } from 'react'
import {
  Popover,
  Whisper,
  Dropdown,
  IconButton,
  Table as TableRS,
  Checkbox,
  Placeholder
} from 'rsuite'
import { useDispatch, useSelector } from 'react-redux'
import MoreIcon from '@rsuite/icons/legacy/More'
import { useParams } from 'react-router-dom'

import OPERATIONS from 'constants/operationsRedux'
import { getPlazoPagoAll, stateResetOperation } from 'redux/plazoPago/plazoPagoSlice'
import Table from 'components/table/Table'

const ActionCell = ({ rowData, dataKey, ...props }) => {
  return (
    <TableRS.Cell {...props} className='link-group'>
      <Whisper
        placement='bottomEnd' trigger='click' speaker={({ onClose, left, top, className }, ref) => {
          const handleSelect = eventKey => {
            onClose()
            switch (eventKey) {
              case 1: console.log(`/asociar-plazo-pagos/${rowData.id}/editar`); break
              case 2: console.log(`/asociar-plazo-pagos/${rowData.id}/eliminar`); break
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

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <TableRS.Cell {...props} style={{ padding: 0 }}>
    <div style={{ lineHeight: '46px' }}>
      <Checkbox
        value={rowData[dataKey]}
        inline
        onChange={onChange}
        checked={checkedKeys === rowData[dataKey]}
      />
    </div>
  </TableRS.Cell>
)

export default function AsociarPlazosPago ({ setSelectedId }) {
  const dispatch = useDispatch()
  const isList = useSelector(state => state.plazoPago.isList)
  const plazosPagos = useSelector(state => state.plazoPago.plazosPagos)
  const [checkedKeys, setCheckedKeys] = React.useState(null)

  const params = useParams()
  const { id } = params

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getPlazoPagoAll({ convenio: id }))
    }
    return () => {
      dispatch(stateResetOperation())
    }
  }, [])

  React.useEffect(() => {
    setSelectedId(checkedKeys)
  }, [checkedKeys])

  const handleCheck = (value, checked) => {
    const keys = checked ? value : null
    setCheckedKeys(keys)
  }

  const renderColumnAccion = dataKey => {
    return (
      <TableRS.Column width={100}>
        <TableRS.HeaderCell style={Table.styleHeader}>
          Acciones
        </TableRS.HeaderCell>
        <ActionCell dataKey={dataKey} style={Table.styleCell} />
      </TableRS.Column>
    )
  }

  const renderCheckCell = () => {
    return (
      <TableRS.Column width={50}>
        <TableRS.HeaderCell style={Table.styleHeader} />
        <CheckCell dataKey='id' checkedKeys={checkedKeys} onChange={handleCheck} />
      </TableRS.Column>
    )
  }

  const onRowClick = rowData => {
    handleCheck(rowData.id, checkedKeys !== rowData.id)
  }

  const renderTable = () => (
    <Table data={plazosPagos} autoHeight onRowClick={onRowClick}>
      {renderCheckCell('id')}
      {Table.Column({ header: 'Fecha', dataKey: 'fecha', flex: 1 })}
      {Table.ColumnNumberFormat({ header: 'Importe', dataKey: 'importe', flex: 1 })}
      {Table.ColumnBoolean({ header: 'Facturado', dataKey: 'facturado', flex: 1 })}
      {Table.ColumnBoolean({ header: 'Cobrado', dataKey: 'cobrado', flex: 1 })}
      {renderColumnAccion('id')}
    </Table>
  )

  return (
    <>
      {isList === OPERATIONS.FULFILLED
        ? renderTable()
        : <Placeholder.Grid rows={3} columns={4} />}
    </>
  )
}
