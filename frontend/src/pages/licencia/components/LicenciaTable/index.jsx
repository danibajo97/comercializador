import Table from 'components/table/Table'
import ActionCell from './ActionCell'

export default function LicenciaTable ({ clientes, pagination, onSortColumn, sortInfo }) {
  return (
    <>
      <Table
        sortColumn={sortInfo.sortColumn}
        sortType={sortInfo.sortType}
        onSortColumn={onSortColumn}
        data={clientes}
        autoHeight
      >
        {Table.Column({ header: 'Nro', dataKey: 'no_solicitud', flex: 0.3, minWidth: 50, sortable: true })}
        {Table.Column({ header: 'Fecha', dataKey: 'fecha', flex: 0.5, sortable: true })}
        {Table.Column({ header: 'Persona que solicita', dataKey: 'solicitado_por_nombre', flex: 1, minWidth: 200, sortable: false })}
        {Table.Column({ header: 'Cliente final', dataKey: 'cliente_final_nombre', flex: 1.5, minWidth: 200, sortable: true })}
        {Table.Column({ header: 'Servicio', dataKey: 'servicio_nombre', flex: 1.5, minWidth: 200, sortable: true })}
        {Table.ColumnBoolean({ header: 'Licencia', dataKey: 'licencia', flex: 1, opcions: { yes: 'Otorgada', no: 'Pendiente', sortable: true } })}
        {Table.Column({ header: 'Observación', dataKey: 'observacion', flex: 2, minWidth: 250, sortable: true })}
        {Table.ColumnAccion({ action: ActionCell })}
      </Table>
      {pagination}
    </>
  )
}
