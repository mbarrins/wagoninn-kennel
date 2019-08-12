import React from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import SelectInput from '../formComponents/SelectInput'
import FieldInputSelect from '../formComponents/FieldInputSelect'
import { postBooking, updateBooking } from '../actions/bookingActions'
import { getAvailability } from '../actions/availabilityActions'
import moment from 'moment'

class BookingForm extends React.Component {

  componentDidMount() {
    const ownerId = this.props.location.ownerId
    if (ownerId) return this.handleChange('owner_id', ownerId)

    // this.props.getAvailability({dateFrom: '2019-08-01', dateTo: '2019-08-09'});
  }

  handleChange = (key, value) => {
    let { check_in, check_out } = this.props.booking
    key === 'check_in' && (check_in = value)
    key === 'check_out' && (check_out = value)

    if ((key === 'check_in' && check_out !== '' && value !=='') || (key === 'check_out' && check_in !== '' && value !=='')) {
      this.props.getAvailability({dateFrom: check_in, dateTo: check_out});
    }
    
    this.props.updateBooking({[key]: value})
  
  }

  handleNestedChange = (key, value, index, section) => {
    if (key === 'pen_type_id') {
      this.props.updateBooking({booking_pens: this.props.booking.booking_pens.map((pen,i) => {
        const { lookups } = this.props
        const rate_id = value && lookups.currentRates.find(rate => rate.pen_type_id === value && rate.no === pen.booking_pen_pets.length ).id

        if (i === index) {
          return {...pen, rate_id, [key]: value}
        } else {
          return pen
        }})})
    } else {
      this.props.updateBooking({[section]: this.props.booking[section].map((item,i) => i === index ? {...item, [key]: value} : item)})
    }
  }

  handlePetChange = (key, value, index, section, parentIndex) => {

    this.props.updateBooking({booking_pens: [...this.props.booking.booking_pens.map((pen,i)=> i === parentIndex ? {...pen, booking_pen_pets: [...pen.booking_pen_pets.map((pet,idx) => idx === index ? {...pet, [key]: value} : pet)]} : pen)]})
  }

  addItem = e => {
    switch (e.target.id) {
      case 'booking_pens':

        return this.props.updateBooking({booking_pens: [...this.props.booking.booking_pens, {booking_id: '', pen_type_id: '', rate_id: '', pen_id: '', booking_pen_pets: [{booking_pen_id: '', pet_id: '', special_needs_fee: false}]}]})
             
      case 'booking_pen_pets':
        const pen_index = e.target.name.slice(e.target.name.indexOf('[')+1, e.target.name.indexOf(']'))
        const { lookups } = this.props

        return this.props.updateBooking({booking_pens: [...this.props.booking.booking_pens.map((pen,i)=> {
          const rate_id = pen.pen_type_id && lookups.currentRates.find(rate => rate.pen_type_id === pen.pen_type_id && rate.no === (pen.booking_pen_pets.length+1) ).id

          if (i === parseInt(pen_index,10)) {
            return  {...pen, rate_id, booking_pen_pets: [...pen.booking_pen_pets, {booking_pen_id: '', pet_id: '', special_needs_fee: false}]}
          } else {
            return pen
          }
        })]})

      default:
        
        return ''
    }
  }

  removeItem = (section, index) => {

    this.props.updateBooking({[section]: this.props.booking[section].filter((item,i) => i !== index)})

  }


  handleSubmit = (e) => {
    e.preventDefault();

    this.props.postBooking(this.props.booking)
      .then(data => {
        console.log(data)
        return data
      })
      .then(data => this.props.history.push(`/owners/${data.payload.booking.owner_id}`))
  }

  weekly_availabliilty = () => {
    const availability = this.props.availability
    let days = availability.map(date => date.day_of_week)
    
    let prevSplit = 0
    let split = days.indexOf(6) + 1
    let weekly = []

    while (split !== 0 && availability.length >= split) {
      let week = availability.slice(prevSplit, split)
      
      while (week.length < 7) {
        week.unshift(false)
      }
      
      weekly.push(week)
      prevSplit = split
      split = days.indexOf(6, prevSplit) + 1

      if (split === 0 && availability.slice(prevSplit).length > 0) {
        weekly.push(availability.slice(prevSplit))
      }
    }
    
    return weekly
  }

  render() {
    const { lookups, lookups: {errors}, ownerPets, availability,
    booking: {booking_ref, check_in, check_in_time, check_out, check_out_time, booking_status_id, booking_pens }} = this.props
      
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
              value={check_out} 
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
              <React.Fragment key={`pen${index}`}>
              <hr />
              <Row >
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
                          <input 
                            type="hidden" 
                            id="rate_id" 
                            name="rate_id" 
                            value={pen.pen_type_id && lookups.currentRates.find(rate => rate.pen_type_id === parseInt(pen.pen_type_id) && rate.no === pen.booking_pen_pets.length ).id} 
                            onChange={e => this.handleNestedChange('rate_id', parseInt(e.target.value,10), index, 'booking_pens')}
                          />
                          <Col xs={4} className='text-center' ><h4>{pen.pen_type_id && '$' + parseFloat(lookups.currentRates.find(rate => rate.pen_type_id === parseInt(pen.pen_type_id) && rate.no === pen.booking_pen_pets.length ).amount)}</h4></Col>
                        </Row>
                      </Col>
                  </Row>
                  <Row>
                    <Col xs={3} className='text-center' >
                      <Button size='sm' variant='outline-dark' onClick={e => this.removeItem('booking_pens', index)} >Remove Pen</Button>
                    </Col>  
                    <Col xs={4} className='text-center' >
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
              </React.Fragment>
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
        <Row className='justify-content-center mt-5'>
          <Col className='col-9 text-center center-block'>
            
          {this.weekly_availabliilty().length > 0 && 
          <CardGroup>
              <Card>
                <Card.Header>Sunday</Card.Header>
              </Card>
              <Card>
                <Card.Header>Monday</Card.Header>
              </Card>
              <Card>
                <Card.Header>Tuesday</Card.Header>
              </Card>
              <Card>
                <Card.Header>Wednesday</Card.Header>
              </Card>
              <Card>
                <Card.Header>Thursday</Card.Header>
              </Card>
              <Card>
                <Card.Header>Friday</Card.Header>
              </Card>
              <Card>
                <Card.Header>Saturday</Card.Header>
              </Card>
            </CardGroup>
          }

          {this.weekly_availabliilty().map(week => (
            <CardGroup key={`week${week[0].date}${this.weekly_availabliilty().indexOf(week)}`}>
              <Card>
                <Card.Body>
                  <Card.Title>{week[0] && moment(week[0].date).format('DD-MMM')}</Card.Title>
                    {week[0] && week[0].pens.map(pen => (
                      <Row key={`pen${week.date}${pen.pen_type}`}>{pen.pen_type}: {pen.booked} ({pen.no_pets})</Row>
                    ))}
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                <Card.Title>{week[1] && moment(week[1].date).format('DD-MMM')}</Card.Title>
                    {week[1] && week[1].pens.map(pen => (
                      <Row key={`pen${week.date}${pen.pen_type}`}>{pen.pen_type}: {pen.booked} ({pen.no_pets})</Row>
                    ))}
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                <Card.Title>{week[2] && moment(week[2].date).format('DD-MMM')}</Card.Title>
                    {week[2] && week[2].pens.map(pen => (
                      <Row key={`pen${week.date}${pen.pen_type}`}>{pen.pen_type}: {pen.booked} ({pen.no_pets})</Row>
                    ))}
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                <Card.Title>{week[3] && moment(week[3].date).format('DD-MMM')}</Card.Title>
                    {week[3] && week[3].pens.map(pen => (
                      <Row key={`pen${week.date}${pen.pen_type}`}>{pen.pen_type}: {pen.booked} ({pen.no_pets})</Row>
                    ))}
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                <Card.Title>{week[4] && moment(week[4].date).format('DD-MMM')}</Card.Title>
                    {week[4] && week[4].pens.map(pen => (
                      <Row key={`pen${week.date}${pen.pen_type}`}>{pen.pen_type}: {pen.booked} ({pen.no_pets})</Row>
                    ))}
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                <Card.Title>{week[5] && moment(week[5].date).format('DD-MMM')}</Card.Title>
                    {week[5] && week[5].pens.map(pen => (
                      <Row key={`pen${week.date}${pen.pen_type}`}>{pen.pen_type}: {pen.booked} ({pen.no_pets})</Row>
                    ))}
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                <Card.Title>{week[6] && moment(week[6].date).format('DD-MMM')}</Card.Title>
                    {week[6] && week[6].pens.map(pen => (
                      <Row key={`pen${week.date}${pen.pen_type}`}>{pen.pen_type}: {pen.booked} ({pen.no_pets})</Row>
                    ))}
                </Card.Body>
              </Card>
            </CardGroup>
          ))}
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    lookups: state.lookups,
    ownerPets: state.owner.pets,
    booking: state.booking,
    availability: state.availability.availability
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    postBooking: props => dispatch(postBooking(props)),
    updateBooking: props => dispatch(updateBooking(props)),
    getAvailability: props => dispatch(getAvailability(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);