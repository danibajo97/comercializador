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
} from "reactstrap";
import { NavLink as NavLinkRRD, Link } from 'react-router-dom'

const Navbar = (props) => {
  const { routes } = props
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.navbar) {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.path}
              tag={NavLinkRRD}
              onClick={isOpen && toggle}
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
        className="navbar-horizontal navbar-light bg-white fixed-top shadow-lg"
        style={{ paddingTop: '0.3em', paddingBottom: '0.3em' }}
        expand="lg"
        id='sidenav-main'
      >
        <NavbarBrand tag={Link} to='/'>Comercializador</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {createLinks(routes)}
          </Nav>
          <Nav navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle mr-2 d-none d-lg-block">
                    <img
                      alt="..."
                      src={require("../../assets/img/icons/favicon.png")}
                    />
                  </span>
                  <Media className="">
                    <span className="mb-0 mt-0 text-sm font-weight-bold">
                      Jessica Jones
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </NavbarReact>
    </>
  )
}

export default Navbar
