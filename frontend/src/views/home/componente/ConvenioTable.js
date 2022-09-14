import React from 'react'
import { useNavigate } from "react-router-dom";
import { Popover, Whisper, Checkbox, Dropdown, IconButton, Progress, Column, Table, Pagination } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';

import { clienteFinal } from 'constants/mock'

const ActionCell = ({ rowData, dataKey, ...props }) => {
  let navigate = useNavigate();
  return (
    <Table.Cell {...props} className="link-group">
      <Whisper placement="autoVerticalStart" trigger="click" speaker={({ onClose, left, top, className }, ref) => {
        const handleSelect = eventKey => {
          onClose();
          navigate(`/crear-convenio/${rowData[dataKey]}`);
        };
        return (
          <Popover ref={ref} className={className} style={{ left, top }} full>
            <Dropdown.Menu onSelect={handleSelect}>
              <Dropdown.Item eventKey={1}>Datos Generales</Dropdown.Item>
              <Dropdown.Item eventKey={2}>Gestión de Clientes Finales</Dropdown.Item>
              <Dropdown.Item eventKey={3}>Servicios Contratados</Dropdown.Item>
              <Dropdown.Item eventKey={4} disabled>Asociando Plazos de Pagos</Dropdown.Item>
            </Dropdown.Menu>
          </Popover>
        );
      }}>
        <IconButton appearance="subtle" icon={<MoreIcon />} />
      </Whisper>
    </Table.Cell>
  );
};

export default function ConvenioTable ({ }) {
  const length = clienteFinal.length
  console.log({ length });

  const [limit, setLimit] = React.useState(10)
  const [page, setPage] = React.useState(1)

  const handleChangeLimit = dataKey => {
    setPage(1)
    setLimit(dataKey)
  }

  const dataPage = clienteFinal.filter((v, i) => {
    const start = limit * (page - 1)
    const end = start + limit
    return i >= start && i < end
  })

  return (
    <Table data={dataPage} height={500} >
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>
          Nombre Completo Cliente
        </Table.HeaderCell>
        <Table.Cell dataKey='nombre' />
      </Table.Column>
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>
          Correo
        </Table.HeaderCell>
        <Table.Cell dataKey={'correo'} />
      </Table.Column>
      <Table.Column width={200}>
        <Table.HeaderCell>
          Acciones
        </Table.HeaderCell>
        <ActionCell dataKey="id" />
      </Table.Column>
      {/* <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        maxButtons={5}
        size='md'
        layout={['total', '-', 'pager']}
        total={length}
        limitOptions={[10, 20, 30, 40, 50]}
        limit={limit}
        activePage={page}
        onChangePage={setPage}
        onChangeLimit={handleChangeLimit}
      /> */}
    </Table>
  )
}
