import React from 'react'
import { Input } from 'rsuite'

export default function InputNumber ({ props }) {
  return (
    <Input {...props} as='input' type='number' size='sm' />
  )
}
