import Persona from 'views/persona/index'
import Home from 'views/home/index'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    icon: 'ni ni-tv-2 text-primary',
    element: <Home />,
    layout: '/admin'
  },
  {
    path: '/personas',
    name: 'Personas',
    icon: 'ni ni-planet text-blue',
    element: <Persona />,
    layout: '/admin'
  }
]
export default routes
