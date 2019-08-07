import React from 'react'
import { connect } from 'react-redux'
import { loginUser, validateUserError } from '../actions/userActions'

class SignIn extends React.Component {
  state = {
    user: {
      username: '',
      password: ''
    }
  }

  handleChange = (key, value) => {
    this.setState({user: {...this.state.user, [key]: value}})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = []
    if (this.state.user.username === '') errors.push('The username cannot be blank')
    if (this.state.user.password === '') errors.push('The password cannot be blank')

    if (errors.length === 0) {

      this.props.loginUser(this.state.user);

      this.setState({
        user: {
          username: '',
          password: ''
        }
      })

    } else {
      this.props.validateUserError({ errors })
    }
  }

  render() {
    const { errors } = this.props
    
    return (
      <div style={{padding: '10px'}}>
        <p>Please login to view your bookings.</p>
        <form onSubmit={this.handleSubmit}>
          <h1>Sign In</h1>
          {errors.map((error, i)=> <p key={`error${i}`} style={{color: 'red'}}>{error}</p>)}
          <div>
            <label htmlFor='username' >Username</label>
            <input type='text' id='username' name='username' required={true} value={this.state.user.username} onChange={(e) => this.handleChange('username', e.target.value)} />
          </div>
          <div>
            <label htmlFor='Password'>Password</label>
            <input type='password' id='password' name='password' required={true} value={this.state.user.password} onChange={(e) => this.handleChange('password', e.target.value)} />
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
          <hr/>
          <p>If you do not already have an account, please speak with you manager.</p>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    errors: state.usersReducer.errors
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    loginUser: user => dispatch(loginUser(user)),
    validateUserError: props => dispatch(validateUserError(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);