import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { users, loading, error, getAll } from '../redux/users/usersSlice'

import { Button } from '../components'

export default function Example () {
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
    <div>
      <h1>Usuarios</h1>
      <Button
        color='secundary'
        onClick={() => { }}
        size='large'
      >
        Button {usersState.length}
      </Button>
      <ul>
        {usersState.map((user) => {
          return (
            <li key={user.id}>{user.name} {user.pub_date}</li>
          )
        })}
      </ul>
    </div>
  )
}
