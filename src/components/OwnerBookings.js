import React from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import moment from 'moment'

const OwnerBookings = ({ bookings, pets, lookups, edit }) => {
  return (
    <Card.Body>
      {bookings.map(booking => (
        <Row key={`booking${booking.id}`} className='mt-3'>
          <Col>
            <Row >
              {edit &&
                <Col xs={4}>
                  <div className='text-center'>
                    <Link to={`/bookings/${booking.id}/edit`} >
                      <Button variant='outline-dark' >view/edit</Button>
                    </Link>
                  </div>
                </Col>}
              <Col className='text-center my-auto'>
                <Row>
                  <Col xs={5} className='text-right'><h6>Check In</h6></Col>
                  <Col xs={7} className='text-left' ><h6>{moment(booking.check_in).format('DD/MM/YYYY')}</h6></Col>
                </Row>
              </Col>
              <Col className='text-center my-auto'>
                <Row>
                  <Col xs={6} className='text-right'><h6>Check Out</h6></Col>
                  <Col xs={6} className='text-left' ><h6>{moment(booking.check_out).format('DD/MM/YYYY')}</h6></Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
    </Card.Body>
  )
}

export default OwnerBookings;