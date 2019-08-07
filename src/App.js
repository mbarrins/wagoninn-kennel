import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import { connect } from 'react-redux'
import { validateUser, logoutUser } from './actions/userActions'

class App extends React.Component {

  componentDidMount() {
    this.props.validateUser();
  }

  render() {
    const { loggedIn } = this.props

    return (
      <div className="App">
        {loggedIn ? <div><h1>Logged In</h1><button onClick={() => this.props.logoutUser()}>Logout</button></div> : <LoginForm />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.usersReducer.loggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    validateUser: props => dispatch(validateUser(props)),
    logoutUser: props => dispatch(logoutUser(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
