import Home from 'views/home/index'
import CrearConvenio from 'views/crear_convenio/index'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    icon: 'ni ni-tv-2 text-primary',
    element: <Home />,
    sidebar: true
  },
  {
    path: '/crear-convenio',
    name: 'Crear Convenio',
    icon: 'ni ni-planet text-blue',
    element: <CrearConvenio />,
    sidebar: true
  }
]
export default routes
