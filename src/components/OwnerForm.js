import React from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FieldInput from '../formComponents/FieldInput'
import FieldInputSelect from '../formComponents/FieldInputSelect'
import { postOwner, updateOwner, submitUpdateOwner } from '../actions/ownerActions'
import moment from 'moment'

class OwnerForm extends React.Component {

  handleChange = (key, value) => {
    
    if (key === 'agreed_terms' &&  value === true ) {

      this.props.updateOwner({ agreed_terms: value, agreed_date: moment().format('YYYY-MM-DD') })
    
    } else if (key === 'agreed_terms' &&  value === false) {

      this.props.updateOwner({ agreed_terms: value, agreed_date: '' })
    
    } else {
      
      this.props.updateOwner({[key]: value})
    
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {pets, concerns, owner_id, ...owner} = this.props.owner

    if (this.props.match.path === "/owners/:id/edit") {

      this.props.submitUpdateOwner({ owner , id: this.props.owner.id})

    } else {

      this.props.postOwner(owner)
        .then(data => this.props.history.push(`/owners/${data.payload.owner.id}`))

    }
  }

  render() {
    const { lookups, lookups: {errors}, owner: {first_name,last_name, email, primary_phone, primary_phone_type_id, secondary_phone,
      secondary_phone_type_id, address_line_1, address_line_2, address_line_3, city, state, zipcode,
      partner_name, partner_phone, emergency_contact_name, emergency_contact_phone, agreed_terms, 
      agreed_date, notes }, match: { path } } = this.props

    return (
      <Container className='mt-5' fluid={true}>
        <Row className='justify-content-center'>
          <Col className='col-9 text-center center-block'>
            <Form onSubmit={this.handleSubmit}>
              <h1 className='text-center'>{path === "/owners/:id/edit" ? 'Edit Owner' : 'New Owner'}</h1>
              {errors.map((error, i)=> <p key={`error${i}`} style={{color: 'red'}}>{error}</p>)}
              <Row>
                <Col className='text-center my-auto'>
                  <FieldInput 
                    inputType='text' 
                    field='first_name' 
                    label='First Name' 
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
                    labelSize={3}
                    inputSize={9}
                    value={secondary_phone} 
                    handleChange={this.handleChange}
                    selectField='secondary_phone_type_id'
                    selectValue={secondary_phone_type_id}
                    options={lookups.phoneTypes}
                    required={false}
                  />
                </Col>
              </Row>

              <Row>
                <Col className='text-center my-auto'>
                  <FieldInput 
                    inputType='text' 
                    field='emergency_contact_name' 
                    label='Emergency Contact Name'  
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
                    inputType='email' 
                    field='email' 
                    label='Email'  
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
                    labelSize={3}
                    inputSize={9}
                    value={address_line_2} 
                    handleChange={this.handleChange}
                    required={false}
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
                    labelSize={3}
                    inputSize={9}
                    value={address_line_3} 
                    handleChange={this.handleChange}
                    required={false}
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
                    labelSize={3}
                    inputSize={9}
                    value={partner_name} 
                    handleChange={this.handleChange}
                    required={false}
                  />
                </Col>
                <Col className='text-center my-auto'>    
                  <FieldInput 
                    inputType='text' 
                    field='partner_phone' 
                    label='Partner Phone'  
                    labelSize={3}
                    inputSize={9}
                    value={partner_phone} 
                    handleChange={this.handleChange}
                    required={false}
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
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <FieldInput 
                    inputType='date' 
                    field='agreed_date' 
                    label='Date Terms Agreed'  
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
    lookups: state.lookups,
    owner: state.owner
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    postOwner: props => dispatch(postOwner(props)),
    updateOwner: props => dispatch(updateOwner(props)),
    submitUpdateOwner: props => dispatch(submitUpdateOwner(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerForm);