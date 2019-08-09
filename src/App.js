import React from 'react';
import LoginForm from './components/LoginForm'
import { connect } from 'react-redux'
import { validateUser, logoutUser  } from './actions/userActions'
import TopNavbar from './components/TopNavbar';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import MainContainer from './containers/MainContainer'
import PetForm from './components/PetForm';
import OwnerForm from './components/OwnerForm';
import OwnerDisplay from './components/OwnerDisplay';

class App extends React.Component {
  state = {
    loading: true
  }

  componentDidMount() {
    this.props.validateUser()
      .then(data => this.setState({loading: false}))
  }

  checkAuth = () => {
    const { isAuthenticated } = this.props
    const { loading } = this.state

    if (loading) {
      return <div>Loading...</div> 
    } else if (!loading && !isAuthenticated) {
      return <Redirect to="/login" />
    }
    return null
  }

  render() {
    return (
      <div className="App">
        <TopNavbar />
        {this.checkAuth()}
        <Switch>
          <Route exact path='/login' component={LoginForm} />
          <Route exact path='/main' component={MainContainer} />
          <Route exact path='/owners/:id' component={OwnerDisplay} />
          <Route exact path='/owners/new' component={OwnerForm} />
          <Route exact path='/pet' component={PetForm} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.users.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    validateUser: props => dispatch(validateUser(props)),
    logoutUser: props => dispatch(logoutUser(props))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
