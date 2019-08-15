import React from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FieldInput from '../formComponents/FieldInput'
import SelectInput from '../formComponents/SelectInput'
import { postPet, updatePet, clearPet, getPet, submitUpdatePet } from '../actions/petActions'
import moment from 'moment'

class PetForm extends React.Component {

  componentDidMount() {
    const ownerId = this.props.owner ? this.props.owner.id : undefined

    if (this.props.match.path === "/pets/:id/edit") {

      this.props.getPet(this.props.match.params.id)

    } else {
      
      this.props.clearPet();
      (ownerId) && this.handleChange('owner_id', ownerId)
    
    }
  }

  handleChange = (key, value) => {
    
    if (key === 'pet_type_id') {
      this.updateWithImmunisations(value);
    } else {
      this.props.updatePet({[key]: value})
    }
  }

  handleNestedChange = (key, value, index, section) => {
    const eff_date = key === 'effective_date' ? value : this.props.pet[section][index].effective_date
    const valid_id = key === 'validity_id' ? value : this.props.pet[section][index].validity_id

    if ((key === 'effective_date' || key === 'validity_id') && eff_date !== '' && valid_id !== '' && section === 'immunisations') {
        const valid_year = this.props.lookups.validity.find(validity => validity.id === parseInt(valid_id, 10)).code
        const expiry_date = moment(eff_date).add({years: valid_year, days: -1}).format('YYYY-MM-DD')

        this.props.updatePet({[section]: this.props.pet[section].map((item,i) => {
        
          return i === index ? {...item, [key]: value, expiry_date } : item
        })})
    } else {
      this.props.updatePet({[section]: this.props.pet[section].map((item,i) => i === index ? {...item, [key]: value} : item)})
    }
  }


  updateWithImmunisations = (pet_type_id) => {
    const { lookups } = this.props
    
    if (pet_type_id === '' || lookups.petTypes.length === 0) {

      this.props.updatePet({pet_type_id: pet_type_id, immunisations: []})
    
    } else if (parseInt(pet_type_id, 10) === lookups.petTypes.find(pet_type_id => pet_type_id.name === 'Dog').id) {

      this.props.updatePet({pet_type_id: pet_type_id, immunisations: lookups.immunisations.dog.map(shot => ({immunisation_id: shot.id, validity_id: '', effective_date: '', expiry_date: ''}))})
    
    } else if (parseInt(pet_type_id, 10) === lookups.petTypes.find(pet_type_id => pet_type_id.name === 'Cat').id) {
      

      this.props.updatePet({pet_type_id: pet_type_id, immunisations: lookups.immunisations.cat.map(shot => ({immunisation_id: shot.id, validity_id: '', effective_date: '', expiry_date: ''}))})

    } else {

      this.props.updatePet({pet_type_id: pet_type_id, immunisations: []})

    }
  }

  addItem = e => {
    switch (e.target.id) {
      case 'foods':

        return this.props.updatePet({foods: [...this.props.pet.foods, {food_id: '', quantity: '', measure_id: '', schedule_id: ''}]})
        
      case 'health_details':
            
        return this.props.updatePet({health_details: [...this.props.pet.health_details, {health_detail_id: '', inactive: false}]})

      case 'special_needs':
          
        return this.props.updatePet({special_needs: [...this.props.pet.special_needs, {special_need_id: '', inactive: false}]})

      case 'medications':

          return this.props.updatePet({medications: [...this.props.pet.medications, {medication_id: '', dose_quantity: '', dose_id: '', schedule_id: ''}]})

      case 'sociabilities':

          return this.props.updatePet({sociabilities: [...this.props.pet.sociabilities, {sociability_id: '', inactive: false}]})
          
      case 'issues':

          return this.props.updatePet({issues: [...this.props.pet.issues, {issue_id: '', inactive: false}]})
              
      default:
        
        return ''
    }
  }

  removeItem = (section, index) => {

    this.props.updatePet({[section]: this.props.pet[section].filter((item,i) => i !== index)})

  }


  handleSubmit = (e) => {
    e.preventDefault();

    const { pet } = this.props

    if (this.props.match.path === "/pets/:id/edit") {

      this.props.submitUpdatePet({ pet, id: pet.id })
        .then(data => this.props.history.push(`/owners/${data.payload.pet.owner_id}`))
        .then(() => this.props.clearPet())

    } else {

    this.props.postPet(pet)
      .then(data => this.props.history.push(`/owners/${data.payload.pet.owner_id}`))
      .then(() => this.props.clearPet())
    }
  }

  render() {
    const { lookups, lookups: {errors}, pet: {id, name, pet_type_id, dob, sex_id, breed_id, color_id, size_id, spayed_neutered, immunisations, 
      foods, health_details, special_needs, medications, sociabilities, issues } } = this.props
      
    return (
      <Container className='mt-5' fluid={true}>
        <Row className='justify-content-center'>
        <Col className='col-9 text-center center-block'>
        <Form onSubmit={this.handleSubmit}>
        <h1 className='text-center'>{id === '' ? 'New Pet' : 'Edit Pet'}</h1>
        {errors.map((error, i)=> <p key={`error${i}`} style={{color: 'red'}}>{error}</p>)}
        <Row>
          <Col className='col-sm-6 text-center my-auto'>
            <FieldInput 
              inputType='text' 
              field='name' 
              label='Name' 
              labelSize={2}
              inputSize={10}
              value={name} 
              handleChange={this.handleChange} 
            />
          </Col>
          <Col className='col-sm-3 text-center my-auto'>
            <SelectInput 
              field='pet_type_id' 
              label='Pet Type' 
              labelSize={5}
              selectSize={7}
              value={pet_type_id} 
              handleChange={this.handleChange} 
              options={lookups.petTypes} 
              disabled={id === '' ? false : true}
            />
          </Col>
          <Col className='col-sm-3 text-center my-auto'>
            <SelectInput 
              field='sex_id' 
              label='Sex' 
              labelSize={4}
              selectSize={7}
              value={sex_id} 
              handleChange={this.handleChange} 
              options={lookups.sexes} 
            />
          </Col>
        </Row>
        <Row>
          <Col className='col-sm-4 text-center my-auto'>
            {pet_type_id === ''  || parseInt(pet_type_id, 10) === lookups.petTypes.find(pet_type_id => pet_type_id.name === 'Dog').id ?
              <SelectInput 
                field='breed_id' 
                label='Breed' 
                labelSize={2}
                selectSize={10}
                value={breed_id} 
                handleChange={this.handleChange} 
                options={lookups.breeds} 
              />
            :
              <SelectInput 
                field='color_id' 
                label='Color' 
                labelSize={2}
                selectSize={10}
                value={color_id} 
                handleChange={this.handleChange} 
                options={lookups.colors} 
              />
            }
          </Col>
          <Col className='col-sm-3 text-center my-auto'> 
            <SelectInput 
              field='size_id' 
              label='Size' 
              labelSize={2}
              selectSize={10}
              value={size_id} 
              handleChange={this.handleChange} 
              options={lookups.sizes} 
            />
          </Col>
          <Col className='col-sm-5 text-center my-auto'> 
            <Row>
              <Col xs={8} >
                <FieldInput 
                inputType='date' 
                field='dob' 
                label='DOB' 
                labelSize={2}
                inputSize={9}
                value={dob} 
                handleChange={this.handleChange} 
                />
              </Col>
              <Col xs={4} >
                <FieldInput 
                inputType='text' 
                field='age' 
                label='Age' 
                labelSize={2}
                inputSize={8}
                value={dob === '' ? '' : moment().diff(dob, 'years')} 
                handleChange={this.handleChange} 
                disabled={true}
                />
              </Col>
            </Row>
          </Col>
        </Row>
          
        <Form.Group className='form-control-lg text-center'>
          <Form.Check
            name="spayed_neutered"
            label="Tick if the pet has been spayed or neutered"
            onChange={(e) => this.handleChange('spayed_neutered', e.target.checked)}
            checked={spayed_neutered}
            id="spayed_neutered"
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
                  labelSize={0}
                  selectSize={10}
                  value={shot.immunisation_id} 
                  section='immunisations'
                  options={(parseInt(pet_type_id,10) === lookups.petTypes.find(pet_type_id => pet_type_id.name === 'Dog').id) ? lookups.immunisations.dog : lookups.immunisations.cat} 
                />
              </Col>
              <Col>
                <SelectInput
                  field='validity_id'
                  label='Validity'
                  index={index}
                  labelSize={5}
                  selectSize={7}
                  value={shot.validity_id} 
                  options={lookups.validity} 
                  section='immunisations'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <Col className='col-4'>
                <FieldInput 
                  inputType='date' 
                  field='effective_date' 
                  label='Effective Date'
                  index={index} 
                  labelSize={5}
                  inputSize={7}
                  value={shot.effective_date} 
                  section='immunisations'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <Col className='col-4'>
                <FieldInput 
                  inputType='date' 
                  field='expiry_date' 
                  label='Expiry Date' 
                  index={index}
                  labelSize={5}
                  inputSize={7}
                  section='immunisations'
                  value={shot.expiry_date} 
                  disabled={true}
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              {/* Button to show Update when immunisation expired */}
              {/* <div className='text-center'>
                <Button variant='outline-dark' onClick={this.removeItem}>delete</Button>
              </div> */}
            </Row>
          ))}

          <hr />
          

        {foods.length > 0 ?
          <Row className='mb-3'>
            <Col></Col>
            <Col className='align-center'>
              <h3 className='text-center'>Food Requirements</h3>
            </Col>
            <Col>
              <div className='text-center'>
                <Button variant='lg link light' id='foods' onClick={this.addItem} >+ Add Another Pet Food</Button>
              </div>
            </Col>
            <Col></Col>
          </Row>
        :
          <div className='text-center'>
            <Button variant='lg link light' id='foods' onClick={this.addItem} >+ Add Pet Food</Button>
          </div>
        }
          {foods.map((food, index) => (
            <Row key={`food${index}`}>
              <Col>
              <SelectInput
                  field='food_id'
                  label='Food'
                  index={index}
                  labelSize={5}
                  selectSize={7}
                  value={food.food_id} 
                  options={lookups.foods} 
                  section='foods'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <Col>
                <FieldInput
                  type='number'
                  field='quantity'
                  label='Quantity'
                  index={index}
                  labelSize={5}
                  selectSize={7}
                  value={food.quantity} 
                  section='foods'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <Col>
              <SelectInput
                  field='measure_id'
                  label='Measure'
                  index={index}
                  labelSize={5}
                  selectSize={7}
                  value={food.measure_id} 
                  options={lookups.measures} 
                  section='foods'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <Col>
              <SelectInput
                  field='schedule_id'
                  label='Schedule'
                  index={index}
                  labelSize={5}
                  selectSize={7}
                  value={food.schedule_id} 
                  options={lookups.schedules} 
                  section='foods'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <div className='text-center'>
                <Button variant='outline-dark' onClick={e => this.removeItem('foods', index)} >delete</Button>
              </div>
            </Row>
          ))}

          <hr />
        
        {health_details.length > 0 ?
          <Row className='mb-3'>
            <Col></Col>
            <Col className='align-center'>
              <h3 className='text-center'>Health Details</h3>
            </Col>
            <Col>
              <div className='text-center'>
              <Button variant='lg link light' id='health_details' onClick={this.addItem} >+ Add More Health Details</Button>
              </div>
            </Col>
            <Col></Col>
         </Row>
        :
          <div className='text-center'>
            <Button variant='lg link light' id='health_details' onClick={this.addItem} >+ Add Health Details</Button>
          </div>
        }

        {health_details.map((health_detail, index) => (
          <Row key={`health_detail${index}`}>
            <Col className='col-5'>
            <SelectInput
                field='health_detail_id'
                label=''
                index={index}
                labelSize={0}
                selectSize={10}
                value={health_detail.health_detail_id} 
                options={lookups.healthDetails} 
                section='health_details'
                handleChange={this.handleNestedChange} 
              />
            </Col>
            <Col>
              <div className='text-center'>
                <Button variant='outline-dark' data-toggle='button' active={!health_detail.inactive} onClick={e => this.handleNestedChange('inactive', !health_detail.inactive, index, 'health_details')} >{health_detail.inactive ? 'Inactive' : 'Active'}</Button>
              </div>
            </Col>
            <Col>
              <FieldInput 
                inputType='text'
                diabled={true} 
                field='alert' 
                label=''
                index={index} 
                labelSize={2}
                inputSize={10}
                value={health_detail.health_detail_id === '' ? '' : lookups.healthDetails.find(need => need.id === parseInt(health_detail.health_detail_id, 10)).alert}
                handleChange={e => e}
                section='health_details'
              />
            </Col>
            <div className='text-center'>
              <Button variant='outline-dark' onClick={e => this.removeItem('health_details', index)} >delete</Button>
            </div>
          </Row>
        ))}

        <hr />
        
        {special_needs.length > 0 ?
          <Row className='mb-3'>
            <Col></Col>
            <Col className='align-center'>
              <h3 className='text-center'>Special Needs</h3>
            </Col>
            <Col>
              <div className='text-center'>
              <Button variant='lg link light' id='special_needs' onClick={this.addItem} >+ Add More Special Needs</Button>
              </div>
            </Col>
            <Col></Col>
         </Row>
        :
          <div className='text-center'>
            <Button variant='lg link light' id='special_needs' onClick={this.addItem} >+ Add Special Needs</Button>
          </div>
        }

        {special_needs.map((special_need, index) => (
          < React.Fragment key={`special_need${index}`} >
          <Row>
            <Col className='col-5'>
              <SelectInput
                field='special_need_id'
                label=''
                index={index}
                labelSize={0}
                selectSize={10}
                value={special_need.special_need_id} 
                options={lookups.specialNeeds} 
                section='special_needs'
                handleChange={this.handleNestedChange} 
              />
            </Col>
            <Col>
              <div className='text-center'>
                <Button variant='outline-dark' data-toggle='button' active={!special_need.inactive} onClick={e => this.handleNestedChange('inactive', !special_need.inactive, index, 'special_needs')} >{special_need.inactive ? 'Inactive' : 'Active'}</Button>
              </div>
            </Col>
            <Col>
              <FieldInput 
                inputType='text'
                diabled={true} 
                field='alert' 
                label=''
                index={index} 
                labelSize={2}
                inputSize={10}
                value={special_need.special_need_id === '' ? '' : lookups.specialNeeds.find(need => need.id === parseInt(special_need.special_need_id, 10)).alert}
                handleChange={e => e}
                section='special_needs'
              />
            </Col>
            <div className='text-center'>
              <Button variant='outline-dark' onClick={e => this.removeItem('special_needs', index)} >delete</Button>
            </div>
          </Row>
            <Row>
              <Col>
                <FieldInput 
                  inputType='text'
                  diabled={true} 
                  field='action_needed' 
                  label='Action needed'
                  index={index} 
                  labelSize={2}
                  inputSize={10}
                  value={special_need.special_need_id === '' ? '' : lookups.specialNeeds.find(need => need.id === parseInt(special_need.special_need_id, 10)).action_needed}
                  handleChange={e => e}
                  section='special_needs'
                />
              </Col>
            </Row>
          </ React.Fragment>
        ))}

        <hr />
        
        {medications.length > 0 ?
          <Row className='mb-3'>
            <Col></Col>
            <Col className='align-center'>
              <h3 className='text-center'>Medication</h3>
            </Col>
            <Col>
              <div className='text-center'>
                <Button variant='lg link light' id='medications' onClick={this.addItem} >+ Add More Medications</Button>
              </div>
            </Col>
            <Col></Col>
         </Row>
        :
          <div className='text-center'>
            <Button variant='lg link light' id='medications' onClick={this.addItem} >+ Add Medication</Button>
          </div>
        }

        {medications.map((medication, index) => (
          <Row key={`medication${index}`}>
            <Col>
            <SelectInput
                field='medication_id'
                label=''
                index={index}
                labelSize={0}
                selectSize={10}
                value={medication.medication_id} 
                options={lookups.medications} 
                section='medications'
                handleChange={this.handleNestedChange} 
              />
            </Col>
            <Col>
              <FieldInput
                type='number'
                field='dose_quantity'
                label='Quantity'
                index={index}
                labelSize={5}
                selectSize={7}
                value={medication.dose_quantity} 
                section='medications'
                handleChange={this.handleNestedChange} 
              />
            </Col>
            <Col>
            <SelectInput
                field='dose_id'
                label='Dose'
                index={index}
                labelSize={5}
                selectSize={7}
                value={medication.dose_id} 
                options={lookups.doses} 
                section='medications'
                handleChange={this.handleNestedChange} 
              />
            </Col>
            <Col>
            <SelectInput
                field='schedule_id'
                label='Schedule'
                index={index}
                labelSize={5}
                selectSize={7}
                value={medication.schedule_id} 
                options={lookups.schedules} 
                section='medications'
                handleChange={this.handleNestedChange} 
              />
            </Col>
            <div className='text-center'>
              <Button variant='outline-dark' onClick={e => this.removeItem('medications', index)} >delete</Button>
            </div>
          </Row>
        ))}

        <hr />

          {sociabilities.length > 0 ?
          <Row className='mb-3'>
            <Col></Col>
            <Col className='align-center'>
              <h3 className='text-center'>Sociability</h3>
            </Col>
            <Col>
              <div className='text-center'>
              <Button variant='lg link light' id='sociabilities' onClick={this.addItem} >+ Add More Sociability Notes</Button>
              </div>
            </Col>
            <Col></Col>
         </Row>
        :
          <div className='text-center'>
            <Button variant='lg link light' id='sociabilities' onClick={this.addItem} >+ Add Sociability</Button>
          </div>
        }

        {sociabilities.map((sociability, index) => (
          <Row key={`sociability${index}`}>
            <Col className='col-5'>
            <SelectInput
                field='sociability_id'
                label=''
                index={index}
                labelSize={0}
                selectSize={10}
                value={sociability.sociability_id} 
                options={lookups.sociabilities} 
                section='sociabilities'
                handleChange={this.handleNestedChange} 
              />
            </Col>
            <Col>
              <div className='text-center'>
                <Button variant='outline-dark' data-toggle='button' active={!sociability.inactive} onClick={e => this.handleNestedChange('inactive', !sociability.inactive, index, 'sociabilities')} >{sociability.inactive ? 'Inactive' : 'Active'}</Button>
              </div>
            </Col>
            <Col>
              <FieldInput 
                inputType='text'
                diabled={true} 
                field='alert' 
                label=''
                index={index} 
                labelSize={2}
                inputSize={10}
                value={sociability.sociability_id === '' ? '' : lookups.sociabilities.find(need => need.id === parseInt(sociability.sociability_id, 10)).alert}
                handleChange={e => e}
                section='sociabilities'
              />
            </Col>
            <div className='text-center'>
              <Button variant='outline-dark' onClick={e => this.removeItem('sociabilities', index)} >delete</Button>
            </div>
          </Row>
        ))}

        <hr />

        {issues.length > 0 ?
          <Row className='mb-3'>
            <Col></Col>
            <Col className='align-center'>
              <h3 className='text-center'>Issues</h3>
            </Col>
            <Col>
              <div className='text-center'>
              <Button variant='lg link light' id='issues' onClick={this.addItem} >+ Add Issue</Button>
              </div>
            </Col>
            <Col></Col>
         </Row>
        :
          <div className='text-center'>
            <Button variant='lg link light' id='issues' onClick={this.addItem} >+ Add Issue</Button>
          </div>
        }
        
        {issues.map((issue, index) => (
          <Row key={`issue${index}`}>
            <Col className='col-5'>
            <SelectInput
                field='issue_id'
                label=''
                index={index}
                labelSize={0}
                selectSize={10}
                value={issue.issue_id} 
                options={lookups.issues} 
                section='issues'
                handleChange={this.handleNestedChange} 
              />
            </Col>
            <Col>
              <div className='text-center'>
                <Button variant='outline-dark' data-toggle='button' active={!issue.inactive} onClick={e => this.handleNestedChange('inactive', !issue.inactive, index, 'issues')} >{issue.inactive ? 'Inactive' : 'Active'}</Button>
              </div>
            </Col>
            <Col>
              <FieldInput 
                inputType='text'
                diabled={true} 
                field='alert' 
                label=''
                index={index} 
                labelSize={2}
                inputSize={10}
                value={issue.issue_id === '' ? '' : lookups.issues.find(need => need.id === parseInt(issue.issue_id, 10)).alert}
                handleChange={e => e}
                section='issues'
              />
            </Col>
            <div className='text-center'>
              <Button variant='outline-dark' onClick={e => this.removeItem('issues', index)} >delete</Button>
            </div>
          </Row>
        ))}

        <hr />

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
    lookups: state.lookups,
    pet: state.pet,
    owner: state.owner
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    postPet: props => dispatch(postPet(props)),
    updatePet: props => dispatch(updatePet(props)),
    submitUpdatePet: props => dispatch(submitUpdatePet(props)),
    getPet: props => dispatch(getPet(props)),
    clearPet: () => dispatch(clearPet())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PetForm);