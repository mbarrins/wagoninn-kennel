import React from 'react'
import { connect } from 'react-redux'
import { logoutUser  } from '../actions/userActions'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

const TopNavbar = ({ loggedIn, logoutUser}) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        {' React Bootstrap'}
      </Navbar.Brand>
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {loggedIn ? 
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto">
            <Button variant='light link' onClick={logoutUser}>Logout</Button>
          </Nav>
      </Navbar.Collapse>
      : '' }
    </Navbar>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.users.loggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    logoutUser: props => dispatch(logoutUser(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNavbar);