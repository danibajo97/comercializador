import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row
} from 'reactstrap'

import { users, loading, error, getAll } from '../../redux/users/usersSlice'

import { Header } from '../../components'

export default function Persona () {
  const usersState = useSelector(users)
  const loadingState = useSelector(loading)
  const errorState = useSelector(error)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAll())
  }, [])

  if (loadingState) return <div>Cargando...</div>
  if (errorState != null) return <div>{errorState}</div>

  return (
    <>
      <Header />
      <Container className='mt--7' fluid>
        <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className='border-0'>
                <h3 className='mb-0'>Personas</h3>
              </CardHeader>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Nombre y Apellidos</th>
                    <th scope='col'>Estado</th>
                    <th scope='col'>Fecha</th>
                    <th scope='col'>Dirección</th>
                  </tr>
                </thead>
                <tbody>
                  {usersState.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>
                          <span className='mb-0 text-sm'>
                            {user.name}
                          </span>
                        </td>
                        <td>
                          <Badge color='' className='badge-dot mr-4 text-body'>
                            <i className='bg-info' />
                            Activo
                          </Badge>
                        </td>
                        <td>{user.pub_date}</td>
                        <td>Santa Clara</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              <CardFooter className='py-4'>
                <nav aria-label='...'>
                  <Pagination
                    className='pagination justify-content-end mb-0'
                    listClassName='justify-content-end mb-0'
                  >
                    <PaginationItem className='disabled'>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                        tabIndex='-1'
                      >
                        <i className='fas fa-angle-left' />
                        <span className='sr-only'>Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className='active'>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className='sr-only'>(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className='fas fa-angle-right' />
                        <span className='sr-only'>Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  )
}
