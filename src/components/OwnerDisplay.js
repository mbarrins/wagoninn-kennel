import React from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { getOwner } from '../actions/ownerActions'
import { Link } from 'react-router-dom'
import moment from 'moment'

class OwnerDisplay extends React.Component {

  componentDidMount() {
    this.props.getOwner(this.props.match.params.id);
  }

  render() {
    const { lookups, match, owner: {first_name,last_name, email, primary_phone, primary_phone_type_id, secondary_phone,
      secondary_phone_type_id, address_line_1, address_line_2, address_line_3, city, state, zipcode,
      partner_name, partner_phone, emergency_contact_name, emergency_contact_phone, agreed_terms, 
      agreed_date, notes, pets, bookings } } = this.props

    const primary_phone_type = (primary_phone_type_id && lookups.phoneTypes.length > 0) ? lookups.phoneTypes.find(type => type.id === parseInt(primary_phone_type_id,10)).name : null

    const secondary_phone_type = (secondary_phone_type_id && lookups.phoneTypes.length > 0) ? lookups.phoneTypes.find(type => type.id === parseInt(secondary_phone_type_id,10)).name : null

    const dog_type_id = lookups.petTypes.length > 0 && lookups.petTypes.find(type => type.name === 'Dog').id
    const cat_type_id = lookups.petTypes.length > 0 && lookups.petTypes.find(type => type.name === 'Cat').id

    const dogs = pets.filter(pet => parseInt(pet.pet_type_id,10) === dog_type_id)
    const cats = pets.filter(pet => parseInt(pet.pet_type_id,10) === cat_type_id)
    const otherPets = lookups.petTypes.length > 0 ? pets.filter(pet => ![dog_type_id, cat_type_id].includes(parseInt(pet.pet_type_id,10))) : []
      
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
                  <Col xs={7} className='text-left' ><h6>{primary_phone} {primary_phone_type ? `(${primary_phone_type})` : ''}</h6></Col>
                </Row>
              </Col>
              <Col className='text-center my-auto'>
                <Row>
                  <Col xs={5} className='text-right'><h6>Secondary Phone</h6></Col>
                  <Col xs={7} className='text-left' ><h6>{secondary_phone} {primary_phone_type ? `(${secondary_phone_type})` : ''}</h6></Col>
                </Row>
              </Col>
            </Row>

            <Row className='mt-4'>
              <Col className='text-center my-auto'>  
                {agreed_terms ? 
                  <h5>Owner agreed terms and conditions on {moment(agreed_date).format("DD-MMM-YYYY")}</h5>
                :
                  <Form.Group className='form-control-lg text-center text-danger'>
                    <Form.Check
                      name="agreed_terms"
                      label="Please ensure owner has signed the terms and conditions. Tick when completed."
                      onChange={(e) => this.handleChange('agreed_terms', e.target.checked)}
                      checked={agreed_terms}
                      id="agreed_terms"
                      tabIndex={10}
                    />
                  </Form.Group> 
                }
              </Col>
            </Row>

            <Accordion>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Click for more owner details
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
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
                        <Col xs={4} className='text-right'></Col>
                        <Col xs={7} className='text-left' ><h6>{address_line_2}</h6></Col>
                      </Row>
                      <Row>
                        <Col xs={4} className='text-right'></Col>
                        <Col xs={7} className='text-left' ><h6>{address_line_3}</h6></Col>
                      </Row>
                      <Row>
                        <Col xs={4} className='text-right'></Col>
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

                  <Row>
                    <Col>
                      <Card>
                        <Card.Title className='mt-2'>Additional Notes</Card.Title>
                        <Card.Body>{notes}</Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            
              <Card>
                <Card.Body>
                  {dogs.length > 0 && <Card.Title>Dogs</Card.Title>}
                  {dogs.map(dog => (
                    <Row key={`dog${dog.id}`}className='mt-3'>
                      <Col className='text-center my-auto'>
                        <Row>
                          <Col xs={4}></Col>
                          <Col className='text-left' ><h6>{dog.name} ({lookups.sexes.find(sex => sex.id === parseInt(dog.sex_id,10)).name}) {lookups.sizes.find(size => size.id === parseInt(dog.size_id,10)).name} {lookups.breeds.find(breed => breed.id === parseInt(dog.breed_id,10)).name}</h6></Col>
                        </Row>
                      </Col>
                      <Col className='text-center my-auto'>
                      </Col>
                    </Row>
                  ))}

                  {cats.length > 0 && <Card.Title>Cats</Card.Title>}
                  {cats.map(cat => (
                    <Row key={`cat${cat.id}`}className='mt-3'>
                      <Col className='text-center my-auto'>
                        <Row>
                          <Col xs={4}></Col>
                          <Col className='text-left' ><h6>{cat.name} ({lookups.sexes.find(sex => sex.id === parseInt(cat.sex_id,10)).name}) {lookups.sizes.find(size => size.id === parseInt(cat.size_id,10)).name} {lookups.colors.find(color => color.id === parseInt(cat.color_id,10)).name}</h6></Col>
                        </Row>
                      </Col>
                      <Col className='text-center my-auto'>
                      </Col>
                    </Row>
                  ))}

                  {otherPets.length > 0 && <Card.Title>Other Pets</Card.Title>}
                  {otherPets.map(pet => (
                    <Row key={`pet${pet.id}`}className='mt-3'>
                      <Col className='text-center my-auto'>
                        <Row>
                          <Col xs={4}></Col>
                          <Col className='text-left' ><h6>{pet.name} ({lookups.sexes.find(sex => sex.id === parseInt(pet.sex_id,10)).name}) {lookups.sizes.find(size => size.id === parseInt(pet.size_id,10)).name} {lookups.colors.find(color => color.id === parseInt(pet.color_id,10)).name}</h6></Col>
                        </Row>
                      </Col>
                      <Col className='text-center my-auto'>
                      </Col>
                    </Row>
                  ))}

                  <div className='text-center'>
                    <Button as={Link} to={{pathname: '/pets/new', ownerId: parseInt(match.params.id,10)}} className='text-dark'>Add Pet</Button>
                  </div>

                </Card.Body>
              </Card>

              <Card>
                <Card.Header>Current Bookings</Card.Header>
                <Card.Body>  
                  {bookings.filter(booking => moment(booking.check_out) >= moment()).map(booking => (
                    <Row key={`booking${booking.id}`} className='mt-3'>
                      <Col>
                        <Row >
                          <Col className='text-center my-auto'>
                            <Row>
                              <Col xs={5} className='text-right'><h6>Check In</h6></Col>
                              <Col xs={7} className='text-left' ><h6>{moment(booking.check_in).format('DD/MM/YYYY')}</h6></Col>
                            </Row>
                          </Col>
                          <Col className='text-center my-auto'>
                            <Row>
                              <Col xs={6} className='text-right'><h6>Check Out</h6></Col>
                              <Col xs={6} className='text-left' ><h6>{moment(booking.check_out).format('DD/MM/YYYY')}</h6></Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Row>
                            {booking.booking_pens.map(pen => (
                              <React.Fragment key={`booking_pen${pen.id}`}>
                              <Col className='text-center my-auto'>
                              <Row>
                              <Col xs={5} className='text-right'><h6>{lookups.penTypes.length > 0 && lookups.penTypes.find(type => type.id === parseInt(pen.pen_type_id,10)).name}</h6></Col>
                              </Row>
                              </Col>
                              <Col className='text-center my-auto'>
                                {pen.booking_pen_pets.map(pet => (
                                  <Row key={`booking_pen_pet${pet.id}`}>
                                    <Col xs={5} className='text-right'><h6>{pet.name}</h6></Col>
                                  </Row>
                                ))}
                              </Col>
                              </React.Fragment>
                            ))}
                        </Row>
                      </Col>
                    </Row>
                  ))}
                </Card.Body>
              </Card>

              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Click for past bookings
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                  {bookings.filter(booking => moment(booking.check_out) < moment()).map(booking => (
                    <Row key={`booking${booking.id}`} className='mt-3'>
                      <Col>
                        <Row >
                          <Col className='text-center my-auto'>
                            <Row>
                              <Col xs={5} className='text-right'><h6>Check In</h6></Col>
                              <Col xs={7} className='text-left' ><h6>{moment(booking.check_in).format('DD/MM/YYYY')}</h6></Col>
                            </Row>
                          </Col>
                          <Col className='text-center my-auto'>
                            <Row>
                              <Col xs={6} className='text-right'><h6>Check Out</h6></Col>
                              <Col xs={6} className='text-left' ><h6>{moment(booking.check_out).format('DD/MM/YYYY')}</h6></Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Row>
                            {booking.booking_pens.map(pen => (
                              <React.Fragment key={`booking_pen${pen.id}`}>
                              <Col className='text-center my-auto'>
                              <Row>
                              <Col xs={5} className='text-right'><h6>{lookups.penTypes.length > 0 && lookups.penTypes.find(type => type.id === parseInt(pen.pen_type_id,10)).name}</h6></Col>
                              </Row>
                              </Col>
                              <Col className='text-center my-auto'>
                                {pen.booking_pen_pets.map(pet => (
                                  <Row key={`booking_pen_pet${pet.id}`}>
                                    <Col xs={5} className='text-right'><h6>{pet.name}</h6></Col>
                                  </Row>
                                ))}
                              </Col>
                              </React.Fragment>
                            ))}
                        </Row>
                      </Col>
                    </Row>
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            </Accordion>

            <ButtonToolbar className='justify-content-center mt-3'>
              <Button variant='lg link light' id='issues' onClick={this.addItem} >+ Add Concern</Button>
              <Link to={{pathname: '/bookings/new', ownerId: parseInt(match.params.id,10)}} >
                <Button variant='secondary' type='submit'>Create New Booking</Button>
              </Link>
            </ButtonToolbar>

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