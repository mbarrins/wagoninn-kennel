import React from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FieldInput from '../formComponents/FieldInput'
import SelectInput from '../formComponents/SelectInput'
import FieldInputSelect from '../formComponents/FieldInputSelect'
import moment from 'moment'

class BookingForm extends React.Component {
  state = {
    booking: {
      owner_id: '',
      check_in: '',
      check_in_time: '',
      check_out: '',
      check_out_time: '',
      booking_status_id: 1, 
      booking_ref: '',
      booking_pens: []
    }
  }

  componentDidMount() {
    const ownerId = this.props.location.ownerId
    if (ownerId) return this.handleChange('owner_id', ownerId)
  }

  handleChange = (key, value) => {
    
    this.setState({booking: {...this.state.booking, [key]: value}})
  
  }

  handleNestedChange = (key, value, index, section) => {

    this.setState({booking: {...this.state.booking, [section]: this.state.booking[section].map((item,i) => i === index ? {...item, [key]: value} : item)}})
  }

  addItem = e => {
    switch (e.target.id) {
      case 'booking_pens':

        return this.setState({booking: {...this.state.booking, booking_pens: [...this.state.booking.booking_pens, {booking_id: '', pen_type_id: '', pet_id: '', rate_id: ''}]}})
        
      case 'health_details':
            
        return this.setState({booking: {...this.state.booking, health_details: [...this.state.booking.health_details, {health_detail_id: '', effective_from: '', effective_to: ''}]}})

      case 'special_needs':
          
        return this.setState({booking: {...this.state.booking, special_needs: [...this.state.booking.special_needs, {special_need_id: '', effective_from: '', effective_to: ''}]}})

      case 'medications':

          return this.setState({booking: {...this.state.booking, medications: [...this.state.booking.medications, {medication_id: '', quantity: 0, dose_id: '', schedule_id: ''}]}})

      case 'sociabilities':

          return this.setState({booking: {...this.state.booking, sociabilities: [...this.state.booking.sociabilities, {sociability_id: '', inactive: false}]}})
          
      case 'issues':

          return this.setState({booking: {...this.state.booking, issues: [...this.state.booking.issues, {issue_id: '', inactive: false}]}})
              
      default:
        
        return ''
    }
  }

  removeItem = (section, index) => {

    this.setState({booking: {...this.state.booking, [section]: this.state.booking[section].filter((item,i) => i !== index)}})

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
    const { lookups, lookups: {errors}} = this.props
    const { booking: {booking_ref, check_in, check_in_time, check_out, check_out_time, booking_status_id, booking_pens } } = this.state
      
    return (
      <Container className='mt-5' fluid={true}>
        <Row className='justify-content-center'>
        <Col className='col-9 text-center center-block'>
        <Form onSubmit={this.handleSubmit}>
        <h1 className='text-center'>New Booking</h1>
        {errors.map((error, i)=> <p key={`error${i}`} style={{color: 'red'}}>{error}</p>)}
        <Row className='mt-3'>
          <Col className='col-sm-6 text-center my-auto'>
            <FieldInputSelect
              inputType='date' 
              field='check_in' 
              label='Check-In Date'
              tabIndex={3} 
              labelSize={3}
              inputSize={9}
              value={check_in} 
              handleChange={this.handleChange}
              selectField='check_in_time'
              selectValue={check_in_time}
              options={['AM','PM']}
            />
          </Col>
          <Col className='col-sm-6 text-center my-auto'>
            <FieldInputSelect
              inputType='date' 
              field='check_out' 
              label='Check-Out Date'
              tabIndex={3} 
              labelSize={3}
              inputSize={9}
              value={check_in} 
              handleChange={this.handleChange}
              selectField='check_out_time'
              selectValue={check_out_time}
              options={['AM','PM']}
            />
          </Col>
        </Row>

        {booking_pens.length > 0 && <><h3 className='text-center'>{booking_pens.length === 1 ? 'Pen Required' : 'Pens Required'}</h3></>}
          {booking_pens.map((pen, index) => (
            <Row key={`pen${index}`}>
              <Col>
              <SelectInput
                  field='pen_type_id'
                  label='pen_type'
                  index={index}
                  tabIndex={7}
                  labelSize={5}
                  selectSize={7}
                  value={pen.pen_type_id} 
                  options={lookups.penTypes} 
                  section='booking_pens'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <Col>
                <FieldInput
                  type='number'
                  field='quantity'
                  label='Quantity'
                  index={index}
                  tabIndex={7}
                  labelSize={5}
                  selectSize={7}
                  value={pen.quantity} 
                  section='booking_pens'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <Col>
              <SelectInput
                  field='measure_id'
                  label='Measure'
                  index={index}
                  tabIndex={7}
                  labelSize={5}
                  selectSize={7}
                  value={pen.measure_id} 
                  options={lookups.measures} 
                  section='booking_pens'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <Col>
              <SelectInput
                  field='schedule_id'
                  label='Schedule'
                  index={index}
                  tabIndex={7}
                  labelSize={5}
                  selectSize={7}
                  value={pen.schedule_id} 
                  options={lookups.schedules} 
                  section='booking_pens'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <div className='text-center'>
                <Button variant='outline-dark' onClick={e => this.removeItem('booking_pens', index)} >delete</Button>
              </div>
            </Row>
          ))}

          <div className='text-center'>
            <Button variant='lg link light' id='booking_pens' onClick={this.addItem} >+ Add Pen</Button>
          </div>

          <hr />

            {/* {petType === ''  || parseInt(petType, 10) === lookups.petTypes.find(petType => petType.name === 'Dog').id ?
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
                  section='immunisations'
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
                  section='immunisations'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <Col className='col-4'>
                <FieldInput 
                  inputType='date' 
                  field='effectiveDate' 
                  label='Effective Date'
                  index={index} 
                  tabIndex={7} 
                  labelSize={5}
                  inputSize={7}
                  value={shot.effectiveDate} 
                  section='immunisations'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <Col className='col-4'>
                <FieldInput 
                  inputType='date' 
                  field='expiryDate' 
                  label='Expiry Date' 
                  index={index}
                  tabIndex={7} 
                  labelSize={5}
                  inputSize={7}
                  section='immunisations'
                  value={(shot.effectiveDate === '' || shot.validity_id === '') ? '' : moment(shot.effectiveDate).add({years: lookups.validity.find(validity => validity.id === parseInt(shot.validity_id, 10)).code, days: -1}).format('YYYY-MM-DD')} 
                  disabled={true}
                />
              </Col>
              <div className='text-center'>
                <Button variant='outline-dark' onClick={this.removeItem}>delete</Button>
              </div>
            </Row>
          ))}

          <hr />
        
        {foods.length > 0 && <><h3 className='text-center'>Food Requirements</h3></>}
          {foods.map((food, index) => (
            <Row key={`food${index}`}>
              <Col>
              <SelectInput
                  field='food_id'
                  label='Food'
                  index={index}
                  tabIndex={7}
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
                  tabIndex={7}
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
                  tabIndex={7}
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
                  tabIndex={7}
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

          <div className='text-center'>
            <Button variant='lg link light' id='foods' onClick={this.addItem} >+ Add Pet Food</Button>
          </div>

          <hr />
        
        {health_details.length > 0 && <><h3 className='text-center'>Health Details</h3></>}
          {health_details.map((health_detail, index) => (
            <Row key={`health_detail${index}`}>
              <Col className='col-5'>
              <SelectInput
                  field='health_detail_id'
                  label=''
                  index={index}
                  tabIndex={7}
                  labelSize={0}
                  selectSize={10}
                  value={health_detail.health_detail_id} 
                  options={lookups.healthDetails} 
                  section='health_details'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <Col className='col-3'>
                <FieldInput 
                  inputType='date' 
                  field='effective_from' 
                  label='Effective from'
                  index={index} 
                  tabIndex={7} 
                  labelSize={5}
                  inputSize={7}
                  value={health_detail.effective_from} 
                  section='health_details'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <Col className='col-3'>
                <FieldInput 
                  inputType='date' 
                  field='effective_to' 
                  label='Effective to'
                  index={index} 
                  tabIndex={7} 
                  labelSize={5}
                  inputSize={7}
                  value={health_detail.effective_to} 
                  section='health_details'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <div className='text-center'>
                <Button variant='outline-dark' onClick={e => this.removeItem('health_details', index)} >delete</Button>
              </div>
            </Row>
          ))}

          <div className='text-center'>
            <Button variant='lg link light' id='health_details' onClick={this.addItem} >+ Add Health Details</Button>
          </div>

          <hr />
        
        {special_needs.length > 0 && <><h3 className='text-center'>Special Needs</h3></>}
          {special_needs.map((special_need, index) => (
            < React.Fragment key={`special_need${index}`} >
            <Row>
              <Col className='col-5'>
                <SelectInput
                  field='special_need_id'
                  label=''
                  index={index}
                  tabIndex={7}
                  labelSize={0}
                  selectSize={10}
                  value={special_need.special_need_id} 
                  options={lookups.specialNeeds} 
                  section='special_needs'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <Col className='col-3'>
                <FieldInput 
                  inputType='date' 
                  field='effective_from' 
                  label='Effective from'
                  index={index} 
                  tabIndex={7} 
                  labelSize={5}
                  inputSize={7}
                  value={special_need.effective_from} 
                  section='special_needs'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <Col className='col-3'>
                <FieldInput 
                  inputType='date' 
                  field='effective_to' 
                  label='Effective to'
                  index={index} 
                  tabIndex={7} 
                  labelSize={5}
                  inputSize={7}
                  value={special_need.effective_to} 
                  section='special_needs'
                  handleChange={this.handleNestedChange} 
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
                  tabIndex={7} 
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

          <div className='text-center'>
            <Button variant='lg link light' id='special_needs' onClick={this.addItem} >+ Add Special Needs</Button>
          </div>

          <hr />
        
        {medications.length > 0 && <><h3 className='text-center'>Medication Requirements</h3></>}
          {medications.map((medication, index) => (
            <Row key={`medication${index}`}>
              <Col>
              <SelectInput
                  field='medication_id'
                  label=''
                  index={index}
                  tabIndex={7}
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
                  field='quantity'
                  label='Quantity'
                  index={index}
                  tabIndex={7}
                  labelSize={5}
                  selectSize={7}
                  value={medication.quantity} 
                  section='medications'
                  handleChange={this.handleNestedChange} 
                />
              </Col>
              <Col>
              <SelectInput
                  field='dose_id'
                  label='Dose'
                  index={index}
                  tabIndex={7}
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
                  tabIndex={7}
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

          <div className='text-center'>
            <Button variant='lg link light' id='medications' onClick={this.addItem} >+ Add Medication</Button>
          </div>

          <hr />

          {sociabilities.length > 0 && <><h3 className='text-center'>Sociability Details</h3></>}
          {sociabilities.map((sociability, index) => (
            <Row key={`sociability${index}`}>
              <Col className='col-5'>
              <SelectInput
                  field='sociability_id'
                  label=''
                  index={index}
                  tabIndex={7}
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
                  tabIndex={7} 
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

          <div className='text-center'>
            <Button variant='lg link light' id='sociabilities' onClick={this.addItem} >+ Add Sociability</Button>
          </div>

          <hr />

          {issues.length > 0 && <><h3 className='text-center'>Issues</h3></>}
          {issues.map((issue, index) => (
            <Row key={`issue${index}`}>
              <Col className='col-5'>
              <SelectInput
                  field='issue_id'
                  label=''
                  index={index}
                  tabIndex={7}
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
                  tabIndex={7} 
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

          <div className='text-center'>
            <Button variant='lg link light' id='issues' onClick={this.addItem} >+ Add Issue</Button>
          </div>

          <hr /> */}

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

export default connect(mapStateToProps)(BookingForm);