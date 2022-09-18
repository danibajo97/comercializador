import Home from 'views/home/index'
import DatosGenerales from 'views/crear_convenio/DatosGenerales'
import ClientesFinales from 'views/crear_convenio/ClientesFinales'
import ServiciosContratados from 'views/crear_convenio/ServiciosContratados'
import CrearConvenio from 'views/crear_convenio/index'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    icon: 'ni ni-tv-2 text-primary',
    element: <Home />,
    navbar: true
  },
  /* CRUD de convenio ++++++++++++++++++++++++++++++++ */
  {
    path: '/datos-generales',
    name: 'Datos Generales',
    icon: 'ni ni-planet text-blue',
    element: <DatosGenerales />,
    navbar: false
  },
  {
    path: '/datos-generales/:id',
    name: 'Datos Generales',
    icon: 'ni ni-planet text-blue',
    element: <DatosGenerales />,
    navbar: false
  },
  {
    path: '/clientes-finales/:id',
    name: 'ClientesFinales',
    icon: 'ni ni-planet text-blue',
    element: <ClientesFinales />,
    navbar: false
  },
  {
    path: '/servicios-contratados/:id',
    name: 'Servicios Contratados',
    icon: 'ni ni-planet text-blue',
    element: <ServiciosContratados />,
    navbar: false
  },
  {
    path: '/crear-convenio',
    name: 'Crear Convenio',
    icon: 'ni ni-planet text-blue',
    element: <CrearConvenio />,
    navbar: false
  }
]
export default routes
