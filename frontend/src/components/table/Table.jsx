import React from 'react'
import PropTypes from 'prop-types'

import { Pagination, Table as TableRS } from 'rsuite'

function Table ({ data, headers, dataKeys, pagination, white }) {
  const [limit, setLimit] = React.useState(10)
  const [page, setPage] = React.useState(1)

  const handleChangeLimit = dataKey => {
    setPage(1)
    setLimit(dataKey)
  }

  const dataPage = data.filter((v, i) => {
    const start = limit * (page - 1)
    const end = start + limit
    return i >= start && i < end
  })

  const styleHeader = {
    backgroundColor: !white ? '#F6F9FC' : '#FFFFFF',
    borderColor: '#e9ecef',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    letterSpacing: '1px',
    borderBottom: '1px solid #e9ecef'
  }

  const styleCell = {
    fontSize: '0.85rem'
  }

  return (
    <>
      <TableRS data={dataPage} autoHeight>
        {headers.map((headers, index) => {
          return (
            <TableRS.Column flexGrow={1} key={index}>
              <TableRS.HeaderCell style={styleHeader}>
                {headers}
              </TableRS.HeaderCell>
              <TableRS.Cell dataKey={dataKeys[index]} style={styleCell} />
            </TableRS.Column>
          )
        })}
      </TableRS>
      {pagination &&
        <div style={{ padding: 8 }}>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size='md'
            layout={['total', '-', 'pager']}
            total={data.length}
            limitOptions={[10, 20, 30, 40, 50]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </div>}
    </>
  )
}

Table.propTypes = {
  data: PropTypes.array.isRequired
}

Table.defaultProps = {
  data: [],
  headers: [],
  dataKeys: [],
  pagination: false,
  white: false
}

export default Table
