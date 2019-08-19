import React from 'react'
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import SelectInput from '../formComponents/SelectInput'
import { Link } from 'react-router-dom'
import moment from 'moment'

const BookingSummary = ({ id, check_in, check_in_time, check_out, check_out_time, owner_name, pens, status, pet_listing, all_pens, available_pens, type, updateBookingStatus, updatePenNo, new_status }) => {

  const handleSubmit = e => {
    e.preventDefault();
    updateBookingStatus({ booking: { booking_status_id: new_status.id }, id })
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">
        <Row>
          <Col className='ml-3'>
            <Row>
              Owner: {owner_name}
            </Row>
            <Row>
              {status}
            </Row>
          </Col>
          <Col>
            <Row>
              Check in: {moment(check_in).format('MM/DD/YYYY')} {check_in_time}
            </Row>
            <Row>
              Check out: {moment(check_out).format('MM/DD/YYYY')} {check_out_time}
            </Row>
          </Col>
        </Row>
      </Popover.Title>
      <Popover.Content>
        <Form onSubmit={e => handleSubmit(e)}>
          {pens.map(pen => (
            <React.Fragment key={`booking_pen${pen.id}`}>
              <Row>
                <Col className='ml-3'>
                  {pen.pets_detail.map(pet => (
                    <Row key={`pen${pen.id}pet${pet.id}`}>
                      <Col>{pet.name}, {pet.breed ? pet.breed : pet.color} ({pet.size})</Col>
                    </Row>
                  ))}
                </Col>
                <Col>{pen.pet_type === 'Dog' &&
                  <Form.Group as={Row}>
                    <Form.Label column xs={5} htmlFor='pen_id'>Dog Run</Form.Label>
                    <Col xs={10}>
                      <Form.Control
                        as='select'
                        id='pen_id'
                        name='pen_id'
                        required={true}
                        value={pen.pen_id}
                        onChange={(e) => updatePenNo(parseInt(e.target.value, 10), pen.id)}
                        disabled={type === 'pickup'}
                      >
                        <option value="" disabled>Select</option>
                        {((pen.pen_id === '' || type === 'pickup') ? available_pens : [...available_pens, all_pens.find(dogPen => dogPen.id === pen.pen_id)]).map(option => <option key={`booking_pen-${pen.id}-pen_id-${option.id}`} value={option.id}>{option.name}</option>)}
                      </Form.Control>
                    </Col>
                  </Form.Group>}
                </Col>
              </Row>
              <hr />
            </React.Fragment>
          ))}
          <ButtonToolbar className='justify-content-center mt-3'>
            <Link to={`/bookings/${id}/edit`} >
              <Button variant='secondary' className='mr-3' >Edit Booking</Button>
            </Link>
            {moment(check_in).isSame(moment(), 'days') && type === 'dropoff' && status === 'Reservation' && < Button variant='outline-dark' className='ml-3' type='submit' >Check In</Button>}
            {moment(check_out).isSame(moment(), 'days') && type === 'pickup' && status === 'Active' && < Button variant='outline-dark' className='ml-3' type='submit' >Check Out</Button>}
          </ButtonToolbar>
        </Form>
      </Popover.Content>
    </Popover >
  );

  return (
    <OverlayTrigger trigger='click' placement='bottom' overlay={popover} >
      <h6>{((type === 'pickup' && status === 'Completed') || (type === 'dropoff' && status === 'Active')) ? <strike>{pet_listing}</strike> : pet_listing}</h6>
    </OverlayTrigger>
  )
}

export default BookingSummary;