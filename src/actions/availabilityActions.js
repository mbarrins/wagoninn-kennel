import API from '../adapters/bookingAPI'

export const loadingAvailability = () => {
  
  return {
    type: "LOADING_AVAILABILITY"
  }
}

export const availabilitySuccess = (data) => {
  
  return {
    type: "LOAD_AVAILABILITY",
    payload: data
  }
}

export const availabilityError = (data) => {
  
  return {
    type: "AVAILABILITY_ERRORS",
    payload: data
  }
}

export const getAvailability = (props) => {
  
  return dispatch => {
    dispatch(loadingAvailability());

    return API.getAvailability(props)
      .then(data => data.error ? dispatch(availabilityError(data)) : dispatch(availabilitySuccess(data)))
  };
}

export const clearAvailability = (props) => {

  return {
    type: "CLEAR_AVAILABILITY"
  }
}