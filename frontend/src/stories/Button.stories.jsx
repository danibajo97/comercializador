import React from 'react'

import { Button } from '../components'

import 'rsuite/dist/rsuite.min.css'

export default {
  title: 'Components/Button',
  component: Button
}

const Template = (args) => <Button {...args} />

export const Index = Template.bind({})
Index.args = {
  appearance: 'primary',
  color: 'primary',
  size: 'md',
  children: 'Button',
  onClick: () => {
    console.log('Click Button')
  }
}
