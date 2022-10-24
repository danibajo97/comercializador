import React, { Component } from 'react'

import { Loader as LoaderRS, Placeholder } from 'rsuite'

function LoaderGrid ({ rows, columns }) {
  return (
    <div>
      <Placeholder.Grid rows={rows} columns={columns} />
      <LoaderRS content='Cargando...' speed='slow' center />
    </div>
  )
}

function LoaderParagraph () {
  return (
    <div>
      <Placeholder.Paragraph rows={6} className='text-red' />
      <LoaderRS content='Cargando...' speed='slow' center />
    </div>
  )
}

export default class Loader extends Component {
  static Grid = LoaderGrid
  static Paragraph = LoaderParagraph
}
