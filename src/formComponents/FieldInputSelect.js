import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const FieldInputSelect = ({ inputType, field, label, tabIndex, value, handleChange, labelSize, inputSize,
    selectField, selectValue, options}) => {
  return (
    <Form.Group as={Row}>
      <Form.Label column xs={labelSize} htmlFor={field}>{label}</Form.Label>
      <Col xs={inputSize}>
        <InputGroup>
          <Form.Control 
            type={inputType}
            id={field} 
            name={field}
            required={true} 
            value={value} 
            onChange={(e) => handleChange(field, e.target.value)} 
            tabIndex={tabIndex}
          />
          <Form.Control 
            as='select' 
            id={selectField} 
            name={selectField} 
            required={true} 
            value={selectValue}
            onChange={(e) => handleChange(selectField, e.target.value)} 
            tabIndex={tabIndex + 1}
            className='col-3'
          >
            <option value="" disabled>Select</option>
            {options && options.map(option => <option key={`${field}-${option.id}`} value={option.id}>{option.name}</option>)}
          </Form.Control>
        </InputGroup>
      </Col>
    </Form.Group>
  )
}

export default FieldInputSelect;