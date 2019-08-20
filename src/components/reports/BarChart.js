import React from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2';
import { getIncome, clearIncome } from '../../actions/incomeActions'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

class BarChart extends React.Component {

  componentDidMount() {
    this.props.getIncome({ year: this.props.year, type: this.props.type });
  }

  dataColours = () => ['#394039', '#5e695e', '#839083']

  data = () => {
    if (this.props.years.length === 0) return {}

    return (
      {
        labels: this.props.years[0].months.map(month => month.month),
        datasets: this.props.years.map((year, index) => ({
          label: year.year,
          backgroundColor: this.dataColours()[index],
          data: year.months.map(month => month.amount)
        }))
      }
    )
  }

  render() {
    if (this.props.loading) return (
      <Row className='min-vh-100'>
        <Col className='text-center offset-sm-1 my-5'>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
      </Row>
    )

    return (
      <Row className='min-vh-100'>
        <Col className='text-center offset-sm-1 my-5'>
          <div className="chart-container" style={{ position: 'relative', height: '80vh', width: '80vw' }}>
            < Bar
              data={this.data()}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    year: state.income.year,
    years: state.income.years,
    loading: state.income.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getIncome: props => dispatch(getIncome(props)),
    clearIncome: () => dispatch(clearIncome())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);