import React from 'react';
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import moment from 'moment'
import { getAvailability, clearAvailability, updateAvailability } from '../../actions/availabilityActions'

class Occupancy extends React.Component {

  componentDidMount() {
    const { month, year } = this.props
    const dateFrom = moment(`${year}-${month}-01`).format("YYYY-MM-DD")
    const dateTo = moment(`${year}-${month}-01`).endOf('month').format("YYYY-MM-DD")

    this.props.getAvailability({ dateFrom, dateTo });
  }

  changeMonth = e => {
    const { month, year } = this.props
    const newMonth = (e.target.name === 'next' ? moment(`${year}-${month}-01`).add(1, 'month') : moment(`${year}-${month}-01`).add(-1, 'month')).format('MM')
    const newYear = (e.target.name === 'next' ? moment(`${year}-${month}-01`).add(1, 'month') : moment(`${year}-${month}-01`).add(-1, 'month')).format('YYYY')

    const dateFrom = moment(`${newYear}-${newMonth}-01`).format("YYYY-MM-DD")
    const dateTo = moment(`${newYear}-${newMonth}-01`).endOf('month').format("YYYY-MM-DD")

    this.props.updateAvailability({ month: newMonth, year: newYear });
    this.props.getAvailability({ dateFrom, dateTo });

  }

  weekly_availabliilty = () => {
    const availability = this.props.availability
    let days = availability.map(date => date.day_of_week)

    let prevSplit = 0
    let split = days.indexOf(6) + 1
    let weekly = []

    if (availability.length > 0 && split === 0) return [
      [
        ...new Array(availability[0].day_of_week).fill(false),
        ...availability,
        ...new Array(7 - availability[0].day_of_week - availability.length).fill(false)
      ]
    ]

    while (split !== 0 && availability.length >= split) {
      let week = availability.slice(prevSplit, split)

      while (week.length < 7) {
        week.unshift(false)
      }

      weekly.push(week)
      prevSplit = split
      split = days.indexOf(6, prevSplit) + 1

      if (split === 0 && availability.slice(prevSplit).length > 0) {
        weekly.push(availability.slice(prevSplit))

      }

    }

    return weekly
  }

  render() {
    const { month, year } = this.props
    const availability = this.weekly_availabliilty()

    return (
      <Container className='mt-3' fluid={true}>
        <Row className='justify-content-center'>
          <Col className='col-8 text-center center-block'>
            <Card style={{ height: '85vh', padding: 0 }}>
              <Card.Header>
                <h4>
                  <Button variant='outline-dark' className='mr-5' name='prev' onClick={this.changeMonth} >&#8249;</Button>
                  {`Occupancy for ${moment(`${year}-${month}-01`).format('MMMM YYYY')}`}
                  <Button variant='outline-dark' className='ml-5' name='next' onClick={this.changeMonth} >&#8250;</Button></h4>
              </Card.Header>
              <Row className='justify-content-center mt-5'>
                <Col className='text-center center-block'>

                  {availability.length > 0 &&
                    <CardGroup>
                      <Card>
                        <Card.Header>Sunday</Card.Header>
                      </Card>
                      <Card>
                        <Card.Header>Monday</Card.Header>
                      </Card>
                      <Card>
                        <Card.Header>Tuesday</Card.Header>
                      </Card>
                      <Card>
                        <Card.Header>Wednesday</Card.Header>
                      </Card>
                      <Card>
                        <Card.Header>Thursday</Card.Header>
                      </Card>
                      <Card>
                        <Card.Header>Friday</Card.Header>
                      </Card>
                      <Card>
                        <Card.Header>Saturday</Card.Header>
                      </Card>
                    </CardGroup>
                  }

                  {availability.map(week => (
                    <CardGroup key={`week${week[0].date}${availability.indexOf(week)}`}>
                      {[0, 1, 2, 3, 4, 5, 6].map(dw => (
                        <Card
                          key={`week${week[0].date}${availability.indexOf(week)}${dw}`}
                          bg={week[dw] && (week[dw].pens.every(pen => pen.available >= 0) ? 'light' : 'danger')}
                        >
                          <Card.Body>
                            <Card.Title>{week[dw] && moment(week[dw].date).format('DD-MMM')}</Card.Title>
                            <Col>
                              {week[dw] && week[dw].pens.map(pen => (
                                <Row key={`pen${week.date}${pen.pen_type}`}>
                                  {pen.pen_type}{pen.pen_type === 'Dog Run' ? 's' : ''}: {pen.pen_type === 'Cat Room' ? pen.no_pets : pen.booked} / {pen.available}
                                </Row>
                              ))}
                            </Col>
                          </Card.Body>
                        </Card>
                      ))}
                    </CardGroup>
                  ))}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    availability: state.availability.dates,
    month: state.availability.month,
    year: state.availability.year,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateAvailability: props => dispatch(updateAvailability(props)),
    getAvailability: props => dispatch(getAvailability(props)),
    clearAvailability: () => dispatch(clearAvailability())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Occupancy);
