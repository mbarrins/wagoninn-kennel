import React from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FieldInput from '../formComponents/FieldInput'
import FieldInputSelect from '../formComponents/FieldInputSelect'
import { getOwner } from '../actions/ownerActions'

class OwnerDisplay extends React.Component {

  componentDidMount() {
    this.props.getOwner(2);
  }

  render() {
    const { lookups, owner: {first_name,last_name, email, primary_phone, primary_phone_type_id, secondary_phone,
      secondary_phone_type_id, address_line_1, address_line_2, address_line_3, city, state, zipcode,
      partner_name, partner_phone, emergency_contact_name, emergency_contact_phone, agreed_terms, 
      agreed_date, notes } } = this.props
      
    return (
      <Container className='mt-5' fluid={true}>
        <Row className='justify-content-center'>
          <Col className='col-9 text-center center-block'>
              <h1 className='text-center'>Owner Details</h1>

              <Row className='mt-3'>
                <Col className='text-center my-auto'>
                  <Row>
                    <Col xs={4} className='text-right'><h5>Name</h5></Col>
                    <Col xs={7} className='text-left' ><h5>{first_name} {last_name}</h5></Col>
                  </Row>
                </Col>
                <Col className='text-center my-auto'>
                </Col>
              </Row>

              <Row className='mt-3'>
                <Col className='text-center my-auto'>
                  <Row>
                    <Col xs={4} className='text-right'><h6>Primary Phone</h6></Col>
                    <Col xs={7} className='text-left' ><h6>{primary_phone}</h6></Col>
                  </Row>
                </Col>
                <Col className='text-center my-auto'>
                  <Row>
                    <Col xs={5} className='text-right'><h6>Secondary Phone</h6></Col>
                    <Col xs={7} className='text-left' ><h6>{secondary_phone}</h6></Col>
                  </Row>
                </Col>
              </Row>

              <Row className='mt-3'>
                <Col className='text-center my-auto'>
                  <Row>
                    <Col xs={4} className='text-right'><h6>Partner</h6></Col>
                    <Col xs={7} className='text-left' ><h6>{partner_name}</h6></Col>
                  </Row>
                </Col>
                <Col className='text-center my-auto'>
                  <Row>
                    <Col xs={5} className='text-right'><h6>Partner Phone</h6></Col>
                    <Col xs={7} className='text-left' ><h6>{partner_phone}</h6></Col>
                  </Row>
                </Col>
              </Row>

              <Row className='mt-3'>
                <Col className='text-center my-auto'>
                  <Row>
                    <Col xs={4} className='text-right'><h6>Emergency Contact</h6></Col>
                    <Col xs={7} className='text-left' ><h6>{emergency_contact_name}</h6></Col>
                  </Row>
                </Col>
                <Col className='text-center my-auto'>
                  <Row>
                    <Col xs={5} className='text-right'><h6>Emergency Contact Phone</h6></Col>
                    <Col xs={7} className='text-left' ><h6>{emergency_contact_phone}</h6></Col>
                  </Row>
                </Col>
              </Row>

              <Row className='mt-3'>
                <Col className='text-center my-auto'>
                  <Row>
                    <Col xs={4} className='text-right'><h6>Address</h6></Col>
                    <Col xs={7} className='text-left' ><h6>{address_line_1}</h6></Col>
                  </Row>
                  <Row>
                    <Col xs={4} className='text-right'><h6></h6></Col>
                    <Col xs={7} className='text-left' ><h6>{address_line_2}</h6></Col>
                  </Row>
                  <Row>
                    <Col xs={4} className='text-right'><h6></h6></Col>
                    <Col xs={7} className='text-left' ><h6>{address_line_3}</h6></Col>
                  </Row>
                  <Row>
                    <Col xs={4} className='text-right'><h6></h6></Col>
                    <Col xs={7} className='text-left' ><h6>{city}, {state} {zipcode}</h6></Col>
                  </Row>
                </Col>
                <Col className='text-center my-auto'>
                  <Row>
                    <Col xs={5} className='text-right'><h6>Email</h6></Col>
                    <Col xs={7} className='text-left' ><h6>{email}</h6></Col>
                  </Row>
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
    getOwner: props => dispatch(getOwner(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerDisplay);