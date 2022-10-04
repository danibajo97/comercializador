import { useState } from 'react'
import { NavLink as NavLinkRRD, Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import {
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from 'reactstrap'

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState()
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data)
  }
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false)
  }
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
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
    })
  }

  const { routes, logo } = props
  let navbarBrandProps
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link
    }
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: '_blank'
    }
  }

  return (
    <Navbar
      className='navbar-horizontal fixed-top navbar-light bg-white shadow'
      expand='md'
      id='sidenav-main'
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className='navbar-toggler'
          type='button'
          onClick={toggleCollapse}
        >
          <span className='navbar-toggler-icon' />
        </button>
        {/* Brand */}
        {logo
          ? (
            <NavbarBrand className='pt-0' {...navbarBrandProps}>
              {/* <img
                alt={logo.imgAlt}
                className='navbar-brand-img'
                src={logo.imgSrc}
              /> */}
              Comercializador
            </NavbarBrand>)
          : null}
        {/* User */}
        <Nav className='align-items-center d-md-none'>
          <UncontrolledDropdown nav>
            <DropdownToggle nav className='nav-link-icon'>
              <Media className='align-items-center'>
                <span className='avatar avatar-sm rounded-circle'>
                  <img
                    alt='...'
                    src={require('assets/img/icons/favicon.png')}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className='dropdown-menu-arrow'>
              <DropdownItem className='noti-title' header tag='div'>
                <h6 className='text-overflow m-0'>Opciones</h6>
              </DropdownItem>
              <DropdownItem to='/admin/user-profile' tag={Link}>
                <i className='ni ni-single-02' />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to='/admin/user-profile' tag={Link}>
                <i className='ni ni-settings-gear-65' />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem to='/admin/user-profile' tag={Link}>
                <i className='ni ni-user-run' />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className='navbar-collapse-header d-md-none'>
            <Row>
              {logo
                ? (
                  <Col className='collapse-brand' xs='6'>
                    {logo.innerLink
                      ? (
                        <Link to={logo.innerLink}>
                          <img alt={logo.imgAlt} src={logo.imgSrc} />
                        </Link>)
                      : (
                        <a href={logo.outterLink}>
                          <img alt={logo.imgAlt} src={logo.imgSrc} />
                        </a>)}
                  </Col>)
                : null}
              <Col className='collapse-close' xs='6'>
                <button
                  className='navbar-toggler'
                  type='button'
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}

Sidebar.defaultProps = {
  routes: [{}]
}

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired
  })
}

export default Sidebar
