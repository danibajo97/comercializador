import useConvenio from 'hooks/useConvenio'
import useModal from 'hooks/useModal'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AsociarServiciosForm } from './AsociarServiciosForm'
import { PlazosPagoForm } from './PlazosPagoForm'

export default function usePlazosPago () {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(null)

  const params = useParams()
  const { id } = params

  const { convenio } = useConvenio({ id })

  const modalPlazoPago = useModal({
    title: 'Nuevo Plazos de Pagos',
    size: 'sm',
    renderBody: ({ closeModal }) => {
      return <PlazosPagoForm closeModal={closeModal} convenioId={id} />
    }
  })

  const modalServicio = useModal({
    title: 'Nuevo Servicios',
    size: 'sm',
    renderBody: ({ closeModal }) => {
      return <AsociarServiciosForm closeModal={closeModal} convenioId={id} plazoPagoId={selectedId} />
    }
  })

  const goToBack = () => navigate('/')

  const isComfirmado = () => convenio && convenio.estado >= 3

  return {
    selectedId,
    setSelectedId,
    modalPlazoPago,
    modalServicio,
    isComfirmado,
    goToBack
  }
}
