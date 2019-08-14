const initialState = {
  dates: [],
  pens_available: [],
  errors: []
}

export default function availabilityReducer(state = initialState, action) {
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

    case 'CLEAR_PET':

        return initialState;

    default:
      
      return state;
  }
}