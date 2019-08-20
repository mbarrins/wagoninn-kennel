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
import { getOwner, submitUpdateOwner } from '../actions/ownerActions'
import OwnerBookings from './OwnerBookings'
import TwoColumnDisplay from './TwoColumnDisplay'
import { Link } from 'react-router-dom'
import moment from 'moment'

class OwnerDisplay extends React.Component {

  componentDidMount() {
    this.props.getOwner(this.props.match.params.id);
  }

  handleChange = (key, value) => {

    if (key === 'agreed_terms' && value === true) {

      this.props.submitUpdateOwner({ owner: { agreed_terms: value, agreed_date: moment().format('YYYY-MM-DD') }, id: this.props.owner.id })

    } else if (key === 'agreed_terms' && value === false) {

      this.props.submitUpdateOwner({ agreed_terms: value, agreed_date: '' })

    } else {

      this.props.updateOwner({ [key]: value })

    }
  }

  render() {
    const { lookups, match, owner: { id, first_name, last_name, email, primary_phone, primary_phone_type_id, secondary_phone,
      secondary_phone_type_id, address_line_1, address_line_2, address_line_3, city, state, zipcode,
      partner_name, partner_phone, emergency_contact_name, emergency_contact_phone, agreed_terms,
      agreed_date, notes, pets, bookings } } = this.props

    const primary_phone_type = (primary_phone_type_id && lookups.phoneTypes.length > 0) ? lookups.phoneTypes.find(type => type.id === parseInt(primary_phone_type_id, 10)).name : null

    const secondary_phone_type = (secondary_phone_type_id && lookups.phoneTypes.length > 0) ? lookups.phoneTypes.find(type => type.id === parseInt(secondary_phone_type_id, 10)).name : null

    const dog_type_id = lookups.petTypes.length > 0 && lookups.petTypes.find(type => type.name === 'Dog').id
    const cat_type_id = lookups.petTypes.length > 0 && lookups.petTypes.find(type => type.name === 'Cat').id

    const dogs = pets.filter(pet => parseInt(pet.pet_type_id, 10) === dog_type_id)
    const cats = pets.filter(pet => parseInt(pet.pet_type_id, 10) === cat_type_id)
    const otherPets = lookups.petTypes.length > 0 ? pets.filter(pet => ![dog_type_id, cat_type_id].includes(parseInt(pet.pet_type_id, 10))) : []

    const current_bookings = bookings.filter(booking => moment(booking.check_out) >= moment())
    const past_bookings = bookings.filter(booking => moment(booking.check_out) < moment())

    return (
      <Container className='mt-5' fluid={true}>
        <Row className='justify-content-center'>
          <Col className='col-9 text-center center-block'>
            <Row>
              <Col>
                <h1 className='text-center'>Owner Details</h1>
              </Col>
              <Col>
                <ButtonToolbar className='justify-content-center mt-3'>
                  <Link to='/bookings/new' >
                    <Button variant='secondary' type='submit'>Create New Booking</Button>
                  </Link>
                </ButtonToolbar>
              </Col>
            </Row>

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

            <TwoColumnDisplay
              col1Label='Primary Phone'
              col1Detail={`${primary_phone} ${primary_phone_type ? `(${primary_phone_type})` : ''}`}
              col2Label='Secondary Phone'
              col2Detail={`${secondary_phone} ${secondary_phone_type ? `(${secondary_phone_type})` : ''}`}
            />

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
                    />
                  </Form.Group>
                }
              </Col>
            </Row>

            <Accordion className='mt-3'>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Click for more owner details
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <TwoColumnDisplay
                      col1Label='Partner'
                      col1Detail={partner_name}
                      col2Label='Partner Phone'
                      col2Detail={partner_phone}
                    />

                    <TwoColumnDisplay
                      col1Label='Emergency Contact'
                      col1Detail={emergency_contact_name}
                      col2Label='Emergency Contact Phone'
                      col2Detail={emergency_contact_phone}
                    />

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
                    <Row key={`dog${dog.id}`} className='mt-3'>
                      <Col className='text-center my-auto'>
                        <Row>
                          <Col xs={4}>
                            <div className='text-center'>
                              <Link to={`/pets/${dog.id}/edit`} >
                                <Button variant='outline-dark' >view/edit</Button>
                              </Link>
                            </div>
                          </Col>
                          <Col className='text-left' ><h6>{dog.name} ({lookups.sexes.find(sex => sex.id === parseInt(dog.sex_id, 10)).name}) {lookups.sizes.find(size => size.id === parseInt(dog.size_id, 10)).name} {lookups.breeds.find(breed => breed.id === parseInt(dog.breed_id, 10)).name}</h6></Col>
                        </Row>
                      </Col>
                      <Col className='text-center my-auto'>
                      </Col>
                    </Row>
                  ))}

                  {cats.length > 0 && <Card.Title>Cats</Card.Title>}
                  {cats.map(cat => (
                    <Row key={`cat${cat.id}`} className='mt-3'>
                      <Col className='text-center my-auto'>
                        <Row>
                          <Col xs={4}>
                            <div className='text-center'>
                              <Link to={`/pets/${cat.id}/edit`} >
                                <Button variant='outline-dark' >view/edit</Button>
                              </Link>
                            </div>
                          </Col>
                          <Col className='text-left' ><h6>{cat.name} ({lookups.sexes.find(sex => sex.id === parseInt(cat.sex_id, 10)).name}) {lookups.sizes.find(size => size.id === parseInt(cat.size_id, 10)).name} {lookups.colors.find(color => color.id === parseInt(cat.color_id, 10)).name}</h6></Col>
                        </Row>
                      </Col>
                      <Col className='text-center my-auto'>
                      </Col>
                    </Row>
                  ))}

                  {otherPets.length > 0 && <Card.Title>Other Pets</Card.Title>}
                  {otherPets.map(pet => (
                    <Row key={`pet${pet.id}`} className='mt-3'>
                      <Col className='text-center my-auto'>
                        <Row>
                          <Col xs={4}>
                            <div className='text-center'>
                              <Link to={`/pets/${pet.id}/edit`} >
                                <Button variant='outline-dark' >view/edit</Button>
                              </Link>
                            </div>
                          </Col>
                          <Col className='text-left' ><h6>{pet.name} ({lookups.sexes.find(sex => sex.id === parseInt(pet.sex_id, 10)).name}) {lookups.sizes.find(size => size.id === parseInt(pet.size_id, 10)).name} {lookups.colors.find(color => color.id === parseInt(pet.color_id, 10)).name}</h6></Col>
                        </Row>
                      </Col>
                      <Col className='text-center my-auto'>
                      </Col>
                    </Row>
                  ))}

                  <ButtonToolbar className='justify-content-center mt-3'>
                    <Link to={{ pathname: '/pets/new', ownerId: parseInt(match.params.id, 10) }} >
                      <Button variant='secondary' type='submit'>Add Pet</Button>
                    </Link>
                  </ButtonToolbar>

                </Card.Body>
              </Card>

              {current_bookings.length > 0 ?
                <Card>
                  <Card.Header>Current Booking{current_bookings.length === 1 ? '' : 's'}</Card.Header>
                  <OwnerBookings bookings={current_bookings} pets={pets} lookups={lookups} edit={true} />
                </Card>
                : ''}

              {past_bookings.length > 0 ?
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="1">
                    Click for past booking{past_bookings.length === 1 ? '' : 's'}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <OwnerBookings bookings={past_bookings} pets={pets} lookups={lookups} edit={false} />
                  </Accordion.Collapse>
                </Card>
                : ''}

            </Accordion>

            {/* <ButtonToolbar className='justify-content-center mt-3'>
              <Button variant='lg link light' id='issues' onClick={this.addItem} >+ Add Concern</Button>
            </ButtonToolbar> */}
            <ButtonToolbar className='justify-content-center mt-3'>
              <Link to={`/owners/${id}/edit`} >
                <Button variant='secondary' type='submit'>Edit Owner Details</Button>
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
    getOwner: props => dispatch(getOwner(props)),
    submitUpdateOwner: props => dispatch(submitUpdateOwner(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerDisplay);