import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/userActions'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'

const TopNavbar = ({ isAuthenticated, logoutUser }) => {
  return (
    <Navbar expand="lg" >
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
          <Nav className="mr-auto" >
            <Nav.Link as={Link} className='text-dark' to="/main">Home</Nav.Link>
            <Nav.Link as={Link} className='text-dark' to="/owners/new">New Owner</Nav.Link>
            <Nav.Link as={Link} className='text-dark' to="/search">Search</Nav.Link>
            <NavDropdown as={Link} className='text-dark' title="Reports" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} className='text-dark' to="/reports/occupancy">Occupancy</NavDropdown.Item>
              <NavDropdown.Item as={Link} className='text-dark' to="/reports/monthly">Monthly Income</NavDropdown.Item>
              <NavDropdown.Item as={Link} className='text-dark' to="/reports/compare_years">Last 3 Years Income</NavDropdown.Item>
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