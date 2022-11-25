import React, { useState } from 'react'
import {
  Collapse,
  Navbar as NavbarReact,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Media,
  Col,
  Row
} from 'reactstrap'
import { NavLink as NavLinkRRD, Link } from 'react-router-dom'

import useAuth from 'hooks/useAuth'
import useUserOptions from 'hooks/useUserOptions'
import ROL from 'constants/rol'

const Navbar = ({ routes }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const { changePasswordModal, openChangePasswordModal, contactUsModalModal, openContactUsModalModal } = useUserOptions()

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const closeCollapse = () => {
    setIsOpen(false)
  }

  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.navbar) {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
            >
              {prop.name}
            </NavLink>
          </NavItem>
        )
      } else {
        return null
      }
    })
  }

  return (
    <>
      {changePasswordModal}{contactUsModalModal}
      <NavbarReact
        className='navbar-horizontal navbar-light bg-white fixed-top shadow-lg'
        style={{ paddingTop: '0.3em', paddingBottom: '0.3em' }}
        expand='md'
        id='sidenav-main'
      >
        <NavbarBrand tag={Link} to='/'>Comercializador</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='me-auto' navbar>
            {user?.rol !== ROL.CLIENTE &&
              <>
                <NavLink to='/' tag={NavLinkRRD} onClick={closeCollapse}>Inicio</NavLink>
                {createLinks(routes)}
              </>}
          </Nav>
          {user &&
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className='pr-0' nav>
                  <Media className='align-items-center'>
                    <span className='avatar avatar-sm rounded-circle mr-2 d-none d-md-block'>
                      <img
                        width={36}
                        height={36}
                        alt='...'
                        src={require('assets/img/icons/user-login-avatar-blue-child.png')}
                      />
                    </span>
                    <Media className=''>
                      <Row style={{ marginRight: -200 }}>
                        <Col xs='12' className='mb-0 mt-0 text-md font-weight-bold'>
                          {user.name} {user.last_name}
                        </Col>
                        <Col xs='12' className='mb-0 mt-0 text-sm'>
                          {user.email}
                        </Col>
                      </Row>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className='dropdown-menu-arrow'>
                  <DropdownItem className='noti-title' header tag='div'>
                    <h6 className='text-overflow m-0'>Opciones</h6>
                  </DropdownItem>
                  <DropdownItem to='/admin/user-profile' tag={Link} hidden>
                    <i className='fa fa-user' />
                    <span>Mi perfil</span>
                  </DropdownItem>
                  <DropdownItem onClick={openChangePasswordModal}>
                    <i className='fa fa-key' />
                    <span>Cambiar Contraseña</span>
                  </DropdownItem>
                  <DropdownItem onClick={openContactUsModalModal}>
                    <i className='fa fa-envelope' />
                    <span>Contáctenos</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => logout()}>
                    <i className='fa fa-power-off' />
                    <span>Cerrar Sesión</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>}
        </Collapse>
      </NavbarReact>
    </>
  )
}

export default Navbar
