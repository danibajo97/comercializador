import React from 'react'

import { DefaultHeader } from '../components'

import 'bootstrap/dist/css/bootstrap.css'

import '../assets/vendor/nucleo/css/nucleo.css'
import '../assets/vendor/futura/css/futura.css'
import '../assets/vendor/fortawesome/fontawesome-free/css/all.min.css'
import '../assets/css/argon-dashboard-react.css'

export default {
  title: 'Components/DefaultHeader',
  component: DefaultHeader
}

const Template = (args) => <DefaultHeader {...args} />

export const Index = Template.bind({})
Index.args = {

}
