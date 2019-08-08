import React from 'react';
import { connect } from 'react-redux'
import { getLookups } from '../actions/lookupsActions'

class MainContainer extends React.Component {

  componentDidMount() {
    console.log('MaindidMount')
    this.props.getLookups();
  }

  render() {
    const { loggedIn } = this.props

    return (
      <div className="App">
        {loggedIn ? <h1>Logged In</h1> : <h1>Not Logged In</h1>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.usersReducer.loggedIn,
    lookups: state.lookupsReducer.lookups
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    getLookups: props => dispatch(getLookups(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
