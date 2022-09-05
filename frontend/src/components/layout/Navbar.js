import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Navbar as NavbarReact,
  Nav,
  Container,
  Media
} from 'reactstrap'

const Navbar = (props) => {
  return (
    <>
      <NavbarReact className='navbar-top navbar-dark' expand='md' id='navbar-main'>
        <Container fluid>
          <div
            className='h4 mb-0 text-white text-uppercase d-none d-md-inline-block'
            to='/'
          />
          <Nav className='align-items-center d-none d-md-flex' navbar>
            <UncontrolledDropdown group>
              <DropdownToggle variant='success' className='pr-0' nav>
                <Media className='align-items-center'>
                  <span className='avatar avatar-sm rounded-circle'>
                    <img
                      alt='...'
                      src={require('../../assets/img/icons/favicon.png')}
                    />
                  </span>
                  <Media className='ml-2 d-none d-sm-block'>
                    <span className='mb-0 text-sm font-weight-bold text-white'>
                      Comercial
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className='dropdown-menu-arrow'>
                <DropdownItem className='noti-title' header tag='div'>
                  <h6 className='text-overflow m-0'>Opciones</h6>
                </DropdownItem>
                <DropdownItem href='#pablo' onClick={(e) => e.preventDefault()}>
                  <i className='ni ni-user-run' />
                  <span>Logout</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href='#pablo' onClick={(e) => e.preventDefault()}>
                  <i className='ni ni-user-run' />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </NavbarReact>
    </>
  )
}

export default Navbar
