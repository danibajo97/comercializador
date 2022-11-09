import DatosGenerales from 'pages/convenio/DatosGenerales'
import ClientesFinales from 'pages/convenio/ClientesFinales'
import ServiciosContratados from 'pages/convenio/ServiciosContratados'
import PlazosPago from 'pages/convenio/PlazosPago'
import SolicitudLicencia from 'pages/licencia'
// import Clientes from 'pages/clientes'

const routes = [
  {
    path: 'datos-generales',
    name: 'Datos Generales',
    element: <DatosGenerales />,
    navbar: false
  },
  {
    path: 'datos-generales/:id',
    name: 'Datos Generales',
    element: <DatosGenerales />,
    navbar: false
  },
  {
    path: 'clientes-finales/:id',
    name: 'ClientesFinales',
    element: <ClientesFinales />,
    navbar: false
  },
  {
    path: 'servicios-contratados/:id',
    name: 'Servicios Contratados',
    element: <ServiciosContratados />,
    navbar: false
  },
  {
    path: 'plazos-pago/:id',
    name: 'Plazos de Pago',
    element: <PlazosPago />,
    navbar: false
  },
  {
    path: 'solicitud-licencia',
    name: 'Solicitud de Licencia',
    element: <SolicitudLicencia />,
    navbar: true
  }
  // {
  //   path: 'clientes',
  //   name: 'Clientes',
  //   element: <Clientes />,
  //   navbar: true
  // }
]
export default routes
