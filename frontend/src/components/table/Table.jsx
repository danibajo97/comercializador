import React, { Component } from 'react'
import {
  Table as TableRS,
  Badge
} from 'rsuite'

const RenderColumn = ({ header, dataKey, flex, white }) => {
  const style = !white ? styleHeader : styleHeaderWhite
  return (
    <TableRS.Column flexGrow={flex}>
      <TableRS.HeaderCell style={style}>
        {header}
      </TableRS.HeaderCell>
      <TableRS.Cell dataKey={dataKey} style={styleCell} />
    </TableRS.Column>
  )
}

const RenderColumnNumberFormat = ({ header, dataKey, flex, white }) => {
  const style = !white ? styleHeader : styleHeaderWhite
  return (
    <TableRS.Column flexGrow={flex} align='right'>
      <TableRS.HeaderCell style={style}>
        {header}
      </TableRS.HeaderCell>
      <TableRS.Cell style={styleCell}>
        {rowData => <>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData[dataKey])}</>}
      </TableRS.Cell>
    </TableRS.Column>
  )
}

const RenderColumnNumber = ({ header, dataKey, flex, white }) => {
  const style = !white ? styleHeader : styleHeaderWhite
  return (
    <TableRS.Column flexGrow={flex} align='right'>
      <TableRS.HeaderCell style={style}>
        {header}
      </TableRS.HeaderCell>
      <TableRS.Cell style={styleCell}>
        {rowData => <>{rowData[dataKey]}</>}
      </TableRS.Cell>
    </TableRS.Column>
  )
}

const RenderColumnBoolean = ({ header, dataKey, flex, white = false }) => {
  const style = !white ? styleHeader : styleHeaderWhite
  return (
    <TableRS.Column flexGrow={flex}>
      <TableRS.HeaderCell style={style}>
        {header}
      </TableRS.HeaderCell>
      <TableRS.Cell style={styleCell}>
        {rowData => <><Badge color={rowData[dataKey] ? 'green' : 'red'} className='mr-2' />{rowData[dataKey] ? 'Si' : 'No'}</>}
      </TableRS.Cell>
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
  fontSize: '0.75rem'
}

export function renderEmpty () {
  return <div className='text-center text-muted mt-5 mb-5'>No hay elementos disponibles</div>
}

export default class Table extends Component {
  static Column = RenderColumn
  static ColumnBoolean = RenderColumnBoolean
  static ColumnNumber = RenderColumnNumber
  static ColumnNumberFormat = RenderColumnNumberFormat

  static styleHeader = styleHeader
  static styleHeaderWhite = styleHeaderWhite
  static styleCell = styleCell

  render () {
    return (
      <TableRS data={this.props.data} height={this.props.height} autoHeight={this.props.autoHeight} renderEmpty={renderEmpty} {...this.props} cellBordered>
        {this.props.children}
      </TableRS>
    )
  }
}
