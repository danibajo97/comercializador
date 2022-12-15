import { Component } from 'react'
import {
  Table as TableRS,
  Badge
} from 'rsuite'

import estadosConvenios from 'constants/estadosConvenios'

function RenderColumn ({ header, dataKey, flex, minWidth = 100, white, sortable = false }) {
  const style = !white ? styleHeader : styleHeaderWhite
  return (
    <TableRS.Column flexGrow={flex} minWidth={minWidth} sortable={sortable}>
      <TableRS.HeaderCell style={style}>{header}</TableRS.HeaderCell>
      <TableRS.Cell dataKey={dataKey} style={styleCell} />
    </TableRS.Column>
  )
}

const RenderColumnNumberFormat = ({ header, dataKey, flex, minWidth = 100, white, sortable = false }) => {
  const style = !white ? styleHeader : styleHeaderWhite
  return (
    <TableRS.Column flexGrow={flex} minWidth={minWidth} align='right' sortable={sortable}>
      <TableRS.HeaderCell style={style}>{header}</TableRS.HeaderCell>
      <TableRS.Cell style={styleCell}>
        {rowData => <>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData[dataKey])}</>}
      </TableRS.Cell>
    </TableRS.Column>
  )
}

const RenderColumnNumber = ({ header, dataKey, flex, minWidth = 100, white, sortable = false }) => {
  const style = !white ? styleHeader : styleHeaderWhite
  return (
    <TableRS.Column flexGrow={flex} minWidth={minWidth} align='right' sortable={sortable}>
      <TableRS.HeaderCell style={style}>{header}</TableRS.HeaderCell>
      <TableRS.Cell style={styleCell}>
        {rowData => <>{rowData[dataKey]}</>}
      </TableRS.Cell>
    </TableRS.Column>
  )
}

const RenderColumnBoolean = ({ header, dataKey, flex, minWidth = 100, white = false, opcions, sortable = false }) => {
  const optionYes = opcions?.yes || 'Si'
  const optionNo = opcions?.no || 'No'
  const style = !white ? styleHeader : styleHeaderWhite
  return (
    <TableRS.Column flexGrow={flex} minWidth={minWidth} sortable={sortable}>
      <TableRS.HeaderCell style={style}>{header}</TableRS.HeaderCell>
      <TableRS.Cell style={styleCell} dataKey={dataKey}>
        {rowData => <><Badge color={rowData[dataKey] ? 'green' : 'red'} className='mr-2' />{rowData[dataKey] ? optionYes : optionNo}</>}
      </TableRS.Cell>
    </TableRS.Column>
  )
}

const RenderColumnEstado = ({ header, dataKey, flex, minWidth = 100, white = false, sortable = false }) => {
  const style = !white ? styleHeader : styleHeaderWhite
  return (
    <TableRS.Column flexGrow={flex} minWidth={minWidth} sortable={sortable}>
      <TableRS.HeaderCell style={style}>{header}</TableRS.HeaderCell>
      <TableRS.Cell style={styleCell} dataKey={dataKey}>
        {rowData => <><Badge className={`bg-${estadosConvenios[rowData[dataKey] - 1].color} mr-2`} />{estadosConvenios[rowData[dataKey] - 1].text}</>}
      </TableRS.Cell>
    </TableRS.Column>
  )
}

const RenderColumnAccion = ({ dataKey = 'id', action: ActionCell }) => {
  return (
    <TableRS.Column width={45} fixed='right'>
      <TableRS.HeaderCell style={Table.styleHeader} />
      <ActionCell dataKey={dataKey} style={Table.styleCell} />
    </TableRS.Column>
  )
}

const styleHeader = {
  backgroundColor: '#F6F9FC',
  borderColor: '#e9ecef',
  textTransform: 'uppercase',
  fontSize: '0.75rem',
  letterSpacing: '1px',
  borderBottom: '1px solid #e9ecef'
}

const styleHeaderWhite = {
  backgroundColor: '#FFFFFF',
  borderColor: '#e9ecef',
  textTransform: 'uppercase',
  fontSize: '0.75rem',
  letterSpacing: '1px',
  borderBottom: '1px solid #e9ecef'
}

const styleCell = {
  fontSize: '0.85rem'
}

export function renderEmpty () {
  return <div className='text-center text-muted mt-5 mb-5'>No hay elementos disponibles</div>
}

export default class Table extends Component {
  static Column = RenderColumn
  static ColumnBoolean = RenderColumnBoolean
  static ColumnNumber = RenderColumnNumber
  static ColumnNumberFormat = RenderColumnNumberFormat
  static ColumnEstado = RenderColumnEstado
  static ColumnAccion = RenderColumnAccion

  static styleHeader = styleHeader
  static styleHeaderWhite = styleHeaderWhite
  static styleCell = styleCell

  render () {
    return (
      <TableRS renderEmpty={renderEmpty} {...this.props} cellBordered>
        {this.props.children}
      </TableRS>
    )
  }
}
