import React from 'react';
import LoginForm from './components/LoginForm'
import { connect } from 'react-redux'
import { validateUser, logoutUser  } from './actions/userActions'
import TopNavbar from './components/TopNavbar';
import MainContainer from './containers/MainContainer'

class App extends React.Component {

  componentDidMount() {
    this.props.validateUser();

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function(event) {
      window.history.go(1);
    };
  }

  render() {
    const { loggedIn } = this.props

    return (
      <div className="App">
        <TopNavbar />
        {loggedIn ? <MainContainer /> : <LoginForm />}
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
