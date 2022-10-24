import React from 'react'

import useAuth from 'hooks/useAuth'
import ROL from 'constants/rol'

import HomeDistribuidor from './HomeDistribuidor'
import HomeCliente from './HomeCliente'

export default function Home () {
  const { user } = useAuth()

  return (
    <>
      {user && (user.rol === ROL.DISTRIBUIDOR ? <HomeDistribuidor /> : <HomeCliente />)}
    </>
  )
}
