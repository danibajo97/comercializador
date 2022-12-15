import { Component } from 'react'

import { Loader as LoaderRS, Placeholder } from 'rsuite'

function LoaderGrid ({ rows, columns }) {
  return (
    <div>
      <Placeholder.Grid rows={rows} columns={columns} />
      <LoaderRS content='Cargando...' speed='slow' center />
    </div>
  )
}

function LoaderParagraph ({ rows }) {
  return (
    <div>
      <Placeholder.Paragraph rows={rows} className='text-red' />
      <LoaderRS content='Cargando...' speed='slow' center />
    </div>
  )
}

function LoaderDefault ({ ...props }) {
  return (
    <div {...props}>
      <LoaderRS content='Cargando...' speed='slow' center />
    </div>
  )
}

export default class Loader extends Component {
  static Grid = LoaderGrid
  static Paragraph = LoaderParagraph
  static Default = LoaderDefault
}
