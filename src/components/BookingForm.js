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

  handleNestedChange = (key, value, index, section) => {

    this.setState({booking: {...this.state.booking, [section]: this.state.booking[section].map((item,i) => i === index ? {...item, [key]: value} : item)}})
  }

  handlePetChange = (key, value, index, section, parentIndex) => {

    this.setState({booking: {...this.state.booking, booking_pens: [...this.state.booking.booking_pens.map((pen,i)=> i === parentIndex ? {...pen, booking_pen_pets: [...pen.booking_pen_pets.map((pet,idx) => idx === index ? {...pet, [key]: value} : pet)]} : pen)]}})
  }

  addItem = e => {
    switch (e.target.id) {
      case 'booking_pens':

        return this.setState({booking: {...this.state.booking, booking_pens: [...this.state.booking.booking_pens, {booking_id: '', pen_type_id: '', rate_id: '', pen_id: '', booking_pen_pets: [{booking_pen_id: '', pet_id: '', special_needs_fee: false}]}]}})
             
      case 'booking_pen_pets':
        const pen_index = e.target.name.slice(e.target.name.indexOf('[')+1, e.target.name.indexOf(']'))

        return this.setState({booking: {...this.state.booking, booking_pens: [...this.state.booking.booking_pens.map((pen,i)=> i === parseInt(pen_index,10) ? {...pen, booking_pen_pets: [...pen.booking_pen_pets, {booking_pen_id: '', pet_id: '', special_needs_fee: false}]} : pen)]}})

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
    const { lookups, lookups: {errors}, ownerPets} = this.props
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

        <Row>
          <Col>
            {booking_pens.length > 0 && <><h3 className='text-center'>Pens Required</h3></>}
            {booking_pens.map((pen, index) => (
              <>
              <hr />
              <Row key={`pen${index}`}>
                <Col className='col-sm-7'>
                  <Row>
                    <Col xs={8}>
                    <SelectInput
                        field='pen_type_id'
                        label='Pen Type'
                        index={index}
                        tabIndex={7}
                        labelSize={4}
                        selectSize={8}
                        value={pen.pen_type_id} 
                        options={lookups.penTypes}
                        section='booking_pens'
                        handleChange={this.handleNestedChange} 
                      />
                      </Col>
                      <Col xs={4} className='text-center my-auto'>
                        <Row>
                          <Col xs={8} className='align-center'><h4>Rate</h4></Col>
                          <Col xs={4} className='text-center' ><h4>{pen.pen_type_id && '$' + parseFloat(lookups.currentRates.find(rate => rate.pen_type_id === parseInt(pen.pen_type_id) && rate.no === pen.booking_pen_pets.length ).amount)}</h4></Col>
                        </Row>
                      </Col>
                  </Row>
                  <Row>
                    <Col xs={3} className='text-center'>
                      <Button size='sm' variant='outline-dark' onClick={e => this.removeItem('booking_pens', index)} >Remove Pen</Button>
                    </Col>  
                    <Col xs={4} className='text-center'>
                      <Button size='sm' variant='outline-dark' id='booking_pen_pets' name={`booking_pens[${index}]booking_pen_pets`} onClick={this.addItem} >Add Pet to Pen</Button>
                    </Col>
                  </Row>
                </Col>

                <Col className='col-sm-5'>
                  {pen.booking_pen_pets.map((pet,i) => (
                    <React.Fragment key={`pet${i}`}>
                      <SelectInput
                      field='pet_id'
                      label='Pet'
                      parentIndex={index}
                      index={i}
                      tabIndex={7}
                      labelSize={3}
                      selectSize={7}
                      value={pet.pet_id} 
                      options={ownerPets}
                      section='booking_pen_pets'
                      handleChange={this.handlePetChange} 
                    />
                  </React.Fragment>
                  ))}
                    
                </Col>
                
              </Row>
              </>
              ))}
            </Col>
          </Row>

          <div className='text-center mt-5'>
            <Button variant='lg link light' id='booking_pens' onClick={this.addItem} >+ Add Pen</Button>
          </div>

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
    ownerPets: state.owner.pets
  }
}

export default connect(mapStateToProps)(BookingForm);