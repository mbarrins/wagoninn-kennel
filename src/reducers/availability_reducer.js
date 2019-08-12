export default function availabilityReducer(state = {
  availability: [],
  errors: []
}, action) {
switch (action.type) {
  case 'LOADING_AVAILABILITY':
    
    return state
    
  case 'LOAD_AVAILABILITY':
    
    return {
      ...state,
      ...action.payload
    }

  case 'AVAILABILITY_ERRORS':
    
    return {
      ...state,
      errors: action.payload.errors
    }

  default:
    
    return state;
}
}