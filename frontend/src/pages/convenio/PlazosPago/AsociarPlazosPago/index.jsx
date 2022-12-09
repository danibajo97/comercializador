import {
  Popover,
  Whisper,
  Dropdown,
  IconButton,
  Table as TableRS,
  Radio
} from 'rsuite'

import Table from 'components/table/Table'
import { Loader } from 'components'
import useAsociarPlazosPago from './useAsociarPlazosPago'
import useActionCell from './useActionCell'

const ActionCell = ({ rowData, dataKey, ...props }) => {
  const {
    deleteAlert,
    modalPlazoPago,
    handleSelect
  } = useActionCell()

  return (
    <>
      {deleteAlert.alert} {modalPlazoPago.modal}
      <TableRS.Cell {...props} className='link-group'>
        <Whisper
          placement='bottomEnd' trigger='click' speaker={({ onClose, left, top, className }, ref) => {
            return (
              <>
                <Popover ref={ref} className={className} style={{ left, top }} full>
                  <Dropdown.Menu onSelect={eventKey => handleSelect(eventKey, rowData, onClose)}>
                    <Dropdown.Item eventKey={1}>Editar</Dropdown.Item>
                    <Dropdown.Item eventKey={2}>Eliminar</Dropdown.Item>
                  </Dropdown.Menu>
                </Popover>
              </>
            )
          }}
        >
          <IconButton className='mt--2 mb--2 pl-2 pr-2' size='sm' appearance='subtle' icon={<i className='fa fa-ellipsis-v' />} />
        </Whisper>
      </TableRS.Cell>
    </>

  )
}

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <TableRS.Cell {...props} style={{ padding: 0 }}>
    <div style={{ lineHeight: '46px' }}>
      <Radio
        value={rowData[dataKey]}
        inline
        onChange={onChange}
        checked={checkedKeys === rowData[dataKey]}
      />
    </div>
  </TableRS.Cell>
)

export default function AsociarPlazosPago ({ setSelectedId, isConfirmado }) {
  const {
    dataPage,
    pagination,
    checkedKeys,
    handleCheck,
    isLoading
  } = useAsociarPlazosPago({ setSelectedId })

  const renderCheckCell = () => {
    return (
      <TableRS.Column width={50}>
        <TableRS.HeaderCell style={Table.styleHeader} />
        <CheckCell dataKey='id' checkedKeys={checkedKeys} onChange={handleCheck} />
      </TableRS.Column>
    )
  }

  const renderTable = () => (
    <div>
      <Table data={dataPage} autoHeight onRowClick={({ id }) => handleCheck(id)}>
        {renderCheckCell('id')}
        {Table.Column({ header: 'Fecha', dataKey: 'fecha', flex: 0.8 })}
        {Table.ColumnNumber({ header: 'Dias', dataKey: 'dias', flex: 0.5 })}
        {Table.ColumnBoolean({ header: 'Facturado', dataKey: 'facturado', flex: 0.8 })}
        {Table.ColumnBoolean({ header: 'Cobrado', dataKey: 'cobrado', flex: 0.8 })}
        {!isConfirmado && Table.ColumnAccion({ action: ActionCell })}
      </Table>
      {pagination}
    </div>
  )

  return (
    <>
      {isLoading()
        ? renderTable()
        : <Loader.Grid rows={4} columns={5} />}
    </>
  )
}
