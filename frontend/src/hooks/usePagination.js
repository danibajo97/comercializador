import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import { Pagination } from 'rsuite'

export default function usePagination ({ data, title }) {
  const [limit, setLimit] = useState(8)
  const [page, setPage] = useState(1)

  const handleChangeLimit = dataKey => {
    setPage(1)
    setLimit(dataKey)
  }

  const dataPage = data.filter((v, i) => {
    const start = limit * (page - 1)
    const end = start + limit
    return i >= start && i < end
  })

  const layout = data.length === 0 ? '' : `Total de ${title}: ${data.length}`

  const pagination = (
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
          layout={[layout, '-', 'pager']}
          total={data.length}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </Col>
    </Row>
  )

  return { pagination, dataPage }
}
