import React from 'react'
import { Input } from 'rsuite'

export default function Textarea ({ props }) {
  return (
    <Input {...props} as='textarea' />
  )
}
