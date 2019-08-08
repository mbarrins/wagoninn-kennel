import React from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TextInput = ({ inputType, field, label, tabIndex, value, handleChange, labelSize, inputSize, index, disabled}) => {
  return (
    <Form.Group as={Row}>
      <Form.Label column xs={labelSize} htmlFor={field}>{label}</Form.Label>
      <Col xs={inputSize}>
        <Form.Control 
          type={inputType}
          id={field} 
          name={field}
          required={true} 
          value={value} 
          onChange={(e) => handleChange(field, e.target.value, index)} 
          tabIndex={tabIndex}
          disabled={disabled}
        />
      </Col>
    </Form.Group>
  )
}

export default TextInput;