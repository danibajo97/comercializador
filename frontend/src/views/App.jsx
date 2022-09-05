import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Example from './Example'
import Home from './home/index'

export default function App () {
  return (
    <div>
      <h1>Comercializador</h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='example' element={<Example />} />
      </Routes>
    </div>
  )
}
