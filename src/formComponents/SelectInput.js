import React from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SelectInput = ({ field, label, tabIndex, labelSize, selectSize, value, options, handleChange, disabled, index, section }) => {
  return (
    <Form.Group as={Row}>
      <Form.Label column xs={labelSize} htmlFor={field}>{label}</Form.Label>
      <Col xs={selectSize}>
        <Form.Control 
          as='select' 
          id={field} 
          name={field} 
          required={true} 
          value={value}
          onChange={(e) => handleChange(field, e.target.value, index, section)} 
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