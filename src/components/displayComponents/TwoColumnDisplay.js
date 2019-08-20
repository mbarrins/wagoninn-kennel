import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TwoColumnDisplay = ({ col1Label, col1Detail, col2Label, col2Detail }) => {
  return (
    <Row className='mt-3'>
      <Col className='text-center my-auto'>
        <Row>
          <Col xs={4} className='text-right'><h6>{col1Label}</h6></Col>
          <Col xs={7} className='text-left' ><h6>{col1Detail}</h6></Col>
        </Row>
      </Col>
      <Col className='text-center my-auto'>
        <Row>
          <Col xs={5} className='text-right'><h6>{col2Label}</h6></Col>
          <Col xs={7} className='text-left' ><h6>{col2Detail}</h6></Col>
        </Row>
      </Col>
    </Row>
  )
}

export default TwoColumnDisplay;