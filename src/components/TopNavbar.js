import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/userActions'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

const TopNavbar = ({ isAuthenticated, logoutUser }) => {
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/main" >
        <img
          alt=""
          src="/logo.gif"
          width="210"
          height="56"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {isAuthenticated ?
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className='text-dark' href="/main">Home</Nav.Link>
            <Nav.Link className='text-dark' href="/owners/new">New Boarder</Nav.Link>
            <Nav.Link className='text-dark' href="/search">Search</Nav.Link>
            <NavDropdown className='text-dark' title="Reports" id="basic-nav-dropdown">
              <NavDropdown.Item className='text-dark' href="/reports/income">Monthly Income</NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto">
            <Button variant='outline' onClick={logoutUser}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
        : ''}
    </Navbar>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.users.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: props => dispatch(logoutUser(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNavbar);