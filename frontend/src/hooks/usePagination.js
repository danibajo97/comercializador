import { useState } from 'react'
import { Col, Row } from 'reactstrap'
import { Pagination } from 'rsuite'

const PAGINATION_LIMIT = parseInt(process.env.REACT_APP_PAGINATION_LIMIT)

export default function usePagination ({ data }) {
  const [page, setPage] = useState(1)

  const dataPage = data.filter((v, i) => {
    const start = PAGINATION_LIMIT * (page - 1)
    const end = start + PAGINATION_LIMIT
    return i >= start && i < end
  })

  const start = () => ((page - 1) * PAGINATION_LIMIT) + 1
  const end = () => {
    const sum = start() + PAGINATION_LIMIT - 1
    return sum >= data.length ? data.length : sum
  }
  const layout = data.length === 0 ? '' : `Mostrando: ${start()} - ${end()} de ${data.length}`

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
          limit={PAGINATION_LIMIT}
          activePage={page}
          onChangePage={setPage}
        />
      </Col>
    </Row>
  )

  return { pagination, dataPage }
}
