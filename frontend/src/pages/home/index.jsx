import { lazy, Suspense } from 'react'

import useAuth from 'hooks/useAuth'
import ROL from 'constants/rol'
import { Loader } from 'components'

const HomeDistribuidor = lazy(() => import('./HomeDistribuidor'))
const HomeCliente = lazy(() => import('./HomeCliente'))

export default function Home () {
  const { user } = useAuth()

  return (
    <Suspense fallback={<Loader.Default style={{ padding: 100 }} />}>
      {user && (user.rol === ROL.DISTRIBUIDOR ? <HomeDistribuidor /> : <HomeCliente />)}
    </Suspense>
  )
}
