import React from 'react';
import { connect } from 'react-redux'
import { getLookups } from '../actions/lookupsActions'
import { getDashboard, updateDashboard } from '../actions/dashboardActions'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import moment from 'moment'

class MainContainer extends React.Component {

  componentDidMount() {
    const { date } = this.props.dashboard

    this.props.getLookups();
    this.props.getDashboard({ date });
  }

  changeDate = e => {
    const { date } = this.props.dashboard
    const newDate = (e.target.name === 'next' ? moment(date).add(1, 'd') : moment(date).add(-1, 'd')).format('YYYY-MM-DD')

    this.props.updateDashboard({date: newDate});
    this.props.getDashboard({ date: newDate });

  }

  render() {
    const { date, today_drop_off, today_pick_up, todays_pens, tomorrow_drop_off } = this.props.dashboard
    
    return (
      <Container className='mt-3' fluid={true}>
        <Row className='justify-content-center'>
        <Col className='col-8 text-center center-block'>
          <Card style={{height: '58vh'}}>
            <Card.Header>
              <h4>
                <Button variant='outline-dark' className='mr-5' name='prev' onClick={this.changeDate} >&#8249;</Button>
                {`Daily Information for ${moment(date).format('dddd, MMMM DD, YYYY')}`}
                <Button variant='outline-dark' className='ml-5' name='next' onClick={this.changeDate} >&#8250;</Button></h4>
              </Card.Header>
            <Card.Title className='mt-2'>
              <Row style={{marginTop: '2px', height: '2vh'}}>
              <Col xs={2} className='text-center my-auto'>
              </Col>
              <Col className='text-left my-auto'>
                <h5>Pick Ups</h5>
              </Col>
              <Col className='text-left my-auto'>
                <h5>Drop Offs</h5>
              </Col>
            </Row>
            <hr/>
            </Card.Title>
            <Row style={{marginTop: '3px', height: '20vh'}}>
              <Col xs={2} className='text-center'>
                <h4>AM</h4>
              </Col>
              <Col className='text-left'>
                {today_pick_up.am.map(pet => <h6 key={`pickup${pet.id}`}>{pet.pet_listing}</h6>)}
              </Col>
              <Col className='text-left'>
                {today_drop_off.am.map(pet => <h6 key={`dropoff${pet.id}`}>{pet.pet_listing}</h6>)}
              </Col>
            </Row>
            <hr />
            <Row style={{marginTop: '3px', height: '20vh'}}>
              <Col xs={2} className='text-center'>
                <h4>PM</h4>
              </Col>
              <Col className='text-left'>
                {today_pick_up.pm.map(pet => <h6 key={`pickup${pet.id}`}>{pet.pet_listing}</h6>)}
              </Col>
              <Col className='text-left'>
                {today_drop_off.pm.map(pet => <h6 key={`dropoff${pet.id}`}>{pet.pet_listing}</h6>)}
              </Col>
            </Row>
          </Card>
          <CardGroup style={{height: '30vh'}}>
            <Card>
              <Card.Header>Tomorrow Drop-offs</Card.Header>
              <Row style={{marginTop: '3px', height: '10vh'}}>
                <Col xs={2} className='text-center my-auto'>
                  <h4>AM</h4>
                </Col>
                <Col className='text-left my-auto'>
                  {tomorrow_drop_off.am.map(pet => <h6 key={`pickup${pet.id}`}>{pet.pet_listing}</h6>)}
                </Col>
              </Row>
              <hr />
              <Row style={{marginTop: '3px', height: '10vh'}}>
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
                  {todays_pens.CatRoom && todays_pens.CatRoom.map(booking => <p key={`catbooking${booking.id}`}>{booking.pet_listing}</p>)}
                </Card.Body>
            </Card>
          </CardGroup>
        </Col>
        <Col>
          <CardGroup style={{height: '11vh'}}>
            <Card>
              <Card.Header>8</Card.Header>
              <Card.Body>{todays_pens.DogRun && (todays_pens.DogRun.find(pen => pen.pen_no === 8) || {pet_listing: ''}).pet_listing}</Card.Body>
            </Card>
            <Card>
              <Card.Header>9</Card.Header>
              <Card.Body>{todays_pens.DogRun && (todays_pens.DogRun.find(pen => pen.pen_no === 9) || {pet_listing: ''}).pet_listing}</Card.Body>
            </Card>
          </CardGroup>
          <CardGroup style={{height: '11vh'}}>
            <Card>
              <Card.Header>7</Card.Header>
              <Card.Body>{todays_pens.DogRun && (todays_pens.DogRun.find(pen => pen.pen_no === 7) || {pet_listing: ''}).pet_listing}</Card.Body>
            </Card>
            <Card>
              <Card.Header>10</Card.Header>
              <Card.Body>{todays_pens.DogRun && (todays_pens.DogRun.find(pen => pen.pen_no === 10) || {pet_listing: ''}).pet_listing}</Card.Body>
            </Card>
          </CardGroup>
          <CardGroup style={{height: '11vh'}}>
            <Card>
              <Card.Header>6</Card.Header>
              <Card.Body>{todays_pens.DogRun && (todays_pens.DogRun.find(pen => pen.pen_no === 6) || {pet_listing: ''}).pet_listing}</Card.Body>
            </Card>
            <Card>
              <Card.Header>11</Card.Header>
              <Card.Body>{todays_pens.DogRun && (todays_pens.DogRun.find(pen => pen.pen_no === 11) || {pet_listing: ''}).pet_listing}</Card.Body>
            </Card>
          </CardGroup>
          <CardGroup style={{height: '11vh'}}>
            <Card>
              <Card.Header>5</Card.Header>
              <Card.Body>{todays_pens.DogRun && (todays_pens.DogRun.find(pen => pen.pen_no === 5) || {pet_listing: ''}).pet_listing}</Card.Body>
            </Card>
            <Card>
              <Card.Header>12</Card.Header>
              <Card.Body>{todays_pens.DogRun && (todays_pens.DogRun.find(pen => pen.pen_no === 12) || {pet_listing: ''}).pet_listing}</Card.Body>
            </Card>
          </CardGroup>
          <CardGroup style={{height: '11vh'}}>
            <Card>
              <Card.Header>4</Card.Header>
              <Card.Body>{todays_pens.DogRun && (todays_pens.DogRun.find(pen => pen.pen_no === 4) || {pet_listing: ''}).pet_listing}</Card.Body>
            </Card>
            <Card>
              <Card.Header>13</Card.Header>
              <Card.Body>{todays_pens.DogRun && (todays_pens.DogRun.find(pen => pen.pen_no === 13) || {pet_listing: ''}).pet_listing}</Card.Body>
            </Card>
          </CardGroup>
          <CardGroup style={{height: '11vh'}}>
            <Card>
              <Card.Header>3</Card.Header>
              <Card.Body>{todays_pens.DogRun && (todays_pens.DogRun.find(pen => pen.pen_no === 3) || {pet_listing: ''}).pet_listing}</Card.Body>
            </Card>
            <Card>
              <Card.Header>14</Card.Header>
              <Card.Body>{todays_pens.DogRun && (todays_pens.DogRun.find(pen => pen.pen_no === 14) || {pet_listing: ''}).pet_listing}</Card.Body>
            </Card>
          </CardGroup>
          <CardGroup style={{height: '11vh'}}>
            <Card>
              <Card.Header>2</Card.Header>
              <Card.Body>{todays_pens.DogRun && (todays_pens.DogRun.find(pen => pen.pen_no === 2) || {pet_listing: ''}).pet_listing}</Card.Body>
            </Card>
            <Card>
              <Card.Header>15</Card.Header>
              <Card.Body>{todays_pens.DogRun && (todays_pens.DogRun.find(pen => pen.pen_no === 15) || {pet_listing: ''}).pet_listing}</Card.Body>
            </Card>
          </CardGroup>
          <CardGroup style={{height: '11vh'}}>
            <Card>
              <Card.Header>1</Card.Header>
              <Card.Body>{todays_pens.DogRun && (todays_pens.DogRun.find(pen => pen.pen_no === 1) || {pet_listing: ''}).pet_listing}</Card.Body>
            </Card>
            <Card>
              
            </Card>
          </CardGroup>
        </Col>
        </Row>
        </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.users.isAuthenticated,
    lookups: state.lookups.lookups,
    dashboard: state.dashboard
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    getLookups: props => dispatch(getLookups(props)),
    getDashboard: props => dispatch(getDashboard(props)),
    updateDashboard: props => dispatch(updateDashboard(props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
