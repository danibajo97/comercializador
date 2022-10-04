import React from 'react'
// import { useNavigate } from 'react-router-dom'
import {
  Panel,
  Stack,
  Button,
  Popover,
  Whisper,
  Dropdown,
  IconButton,
  Table as TableRS,
  Checkbox
} from 'rsuite'
import MoreIcon from '@rsuite/icons/legacy/More'

import Table from 'components/table/Table'
import { mockPlazosPago } from 'constants/mock'
import useModal from 'hooks/useModal'
import { PlazosPagoForm } from './PlazosPagoForm'

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
  // const navigate = useNavigate()
  const [checkedKeys, setCheckedKeys] = React.useState(null)

  const { modal, openModal } = useModal({
    title: 'Nuevo Plazos de Pagos',
    renderBody: ({ closeModal }) => {
      return <PlazosPagoForm closeModal={closeModal} />
    }
  })

  React.useEffect(() => {
    setSelectedId(checkedKeys)
  }, [checkedKeys])

  const handleCheck = (value, checked) => {
    const keys = checked ? value : null
    setCheckedKeys(keys)
  }

  const RenderColumnAccion = (dataKey) => {
    return (
      <TableRS.Column width={100}>
        <TableRS.HeaderCell style={Table.styleHeaderWhite}>
          Acciones
        </TableRS.HeaderCell>
        <ActionCell dataKey={dataKey} style={Table.styleCell} />
      </TableRS.Column>
    )
  }

  const RenderCheckCell = (dataKey) => {
    return (
      <TableRS.Column width={50}>
        <TableRS.HeaderCell style={Table.styleHeaderWhite} />
        <CheckCell dataKey='id' checkedKeys={checkedKeys} onChange={handleCheck} />
      </TableRS.Column>
    )
  }

  const onRowClick = (rowData) => {
    handleCheck(rowData.id, checkedKeys !== rowData.id)
  }

  return (
    <Panel
      bordered header={
        <Stack justifyContent='space-between'>
          <span>Plazos de Pagos</span>
          <Button appearance='primary' size='sm' color='blue' onClick={openModal}>Adicionar</Button>
        </Stack>
      }
    >
      {modal}
      <Table data={mockPlazosPago} autoHeight onRowClick={onRowClick}>
        {RenderCheckCell('id')}
        {Table.Column({ header: 'Fecha', dataKey: 'fecha', flex: 1, white: true })}
        {Table.ColumnNumberFormat({ header: 'Importe', dataKey: 'importe', flex: 1, white: true })}
        {Table.ColumnBoolean({ header: 'Facturado', dataKey: 'facturado', flex: 1, white: true })}
        {Table.ColumnBoolean({ header: 'Cobrado', dataKey: 'cobrado', flex: 1, white: true })}
        {RenderColumnAccion('id')}
      </Table>
    </Panel>
  )
}
