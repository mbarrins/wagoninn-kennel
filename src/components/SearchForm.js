import React from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { searchOwners } from '../actions/searchActions'
import FieldInput from '../formComponents/FieldInput'
import { Link } from 'react-router-dom'

class SearchForm extends React.Component {
  state = {
    searchTerm: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    const { searchTerm } = this.state
    this.props.searchOwners(searchTerm)
  }

  handleChange = (key, value) => {
    this.setState({searchTerm: value})  
  }

  render() {
    const { owners, errors } = this.props
    const { searchTerm } = this.state

    return (
      <Container className='mt-5' fluid={true}>
        <Row className='justify-content-center'>
          <Col className='col-9 text-center center-block'>
          <Form onSubmit={this.handleSubmit}>
        <h1 className='text-center'>Search</h1>
        {errors.map((error, i)=> <p key={`error${i}`} style={{color: 'red'}}>{error}</p>)}
        <Row className='mt-3'>
          <Col className='text-center my-auto'>
          <FieldInput 
            inputType='text' 
            field='search' 
            label='Enter Owner or Pet Name' 
            tabIndex={1} 
            labelSize={4}
            inputSize={5}
            value={searchTerm} 
            handleChange={this.handleChange} 
          />
          </Col>
          <div className='text-left'>
            <Button variant='secondary' type='submit'>Submit</Button>
          </div>
          </Row>
        </Form>
        <hr />
            {owners.length > 0 && <h1 className='text-center'>Search Results</h1>}

            {owners.map(owner => (
            <Card key={`owner${owner.id}`}  >
              <Row className='mt-3'>
              <Col className='text-center my-auto'>
                <Row>
                  <Col xs={4} className='text-right'><h6>Owner</h6></Col>
                  <Col xs={7} className='text-left' ><h6>{owner.name}</h6></Col>
                </Row>
              </Col>
              <Col className='text-center my-auto'>
                <Row>
                  <Col xs={5} className='text-right'><h6>Partner</h6></Col>
                  <Col xs={7} className='text-left' ><h6>{owner.partner}</h6></Col>
                </Row>
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col className='text-center my-auto'>
                <Row>
                  <Col xs={2} className='text-right'><h6>Pets</h6></Col>
                  <Col xs={6} className='text-left' ><h6>{owner.pets}</h6></Col>
                </Row>
              </Col>
            </Row>
            {owner.current_bookings ? 
            <Row className='mt-3'>
              <Col className='text-center my-auto'>
                <Row>
                  <Col xs={2} className='text-right'><h6>{owner.current_bookings.length === 1 ? 'Current Booking' : 'Current Bookings'}</h6></Col>
                  <Col xs={6} className='text-left' >{owner.current_bookings.map(booking=> <h6 key={`owner${owner.id}-${booking}`}>{booking}</h6>)}</Col>
                </Row>
              </Col>
            </Row>
            : ''}
            <Row className='mt-3'>
              <Col className='text-center my-auto'>
                <Row>
                  <Col xs={2} className='text-right'><h6>Last Stay</h6></Col>
                  <Col xs={6} className='text-left' ><h6>{owner.last_stay}</h6></Col>
                </Row>
              </Col>
            </Row>
            <Link to={`/owners/${owner.id}`} className="stretched-link"></Link>
            </Card>
            ))}
        
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    owners: state.search.owners,
    errors: state.search.errors
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    searchOwners: props => dispatch(searchOwners(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);