import DatosGenerales from 'views/crear_convenio/DatosGenerales'
import ClientesFinales from 'views/crear_convenio/ClientesFinales'
import ServiciosContratados from 'views/crear_convenio/ServiciosContratados'
import PlazosPago from 'views/crear_convenio/PlazosPago'

const routes = [
  {
    path: 'datos-generales',
    name: 'Datos Generales',
    icon: 'ni ni-planet text-blue',
    element: <DatosGenerales />,
    navbar: false
  },
  {
    path: 'datos-generales/:id',
    name: 'Datos Generales',
    icon: 'ni ni-planet text-blue',
    element: <DatosGenerales />,
    navbar: false
  },
  {
    path: 'clientes-finales/:id',
    name: 'ClientesFinales',
    icon: 'ni ni-planet text-blue',
    element: <ClientesFinales />,
    navbar: false
  },
  {
    path: 'servicios-contratados/:id',
    name: 'Servicios Contratados',
    icon: 'ni ni-planet text-blue',
    element: <ServiciosContratados />,
    navbar: false
  },
  {
    path: 'plazos-pago/:id',
    name: 'Plazos de Pago',
    icon: 'ni ni-planet text-blue',
    element: <PlazosPago />,
    navbar: false
  }
]
export default routes
