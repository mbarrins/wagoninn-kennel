import React from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2';
import { getIncome, clearIncome } from '../actions/incomeActions'

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
    return (
      < Bar data={this.data()} />
    )
  }
}

const mapStateToProps = state => {
  return {
    year: state.income.year,
    years: state.income.years
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getIncome: props => dispatch(getIncome(props)),
    clearIncome: () => dispatch(clearIncome())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);