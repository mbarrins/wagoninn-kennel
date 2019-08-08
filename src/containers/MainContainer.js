import React from 'react';
import { connect } from 'react-redux'
import { getLookups } from '../actions/lookupsActions'
import PetForm from '../components/PetForm'

class MainContainer extends React.Component {

  componentDidMount() {
    this.props.getLookups();
  }

  render() {
    const { loggedIn } = this.props

    return (
      <div className="App">
        {loggedIn ? <PetForm /> : <h1>Not Logged In</h1>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.users.loggedIn,
    lookups: state.lookups.lookups
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    getLookups: props => dispatch(getLookups(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
