import React from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FieldInput from '../formComponents/FieldInput'
import FieldInputSelect from '../formComponents/FieldInputSelect'
import { postOwner } from '../actions/ownerActions'
import moment from 'moment'

class OwnerDisplay extends React.Component {
  state = {
    owner: {
      owner_id: '',
      first_name: '',
      last_name: '',
      email: '',
      primary_phone: '',
      primary_phone_type_id: '', 
      secondary_phone: '',
      secondary_phone_type_id: '', 
      address_line_1: '',
      address_line_2: '',
      address_line_3: '',
      city: '',
      state: '',
      zipcode: '',
      emergency_contact_name: '',
      emergency_contact_phone: '',
      partner_name: '',
      partner_phone: '',
      agreed_terms: false,
      agreed_date: '',
      notes: '',
      pets: [],
      concerns: []
    }
  }

  render() {
    const { lookups, lookups: {errors} } = this.props
    const { owner: {first_name,last_name, email, primary_phone, primary_phone_type_id, secondary_phone,
      secondary_phone_type_id, address_line_1, address_line_2, address_line_3, city, state, zipcode,
      partner_name, partner_phone, emergency_contact_name, emergency_contact_phone, agreed_terms, 
      agreed_date, notes } } = this.state
      
    return (
      <Container className='mt-5' fluid={true}>
        <Row className='justify-content-center'>
          <Col className='col-9 text-center center-block'>
            <Form onSubmit={this.handleSubmit}>
              <h1 className='text-center'>Owner Details</h1>
              <Row>
                <Col className='text-center my-auto'>
                  <FieldInput 
                    inputType='text' 
                    field='first_name' 
                    label='First Name' 
                    tabIndex={1} 
                    labelSize={3}
                    inputSize={9}
                    value={first_name} 
                    handleChange={this.handleChange} 
                  />
                </Col>
                <Col className='text-center my-auto'>    
                  <FieldInput 
                    inputType='text' 
                    field='last_name' 
                    label='Last Name' 
                    tabIndex={2} 
                    labelSize={3}
                    inputSize={9}
                    value={last_name} 
                    handleChange={this.handleChange} 
                  />
                </Col>
              </Row>

              <Row>
                <Col className='text-center my-auto'>    
                  <FieldInputSelect
                    inputType='text' 
                    field='primary_phone' 
                    label='Primary Phone' 
                    tabIndex={3} 
                    labelSize={3}
                    inputSize={9}
                    value={primary_phone} 
                    handleChange={this.handleChange}
                    selectField='primary_phone_type_id'
                    selectValue={primary_phone_type_id}
                    options={lookups.phoneTypes}
                  />
                </Col>
                <Col className='text-center my-auto'>    
                <FieldInputSelect
                    inputType='text' 
                    field='secondary_phone' 
                    label='Secondary Phone' 
                    tabIndex={5} 
                    labelSize={3}
                    inputSize={9}
                    value={secondary_phone} 
                    handleChange={this.handleChange}
                    selectField='secondary_phone_type_id'
                    selectValue={secondary_phone_type_id}
                    options={lookups.phoneTypes}
                  />
                </Col>
              </Row>

              <Row>
                <Col className='text-center my-auto'>
                  <FieldInput 
                    inputType='text' 
                    field='emergency_contact_name' 
                    label='Emergency Contact Name' 
                    tabIndex={10} 
                    labelSize={3}
                    inputSize={9}
                    value={emergency_contact_name} 
                    handleChange={this.handleChange} 
                  />
                </Col>
                <Col className='text-center my-auto'>    
                  <FieldInput 
                    inputType='text' 
                    field='emergency_contact_phone' 
                    label='Emergency Contact Phone' 
                    tabIndex={10} 
                    labelSize={3}
                    inputSize={9}
                    value={emergency_contact_phone} 
                    handleChange={this.handleChange} 
                  />
                </Col>
              </Row>

              <Row>
                <Col className='text-center my-auto'>    
                  <FieldInput 
                    inputType='text' 
                    field='email' 
                    label='Email' 
                    tabIndex={10} 
                    labelSize={3}
                    inputSize={9}
                    value={email} 
                    handleChange={this.handleChange} 
                  />
                </Col>
                <Col className='text-center my-auto'>    
                </Col>
              </Row>

              <Row>
                <Col className='text-center my-auto'>    
                  <FieldInput 
                    inputType='text' 
                    field='address_line_1' 
                    label='Address Line 1' 
                    tabIndex={10}
                    labelSize={3}
                    inputSize={9}
                    value={address_line_1} 
                    handleChange={this.handleChange} 
                  />
                </Col>
                <Col className='text-center my-auto'>    
                </Col>
              </Row>

              <Row>
                <Col className='text-center my-auto'>    
                  <FieldInput 
                    inputType='text' 
                    field='address_line_2' 
                    label='Address Line 2' 
                    tabIndex={10}
                    labelSize={3}
                    inputSize={9}
                    value={address_line_2} 
                    handleChange={this.handleChange} 
                  />
                </Col>
                <Col className='text-center my-auto'>    
                </Col>
              </Row>

              <Row>
                <Col className='text-center my-auto'>    
                  <FieldInput 
                    inputType='text' 
                    field='address_line_3' 
                    label='Address Line 3' 
                    tabIndex={10} 
                    labelSize={3}
                    inputSize={9}
                    value={address_line_3} 
                    handleChange={this.handleChange} 
                  />
                </Col>
                <Col className='text-center my-auto'>    
                </Col>
              </Row>

              <Row>
                <Col className='text-center my-auto'>    
                  <FieldInput 
                    inputType='text' 
                    field='city' 
                    label='City' 
                    tabIndex={10}
                    labelSize={3}
                    inputSize={9}
                    value={city} 
                    handleChange={this.handleChange} 
                  />
                </Col>
                <Col>
                <Row>
                <Col className='text-center my-auto'>    
                  <FieldInput 
                    inputType='text' 
                    field='state' 
                    label='State' 
                    tabIndex={10} 
                    labelSize={3}
                    inputSize={9}
                    value={state} 
                    handleChange={this.handleChange} 
                  />
                </Col>
                <Col className='text-center my-auto'>    
                  <FieldInput 
                    inputType='text' 
                    field='zipcode' 
                    label='Zipcode' 
                    tabIndex={10} 
                    labelSize={3}
                    inputSize={9}
                    value={zipcode} 
                    handleChange={this.handleChange} 
                  />
                </Col>
                </Row>
                </Col>
              </Row>

              <Row>
                <Col className='text-center my-auto'>
                  <FieldInput 
                    inputType='text' 
                    field='partner_name' 
                    label='Partner Name' 
                    tabIndex={10} 
                    labelSize={3}
                    inputSize={9}
                    value={partner_name} 
                    handleChange={this.handleChange} 
                  />
                </Col>
                <Col className='text-center my-auto'>    
                  <FieldInput 
                    inputType='text' 
                    field='partner_phone' 
                    label='Partner Phone' 
                    tabIndex={10} 
                    labelSize={3}
                    inputSize={9}
                    value={partner_phone} 
                    handleChange={this.handleChange} 
                  />
                </Col>
              </Row>

              <hr />
              <Row className='mt-4'>
                <Col className='text-center my-auto' xs={8}>  
                  <Form.Group className='form-control-lg text-center'>
                    <Form.Check
                      name="agreed_terms"
                      label="Please ensure owner has signed the terms and conditions. Tick when completed."
                      onChange={(e) => this.handleChange('agreed_terms', e.target.checked)}
                      checked={agreed_terms}
                      id="agreed_terms"
                      tabIndex={10}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <FieldInput 
                    inputType='date' 
                    field='agreed_date' 
                    label='Date Terms Agreed' 
                    tabIndex={10} 
                    labelSize={5}
                    inputSize={7}
                    value={agreed_date} 
                    handleChange={this.handleChange} 
                    disabled={true}
                  />
                </Col>
              </Row>

              <Row>
                <Col className='text-center my-auto'>    
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Additional Notes</Form.Label>
                    <Form.Control as="textarea" rows="3" name='notes' value={notes} onChange={e => this.handleChange('notes', e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>

              <hr />

              <div className='text-center'>
                <Button variant='secondary' type='submit'>Submit</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    lookups: state.lookups
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    postOwner: props => dispatch(postOwner(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerDisplay);