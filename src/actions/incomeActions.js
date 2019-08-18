import API from '../adapters/bookingAPI'

export const loadingIncome = () => {

  return {
    type: "LOADING_INCOME"
  }
}

export const incomeSuccess = (data) => {

  return {
    type: "LOAD_INCOME",
    payload: data
  }
}

export const incomeError = (data) => {

  return {
    type: "INCOME_ERRORS",
    payload: data
  }
}

export const getIncome = (props) => {

  return dispatch => {
    dispatch(loadingIncome());

    return API.getAnnualIncome(props)
      .then(data => data.error ? dispatch(incomeError(data)) : dispatch(incomeSuccess(data)))
  };
}

export const clearIncome = (props) => {

  return {
    type: "CLEAR_INCOME"
  }
}