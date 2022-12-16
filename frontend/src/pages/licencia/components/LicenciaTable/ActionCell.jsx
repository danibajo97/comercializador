import { Popover, Whisper, Dropdown, IconButton, Table as TableRS } from 'rsuite'
import useActionCell from './useActionCell'

export default function ActionCell ({ rowData, dataKey, ...props }) {
  const {
    isOtorgada,
    modalCopiarLicencia,
    modalSolicitud,
    deleteAlert,
    otorgarLicenciaAlert,
    handleSelect
  } = useActionCell({ rowData })

  return (
    <>
      {modalCopiarLicencia.modal}
      {modalSolicitud.modal}
      {deleteAlert.alert}
      {otorgarLicenciaAlert.alert}
      <TableRS.Cell {...props} className='link-group'>
        <Whisper
          placement='bottomEnd' trigger='click' speaker={({ onClose, left, top, className }, ref) => {
            return (
              <Popover ref={ref} className={className} style={{ left, top }} full>
                <Dropdown.Menu onSelect={(eventKey) => handleSelect({ eventKey, onClose })}>
                  <Dropdown.Item eventKey={4} hidden={!isOtorgada}>Copiar Licencia</Dropdown.Item>
                  <Dropdown.Item eventKey={3} hidden={isOtorgada}>Otorgar Licencia</Dropdown.Item>
                  <Dropdown.Item divider hidden={isOtorgada} />
                  <Dropdown.Item eventKey={1} hidden={isOtorgada}>Editar</Dropdown.Item>
                  <Dropdown.Item eventKey={2} hidden={isOtorgada}>Eliminar</Dropdown.Item>
                </Dropdown.Menu>
              </Popover>
            )
          }}
        >
          <IconButton
            className='mt--2 mb--2 pl-2 pr-2'
            size='sm'
            appearance='subtle'
            icon={<i className='fa fa-ellipsis-v' />}
          />
        </Whisper>
      </TableRS.Cell>
    </>
  )
}
