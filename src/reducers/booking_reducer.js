export default function bookingReducer(state = {
  id: '',
  owner_id: '',
  check_in: '',
  check_in_time: '',
  check_out: '',
  check_out_time: '',
  booking_status_id: 1, 
  booking_ref: '',
  booking_pens: [],
  errors: []
}, action) {
switch (action.type) {
  case 'LOADING_BOOKING':
    
    return state
    
  case 'LOAD_BOOKING':
    
    return {
      ...state,
      ...action.payload.booking
    }
  
  case 'UPDATE_BOOKING':

    return {
      ...state,
      ...action.payload
    }

  case 'BOOKING_ERRORS':
    
    return {
      ...state,
      errors: action.payload.errors
    }

  default:
    
    return state;
}
}