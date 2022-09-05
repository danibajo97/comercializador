import React from 'react'

import { Header } from '../components'

import 'bootstrap/dist/css/bootstrap.css'

import '../assets/vendor/nucleo/css/nucleo.css'
import '../assets/vendor/futura/css/futura.css'
import '../assets/vendor/fortawesome/fontawesome-free/css/all.min.css'
import '../assets/css/argon-dashboard-react.css'

export default {
  title: 'Components/Header',
  component: Header
}

const Template = (args) => <Header {...args} />

export const Index = Template.bind({})
Index.args = {

}
