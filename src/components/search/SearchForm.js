import React from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { searchOwners } from '../../actions/searchActions'
import FieldInput from '../formComponents/FieldInput'
import SearchResult from './SearchResult'

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
    this.setState({ searchTerm: value })
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
              {errors.map((error, i) => <p key={`error${i}`} style={{ color: 'red' }}>{error}</p>)}
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
                  <Button variant='secondary' type='submit'>Search</Button>
                </div>
              </Row>
            </Form>
            <hr />
            {owners.length > 0 && <h1 className='text-center'>Search Results</h1>}

            {owners.map(owner => (
              <SearchResult key={`owner${owner.id}`} owner={owner} />
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