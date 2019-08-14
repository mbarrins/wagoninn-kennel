import API from '../adapters/bookingAPI'

export const loadingBooking = () => {
  
  return {
    type: "LOADING_BOOKING"
  }
}

export const bookingSuccess = (data) => {
  
  return {
    type: "LOAD_BOOKING",
    payload: data
  }
}

export const bookingError = (data) => {
  
  return {
    type: "BOOKING_ERRORS",
    payload: data
  }
}

export const getBooking = id => {
  
  return dispatch => {
    dispatch(loadingBooking());

    return API.getBooking(id)
      .then(data => data.error ? dispatch(bookingError(data)) : dispatch(bookingSuccess(data)))
  };
}

export const postBooking = booking => {
  
  return dispatch => {
    dispatch(loadingBooking());

    return API.postBooking(booking)
      .then(data => data.error ? dispatch(bookingError(data)) : dispatch(bookingSuccess(data)))
  };
}

export const updateBooking = (props) => {

  return {
    type: "UPDATE_BOOKING",
    payload: props
  }
}

export const clearBooking = (props) => {

  return {
    type: "CLEAR_BOOKING"
  }
}