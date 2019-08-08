import React from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FieldInput from '../formComponents/FieldInput'
import SelectInput from '../formComponents/SelectInput'
import moment from 'moment'

class PetForm extends React.Component {
  state = {
    pet: {
      name: '',
      petType: '',
      sex: '',
      breed: '',
      color: '', 
      size: '',
      spayedNeutered: false,
      immunisations: []
    }
  }

  handleChange = (key, value) => {
    
    if (key === 'petType') {
      this.updateWithImmunisations(value);
    } else {
      this.setState({pet: {...this.state.pet, [key]: value}})
    }
  }

  handleImmunisationChange = (key, value, index) => {
    
    this.setState({pet: {...this.state.pet, immunisations: this.state.pet.immunisations.map((shot,i) => index === i ? {...shot, [key]: value} : shot)}})
    
  }

  updateWithImmunisations = (petType) => {
    const { lookups: {lookups} } = this.props
    
    if (petType === '' || lookups.petTypes.length === 0) {

      this.setState({pet: {...this.state.pet, petType: petType, immunisations: []}})
    
    } else if (parseInt(petType, 10) === lookups.petTypes.find(petType => petType.name === 'Dog').id) {

      this.setState({pet: {...this.state.pet, petType: petType, immunisations: lookups.immunisations.dog.map(shot => ({immunisation_id: shot.id, validity_id: '', effectiveDate: ''}))}})
    
    } else if (parseInt(petType, 10) === lookups.petTypes.find(petType => petType.name === 'Cat').id) {
      

      this.setState({pet: {...this.state.pet, petType: petType, immunisations: lookups.immunisations.cat.map(shot => ({immunisation_id: shot.id, validity_id: '', effectiveDate: ''}))}})

    } else {

      this.setState({pet: {...this.state.pet, petType: petType, immunisations: []}})

    }
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
    const { pet: {name, petType, sex, breed, color, size, spayedNeutered, immunisations } } = this.state

    return (
      <Container className='mt-5' fluid={true}>
        <Row className='justify-content-center'>
        <Col className='col-9 text-center center-block'>
        <Form onSubmit={this.handleSubmit}>
        <h1 className='text-center'>New Pet</h1>
        {errors.map((error, i)=> <p key={`error${i}`} style={{color: 'red'}}>{error}</p>)}
        <Row>
          <Col className='col-sm-6 text-center my-auto'>
            <FieldInput 
              inputType='text' 
              field='name' 
              label='Name' 
              tabIndex={1} 
              labelSize={2}
              inputSize={10}
              value={name} 
              handleChange={this.handleChange} 
            />

            {petType === ''  || parseInt(petType, 10) === lookups.petTypes.find(petType => petType.name === 'Dog').id ?
              <SelectInput 
                field='breed' 
                label='Breed' 
                tabIndex={4} 
                labelSize={2}
                selectSize={10}
                value={breed} 
                handleChange={this.handleChange} 
                options={lookups.breeds} 
              />
            :
              <SelectInput 
                field='color' 
                label='Color' 
                tabIndex={4} 
                labelSize={2}
                selectSize={10}
                value={color} 
                handleChange={this.handleChange} 
                options={lookups.colors} 
              />
            }
          </Col>
          <Col className='col-sm-6 text-center my-auto'>    
            <Row>
              <Col>
                <SelectInput 
                  field='petType' 
                  label='Pet Type' 
                  tabIndex={2} 
                  labelSize={4}
                  selectSize={7}
                  value={petType} 
                  handleChange={this.handleChange} 
                  options={lookups.petTypes} 
                />
              </Col>
              <Col>
                <SelectInput 
                  field='sex' 
                  label='Sex' 
                  tabIndex={3} 
                  labelSize={5}
                  selectSize={7}
                  value={sex} 
                  handleChange={this.handleChange} 
                  options={lookups.sexes} 
                />
              </Col>
            </Row>
            <SelectInput 
              field='size' 
              label='Size' 
              tabIndex={5} 
              labelSize={2}
              selectSize={10}
              value={size} 
              handleChange={this.handleChange} 
              options={lookups.sizes} 
            />
          </Col>
        </Row>
        <Form.Group className='form-control-lg text-center'>
          <Form.Check
            name="spayedNeutered"
            label="Tick if the pet has been spayed or neutered"
            onChange={(e) => this.handleChange('spayedNeutered', e.target.checked)}
            checked={spayedNeutered}
            id="spayedNeutered"
            tabIndex={6}
          />
        </Form.Group>
        
        {immunisations.length > 0 && <><hr/><h3 className='text-center'>Immunisations</h3></>}
          {immunisations.map((shot, index) => (
            <Row key={`shot${index}`}>
            <Col>
            <SelectInput
              disabled={true}
              field={`immunisation-${index}`}
              label=''
              tabIndex={7}
              labelSize={0}
              selectSize={10}
              value={shot.immunisation_id} 
              options={(parseInt(petType,10) === lookups.petTypes.find(petType => petType.name === 'Dog').id) ? lookups.immunisations.dog : lookups.immunisations.cat} 
            />
            </Col>
            <Col>
            <SelectInput
              field='validity_id'
              label='Validity'
              index={index}
              tabIndex={7}
              labelSize={5}
              selectSize={7}
              value={shot.validity_id} 
              options={lookups.validity} 
              handleChange={this.handleImmunisationChange} 
            />
            </Col>
            <Col className='col-4'>
            <FieldInput 
              inputType='date' 
              field='effectiveDate' 
              label='Effective Date'
              index={index} 
              tabIndex={1} 
              labelSize={5}
              inputSize={7}
              value={shot.effectiveDate} 
              handleChange={this.handleImmunisationChange} 
            />
            </Col>
            <Col className='col-4'>
            <FieldInput 
              inputType='date' 
              field='expiryDate' 
              label='Expiry Date' 
              index={index}
              tabIndex={1} 
              labelSize={5}
              inputSize={7}
              value={shot.effectiveDate === '' ? '' : moment(shot.effectiveDate).add({years: 1, days: -1}).format('YYYY-MM-DD')} 
              disabled={true}
            />
            </Col>
            </Row>
          ))}



        <div className='text-center'>
          <Button variant='secondary' type='submit'>Submit</Button>
        </div>
        </Form>
        </Col>
        </Row>
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