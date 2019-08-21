import React from 'react';
import LoginForm from './components/LoginForm'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { validateUser, logoutUser } from './actions/userActions'
import { getLookups } from './actions/lookupsActions'
import TopNavbar from './components/TopNavbar';
import Dashboard from './components/Dashboard'
import PetForm from './components/pet/PetForm';
import PetDisplay from './components/pet/PetDisplay';
import OwnerForm from './components/owner/OwnerForm';
import OwnerDisplay from './components/owner/OwnerDisplay';
import BookingForm from './components/booking/BookingForm';
import SearchForm from './components/search/SearchForm';
import BarChart from './components/reports/BarChart';
import Occupancy from './components/reports/Occupancy';

class App extends React.Component {
  state = {
    loading: true
  }

  componentDidMount() {
    this.props.validateUser()
      .then(data => {
        this.setState({ loading: false })

        if (data.payload) {
          this.props.getLookups()
        }
      })
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
      <div className="App mb-5" >
        <TopNavbar />
        {this.checkAuth()}
        < Switch >
          <Route exact path='/login' component={LoginForm} />
          {this.props.isAuthenticated ?
            <Switch>
              <Route exact path='/main' component={Dashboard} />
              <Route exact path='/search' component={SearchForm} />
              <Route exact path='/owners/new' component={OwnerForm} />
              <Route exact path='/owners/:id/edit' component={OwnerForm} />
              <Route exact path='/owners/:id' component={OwnerDisplay} />
              <Route exact path='/pets/new' component={PetForm} />
              <Route exact path='/pets/:id/edit' component={PetForm} />
              <Route exact path='/pets/:id' component={PetDisplay} />
              <Route exact path='/bookings/new' component={BookingForm} />
              <Route exact path='/bookings/:id/edit' component={BookingForm} />
              <Route exact path='/reports/occupancy' component={Occupancy} />
              <Route exact path='/reports/monthly' component={() => <BarChart type={'year'} />} />
              <Route exact path='/reports/compare_years' component={() => <BarChart type={'compare_years'} />} />
              <Route path='/' component={Dashboard} />
            </Switch>
            : ''}
        </Switch >
      </div >
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
    logoutUser: props => dispatch(logoutUser(props)),
    getLookups: props => dispatch(getLookups(props))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
