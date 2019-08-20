import React from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2';
import { getIncome, clearIncome } from '../actions/incomeActions'

class BarChart extends React.Component {

  componentDidMount() {
    this.props.getIncome({ year: this.props.year });
  }

  data = () => ({
    labels: this.props.months.map(month => month.month),
    datasets: [{
      label: "2019",
      backgroundColor: 'rgba(57, 63, 56, 0.8)',
      data: this.props.months.map(month => month.amount)
    }]
  })

  render() {
    return (
      < Bar data={this.data()} />
    )
  }
}

const mapStateToProps = state => {
  return {
    year: state.income.year,
    months: state.income.months
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getIncome: props => dispatch(getIncome(props)),
    clearIncome: () => dispatch(clearIncome())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);