import React from 'react';
import { connect } from 'react-redux'
import { getLookups } from '../actions/lookupsActions'
import { getDashboard, updateDashboard } from '../actions/dashboardActions'
import { patchBooking } from '../actions/bookingActions'
import patchBookingPen from '../adapters/bookingPensAPI'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import moment from 'moment'
import BookingSummary from './BookingSummary'

class MainContainer extends React.Component {

  componentDidMount() {
    const { date } = this.props.dashboard
    this.props.getDashboard({ date });
  }

  changeDate = e => {
    const { date } = this.props.dashboard
    const newDate = (e.target.name === 'next' ? moment(date).add(1, 'd') : moment(date).add(-1, 'd')).format('YYYY-MM-DD')

    this.props.updateDashboard({ date: newDate });
    this.props.getDashboard({ date: newDate });

  }

  updateBookingStatus = (props) => {
    const { date } = this.props.dashboard

    this.props.patchBooking(props)
      .then(() => this.props.getDashboard({ date }));

  }

  updatePenNo = (pen_id, booking_pen_id) => {
    const { date } = this.props.dashboard

    patchBookingPen({ booking_pen: { pen_id }, id: booking_pen_id })
      .then(() => this.props.getDashboard({ date }));
  }

  displayColor = booking => {
    if (booking.status === 'Reservation' && moment(booking.check_un).isSame(moment(), 'day')) return 'text-primary'
    if (booking.status === 'Active' && moment(booking.check_out).isSame(moment(), 'day')) return 'text-danger'
    return 'text-dark'
  }

  render() {
    const { loading, date, today_drop_off, today_pick_up, todays_pens, tomorrow_drop_off, available_pens } = this.props.dashboard
    const pen_order = [[8, 9], [7, 10], [6, 11], [5, 12], [4, 13], [3, 14], [2, 15], [1, null]]
    const dog_emoji = <span role='img' aria-label='dog'>🐕</span>

    return (
      <Container className='mt-3' fluid={true}>
        <Row className='justify-content-center'>
          <Col className='col-8 text-center center-block'>
            <Card style={{ height: '58vh' }}>
              <Card.Header>
                <h4>
                  <Button variant='outline-dark' className='mr-5' name='prev' onClick={this.changeDate} >&#8249;</Button>
                  {`Daily Information for ${moment(date).format('dddd, MMMM DD, YYYY')}`}
                  <Button variant='outline-dark' className='ml-5' name='next' onClick={this.changeDate} >&#8250;</Button></h4>
              </Card.Header>
              <Card.Title className='mt-2'>
                <Row style={{ marginTop: '2px', height: '2vh' }}>
                  <Col xs={2} className='text-center my-auto'>
                  </Col>
                  <Col className='text-left my-auto'>
                    <h5>Pick Ups</h5>
                  </Col>
                  <Col className='text-left my-auto'>
                    <h5>Drop Offs</h5>
                  </Col>
                </Row>
                <hr />
              </Card.Title>
              <Row style={{ marginTop: '3px', height: '20vh' }}>
                <Col xs={2} className='text-center'>
                  <h4>AM</h4>
                </Col>
                <Col className='text-left'>
                  {today_pick_up.am.map(booking => (
                    <BookingSummary
                      key={`pickup${booking.id}`}
                      {...booking}
                      all_pens={this.props.dogPens}
                      available_pens={available_pens}
                      type='pickup'
                      updateBookingStatus={this.updateBookingStatus}
                      updatePenNo={this.updatePenNo}
                      new_status={this.props.bookingStatuses.find(status => status.name === 'Completed')}
                    />
                  ))}
                </Col>
                <Col className='text-left'>
                  {today_drop_off.am.map(booking => (
                    <BookingSummary
                      key={`dropoff${booking.id}`}
                      {...booking}
                      all_pens={this.props.dogPens}
                      available_pens={available_pens}
                      type='dropoff'
                      updateBookingStatus={this.updateBookingStatus}
                      updatePenNo={this.updatePenNo}
                      new_status={this.props.bookingStatuses.find(status => status.name === 'Active')}
                    />
                  ))}
                </Col>
              </Row>
              <hr />
              <Row style={{ marginTop: '3px', height: '20vh' }}>
                <Col xs={2} className='text-center'>
                  <h4>PM</h4>
                </Col>
                <Col className='text-left'>
                  {today_pick_up.pm.map(booking => (
                    <BookingSummary
                      key={`pickup${booking.id}`}
                      {...booking}
                      all_pens={this.props.dogPens}
                      available_pens={available_pens}
                      type='pickup'
                      updateBookingStatus={this.updateBookingStatus}
                      updatePenNo={this.updatePenNo}
                      new_status={this.props.bookingStatuses.find(status => status.name === 'Completed')}
                    />
                  ))}
                </Col>
                <Col className='text-left'>
                  {today_drop_off.pm.map(booking => (
                    <BookingSummary
                      key={`dropoff${booking.id}`}
                      {...booking}
                      all_pens={this.props.dogPens}
                      available_pens={available_pens}
                      type='dropoff'
                      updateBookingStatus={this.updateBookingStatus}
                      updatePenNo={this.updatePenNo}
                      new_status={this.props.bookingStatuses.find(status => status.name === 'Active')}
                    />
                  ))}
                </Col>
              </Row>
            </Card>
            <CardGroup style={{ height: '30vh' }}>
              <Card>
                <Card.Header>Tomorrow Drop-offs</Card.Header>
                <Row style={{ marginTop: '3px', height: '10vh' }}>
                  <Col xs={2} className='text-center my-auto'>
                    <h4>AM</h4>
                  </Col>
                  <Col className='text-left my-auto'>
                    {tomorrow_drop_off.am.map(pet => <h6 key={`pickup${pet.id}`}>{pet.pet_listing}</h6>)}
                  </Col>
                </Row>
                <hr />
                <Row style={{ marginTop: '3px', height: '10vh' }}>
                  <Col xs={2} className='text-center my-auto'>
                    <h4>PM</h4>
                  </Col>
                  <Col className='text-left my-auto'>
                    {tomorrow_drop_off.pm.map(pet => <h6 key={`pickup${pet.id}`}>{pet.pet_listing}</h6>)}
                  </Col>
                </Row>
              </Card>
              <Card>
                <Card.Header>Cats</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      {todays_pens.CatRoom && Object.values(todays_pens.CatRoom).filter((cat, index) => index % 2 === 0).map(booking => <p key={`catbooking${booking.id}`} className={this.displayColor(booking)} >{booking.pet_listing}</p>)}
                    </Col>
                    <Col>
                      {todays_pens.CatRoom && Object.values(todays_pens.CatRoom).filter((cat, index) => index % 2 === 1).map(booking => <p key={`catbooking${booking.id}`} className={this.displayColor(booking)} >{booking.pet_listing}</p>)}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
          <Col>
            {pen_order.map(pens => (
              <CardGroup key={`pens${pens[0]}${pens[1]}`} style={{ height: '11vh' }}>
                <Card>
                  <Card.Header>{pens[0]}</Card.Header>
                  {todays_pens.DogRun && todays_pens.DogRun[pens[0]] ?
                    <Card.Body className={this.displayColor(todays_pens.DogRun[pens[0]])} >{todays_pens.DogRun[pens[0]].pet_listing}</Card.Body>
                    : ''}
                </Card>
                <Card>
                  {pens[1] ?
                    <>
                      <Card.Header>{pens[1]}</Card.Header>
                      {todays_pens.DogRun && todays_pens.DogRun[pens[1]] ?
                        <Card.Body className={this.displayColor(todays_pens.DogRun[pens[1]])} >{todays_pens.DogRun[pens[1]].pet_listing}</Card.Body>
                        : ''}
                    </>
                    : ''}
                </Card>
              </CardGroup>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    bookingStatuses: state.lookups.bookingStatuses,
    dogPens: state.lookups.dogPens,
    lookupsLoading: state.lookups.loading,
    dashboard: state.dashboard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLookups: props => dispatch(getLookups(props)),
    getDashboard: props => dispatch(getDashboard(props)),
    updateDashboard: props => dispatch(updateDashboard(props)),
    patchBooking: props => dispatch(patchBooking(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
