const intialState = {
  id: '',
  owner_id: '',
  check_in: '',
  check_in_time: '',
  check_out: '',
  check_out_time: '',
  booking_status_id: 1,
  booking_ref: '',
  booking_pens: [],
  loading: false,
  errors: []
}

export default function bookingReducer(state = intialState, action) {
  switch (action.type) {
    case 'LOADING_BOOKING':

      return {
        ...state,
        loading: true
      }

    case 'LOAD_BOOKING':

      return {
        ...state,
        ...action.payload.booking,
        loading: false
      }

    case 'UPDATE_BOOKING':

      return {
        ...state,
        ...action.payload
      }

    case 'BOOKING_ERRORS':

      return {
        ...state,
        errors: action.payload.errors,
        loading: false
      }

    case 'CLEAR_BOOKING':

      return intialState

    default:

      return state;
  }
}