import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const FieldInputSelect = ({ inputType, field, label, value, handleChange, labelSize, inputSize,
  selectField, selectValue, options, required = true, disabled = false }) => {
  return (
    <Form.Group as={Row}>
      <Form.Label column xs={labelSize} htmlFor={field}>{label}</Form.Label>
      <Col xs={inputSize}>
        <InputGroup>
          <Form.Control
            type={inputType}
            id={field}
            name={field}
            required={required}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            disabled={disabled}
          />
          <Form.Control
            as='select'
            id={selectField}
            name={selectField}
            required={required}
            value={selectValue}
            onChange={(e) => handleChange(selectField, (['AM', 'PM'].includes(e.target.value) ? e.target.value : parseInt(e.target.value, 10)))}
            className='col-3'
            disabled={disabled}
          >
            <option value="" disabled>Select</option>
            {options && options.map((option, index) => <option key={`${field}-${option.id || index}`} value={option.id || option}>{option.name || option}</option>)}
          </Form.Control>
        </InputGroup>
      </Col>
    </Form.Group>
  )
}

export default FieldInputSelect;