import useUserOptions from 'hooks/useUserOptions'
import { Row, Col, Nav, NavItem, NavLink } from 'reactstrap'

const Footer = () => {
  const { changePasswordModal, openChangePasswordModal, contactUsModalModal, openContactUsModalModal } = useUserOptions()

  return (
    <>
      {changePasswordModal}{contactUsModalModal}
      <footer className='footer'>
        <Row className='align-items-center justify-content-xl-between'>
          <Col xl='6'>
            <div className='copyright text-center text-xl-left text-muted'>
              © {new Date().getFullYear()}{' '}
              <span className='font-weight-bold ml-1 text-primary'>
                Datazucar
              </span>
            </div>
          </Col>

          <Col xl='6'>
            <Nav className='nav-footer justify-content-center justify-content-xl-end'>
              <NavItem style={{ cursor: 'pointer' }}>
                <NavLink onClick={openChangePasswordModal}>
                  Cambiar Contraseña
                </NavLink>
              </NavItem>
              <NavItem style={{ cursor: 'pointer' }}>
                <NavLink onClick={openContactUsModalModal}>
                  Contáctenos
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    </>

  )
}

export default Footer
