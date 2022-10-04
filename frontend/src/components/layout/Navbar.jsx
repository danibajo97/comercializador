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

const Navbar = ({ routes }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

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
              {/* <i className={prop.icon} /> */}
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
            <NavLink to='/' tag={NavLinkRRD} onClick={closeCollapse}>Inicio</NavLink>
            {createLinks(routes)}
          </Nav>
          {user &&
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className='pr-0' nav>
                  <Media className='align-items-center'>
                    <span className='avatar avatar-sm rounded-circle mr-2 d-none d-md-block'>
                      <img
                        alt='...'
                        src={require('assets/img/icons/favicon.png')}
                      />
                    </span>
                    <Media className=''>
                      <Row style={{ marginRight: -200 }}>
                        <Col xs='12' className='mb-0 mt-0 text-md font-weight-bold'>
                          {user.name}
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
                  <DropdownItem to='/admin/user-profile' tag={Link}>
                    <i className='ni ni-single-02' />
                    <span>Mi perfil</span>
                  </DropdownItem>
                  <DropdownItem to='/admin/user-profile' tag={Link}>
                    <i className='ni ni-support-16' />
                    <span>Acerca de</span>
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
