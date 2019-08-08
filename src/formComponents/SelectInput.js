import React from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SelectInput = ({ field, label, tabIndex, value, handleChange, options, labelSize, selectSize, disabled }) => {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm={labelSize} htmlFor={field}>{label}</Form.Label>
      <Col sm={selectSize}>
        <Form.Control 
          as='select' 
          id={field} 
          name={field} 
          required={true} 
          value={value}
          onChange={(e) => handleChange(field, e.target.value)} 
          tabIndex={tabIndex}
          disabled={disabled}
        >
        <option value="" disabled>Select</option>
        {options.map(option => <option key={`${field}-${option.id}`} value={option.id}>{option.name}</option>)}
        </Form.Control>
      </Col>
    </Form.Group>
  )
}

export default SelectInput;