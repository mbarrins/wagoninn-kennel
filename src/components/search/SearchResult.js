import React from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom'

const SearchResult = ({ owner }) => {
  return (
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
              <Col xs={6} className='text-left' >{owner.current_bookings.map(booking => <h6 key={`owner${owner.id}-${booking}`}>{booking}</h6>)}</Col>
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
  )
}

export default SearchResult;