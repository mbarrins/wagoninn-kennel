import React from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class PetForm extends React.Component {
  state = {
    pet: {
      name: '',
      animal: '',
      sex: '',
      breed: '',
      color: '', 
      size: '',
      spayedNeutered: false
    }
  }

  handleChange = (key, value) => {
    this.setState({pet: {...this.state.pet, [key]: value}})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = []
    if (this.state.user.name === '') errors.push('The name cannot be blank')
    if (this.state.user.type === '') errors.push('The type cannot be blank')

    if (errors.length === 0) {

      // this.props.loginUser(this.state.user);

      this.setState({
        user: {
          name: '',
          type: ''
        }
      })

    } else {
      // this.props.validateUserError({ errors })
    }
  }

  render() {
    const { lookups: {lookups, errors} } = this.props
    const { pet: {name, animal, sex, breed, color, size, spayedNeutered } } = this.state

    return (
      <Container className='mt-5'>
        <Form onSubmit={this.handleSubmit}>
        <h1 className='text-center'>New Pet</h1>
        {errors.map((error, i)=> <p key={`error${i}`} style={{color: 'red'}}>{error}</p>)}
        <Row>
          <Col className='col-sm-6 text-center my-auto'>
            <Form.Group as={Row}>
              <Form.Label column sm='2' htmlFor='name'>Name</Form.Label>
              <Col sm='10'>
                <Form.Control 
                  type='text' 
                  id='name' 
                  name='name' 
                  required={true} 
                  value={name} 
                  onChange={(e) => this.handleChange('name', e.target.value)} 
                  tabIndex={1}
                />
              </Col>
            </Form.Group>
            {animal === ''  || parseInt(animal, 10) === lookups.petTypes.find(petType => petType.animal === 'Dog').id ?
              <Form.Group as={Row}>
                <Form.Label column sm='2' htmlFor='breed'>Breed</Form.Label>
                <Col sm='10'>
                  <Form.Control 
                    as='select' 
                    id='breed' 
                    name='breed' 
                    required={true} 
                    value={breed}
                    onChange={(e) => this.handleChange('breed', e.target.value)} 
                    tabIndex={4}
                  >
                  <option value="" disabled>Select</option>
                  {lookups.breeds.map(breed => <option key={`breed-${breed.id}`} value={breed.id}>{breed.breed}</option>)}
                  </Form.Control>
                </Col>
              </Form.Group>
            :
              <Form.Group as={Row}>
                <Form.Label column sm='2' htmlFor='color'>Color</Form.Label>
                <Col sm='10'>
                  <Form.Control 
                    as='select' 
                    id='color' 
                    name='color' 
                    required={true} 
                    value={color} 
                    onChange={(e) => this.handleChange('color', e.target.value)}
                    tabIndex={5}
                  >
                  <option value="" disabled>Select</option>
                  {lookups.colors.map(color => <option key={`color-${color.id}`} value={color.id}>{color.color}</option>)}
                  </Form.Control>
                </Col>
              </Form.Group>
            }
          </Col>
          <Col className='col-sm-6 text-center my-auto'>    
          <Row>
            <Col>
              <Form.Group as={Row}>
                <Form.Label column sm='4' htmlFor='animal'>Animal</Form.Label>
                <Col sm='7'>
                <Form.Control 
                  as='select' 
                  id='animal' 
                  name='animal' 
                  required={true} 
                  value={animal} 
                  onChange={(e) => this.handleChange('animal', e.target.value)} 
                  tabIndex={2}
                >
                <option value="" disabled>Select</option>
                {lookups.petTypes.map(animal => <option key={`animal-${animal.id}`} value={animal.id}>{animal.animal}</option>)}
                </Form.Control>
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Row}>
                <Form.Label column sm='5' htmlFor='sex'>Sex</Form.Label>
                <Col sm='7'>
                <Form.Control 
                  as='select' 
                  id='sex' 
                  name='sex' 
                  required={true} 
                  value={sex} 
                  onChange={(e) => this.handleChange('sex', e.target.value)} 
                  tabIndex={3}
                >
                <option value="" disabled>Select</option>
                {lookups.sexes.map(sex => <option key={sex.id} value={sex.id}>{sex.sex}</option>)}
                </Form.Control>
                </Col>
              </Form.Group>
            </Col>
            </Row>
            <Form.Group as={Row}>
              <Form.Label column sm='2' htmlFor='size'>Size</Form.Label>
              <Col sm='10'>
              <Form.Control 
                  as='select' 
                  id='size' 
                  name='size' 
                  required={true} 
                  value={size} 
                  onChange={(e) => this.handleChange('size', e.target.value)}
                  tabIndex={5}
                >
                <option value="" disabled>Select</option>
                {lookups.sizes.map(size => <option key={size.id} value={size.id}>{size.size}</option>)}
                </Form.Control>
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className='form-control-lg text-center'>
          <Form.Check
            name="spayedNeutered"
            label="Tick if the pet has been spayed or neutered"
            onChange={(e) => this.handleChange('spayedNeutered', e.target.checked)}
            checked={spayedNeutered}
            id="spayedNeutered"
          />
        </Form.Group>
          <hr/>
        <div className='text-center'>
          <Button variant='secondary' type='submit'>Submit</Button>
        </div>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    lookups: state.lookups
  }
}

export default connect(mapStateToProps)(PetForm);