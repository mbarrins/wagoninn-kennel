import React from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TextInput = ({ field, label, tabIndex, value, handleChange }) => {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm='2' htmlFor={field}>{label}</Form.Label>
      <Col sm='10'>
        <Form.Control 
          type='text' 
          id={field} 
          name={field}
          required={true} 
          value={value} 
          onChange={(e) => handleChange(field, e.target.value)} 
          tabIndex={tabIndex}
        />
      </Col>
    </Form.Group>
  )
}

export default TextInput;