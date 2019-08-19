import React from 'react'
import { connect } from 'react-redux'
import { Bar, Line } from 'react-chartjs-2';
import { getIncome, clearIncome } from '../actions/incomeActions'

class BarChart extends React.Component {

  componentDidMount() {
    this.props.getIncome({ year: this.props.year });
  }

  data = () => ({
    labels: this.props.months.map(month => month.month),
    datasets: [{
      label: "2019",
      backgroundColor: 'green',
      // backgroundColor: 'rgb(255, 99, 132)',
      // borderColor: 'rgb(255, 99, 132)',
      data: this.props.months.map(month => month.amount)
    }]
    // }, {
    //   label: "2018",
    //   backgroundColor: 'blue',
    //   // backgroundColor: 'rgb(255, 99, 132)',
    //   // borderColor: 'rgb(255, 99, 132)',
    //   data: this.props.months.map(month => month.amount),
    // }, {
    //   label: "2019",
    //   backgroundColor: 'purple',
    //   // backgroundColor: 'rgb(255, 99, 132)',
    //   // borderColor: 'rgb(255, 99, 132)',
    //   data: this.props.months.map(month => month.amount),
    // }]
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