import DatosGenerales from 'pages/convenio/DatosGenerales'
import ClientesFinales from 'pages/convenio/ClientesFinales'
import ServiciosContratados from 'pages/convenio/ServiciosContratados'
import PlazosPago from 'pages/convenio/PlazosPago'
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
  }
  // {
  //   path: 'clientes',
  //   name: 'Clientes',
  //   element: <Clientes />,
  //   navbar: true
  // }
]
export default routes
