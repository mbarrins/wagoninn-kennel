import React from 'react';
import { connect } from 'react-redux'
import { getLookups } from '../actions/lookupsActions'

class MainContainer extends React.Component {

  componentDidMount() {
    this.props.getLookups();
  }

  render() {
    return (
      <div className="App">
        <h1>Dashboard</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.users.isAuthenticated,
    lookups: state.lookups.lookups
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    getLookups: props => dispatch(getLookups(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
