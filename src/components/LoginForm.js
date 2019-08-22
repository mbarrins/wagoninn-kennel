import React from 'react'
import { connect } from 'react-redux'
import { loginUser, validateUserError } from '../actions/userActions'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class SignIn extends React.Component {
  state = {
    user: {
      username: '',
      password: ''
    },
    show: true
  }

  handleChange = (key, value) => {
    this.setState({ user: { ...this.state.user, [key]: value } })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = []
    if (this.state.user.username === '') errors.push('The username cannot be blank')
    if (this.state.user.password === '') errors.push('The password cannot be blank')

    if (errors.length === 0) {

      this.props.loginUser(this.state.user)
        .then(data => {
          if (data.type === 'LOG_IN_USER') {

            this.setState({
              user: {
                username: '',
                password: ''
              }
            })

            this.props.history.push("/main");
          }
        })

    } else {
      this.props.validateUserError({ errors })
    }
  }

  render() {
    const { errors } = this.props

    return (
      <>
        <Container>
          <Row className='min-vh-100'>
            <Col className='col-sm-6 offset-sm-3 text-center my-auto'>
              <Form onSubmit={this.handleSubmit}>
                <h1>Sign In</h1>
                {errors.map((error, i) => <p key={`error${i}`} style={{ color: 'red' }}>{error}</p>)}
                <Form.Group as={Row}>
                  <Form.Label column sm='2' htmlFor='username'>Username</Form.Label>
                  <Col sm='10'>
                    <Form.Control type='text' id='username' name='username' required={true} value={this.state.user.username} onChange={(e) => this.handleChange('username', e.target.value)} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm='2' htmlFor='Password'>Password</Form.Label>
                  <Col sm='10'>
                    <Form.Control type='password' id='password' name='password' required={true} value={this.state.user.password} onChange={(e) => this.handleChange('password', e.target.value)} />
                  </Col>
                </Form.Group>
                <Button variant='secondary' type='submit'>Submit</Button>
                <hr />
                <p>If you do not already have an account, please speak with you manager.</p>
              </Form>
            </Col>
          </Row>
        </Container>

        <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Sign in details for demo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            To sign in use the following user details.
            <br />
            <br />
            username: user1
            <br />
            password: password
            <br />
            <br />
            All owner and pet details are created using the Faker gem and are not real.
            <br /><br />
            Please do not enter any personal information as this is for demonstration only.
            <br /><br />
            A JWT token is used solely for functionality. Clicking Log Out will remove the token from your browser.
        </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ show: false })}>
              Close
        </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    errors: state.users.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(loginUser(user)),
    validateUserError: props => dispatch(validateUserError(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);