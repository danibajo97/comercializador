import React from 'react'
import { Input } from 'rsuite'

const InputNumber = (props) => <Input {...props} as='input' type='number' value={props.value ?? 0} />

export default InputNumber
