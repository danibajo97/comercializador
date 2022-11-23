import useModal from 'hooks/useModal'
import ChangePassword from 'components/options/ChangePassword'
import ContactUs from 'components/options/ContactUs'

export default function useUserOptions () {
  const changePasswordModal = useModal({
    title: 'Cambiar Contraseña',
    size: 'xs',
    renderBody: ({ closeModal }) => {
      return <ChangePassword closeModal={closeModal} />
    }
  })

  const contactUsModal = useModal({
    title: () => <div>Contáctenos <span className='text-muted'> (Envíenos su Opinión)</span></div>,
    size: 'sm',
    renderBody: ({ closeModal }) => {
      return <ContactUs closeModal={closeModal} />
    }
  })

  return {
    changePasswordModal: changePasswordModal.modal,
    openChangePasswordModal: changePasswordModal.openModal,
    contactUsModalModal: contactUsModal.modal,
    openContactUsModalModal: contactUsModal.openModal
  }
}
