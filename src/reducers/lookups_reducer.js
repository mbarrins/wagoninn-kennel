export default function lookupsReducer(state = {
    colors: [], 
    breeds: [], 
    sexes: [], 
    sizes: [], 
    petTypes: [],
    immunisations: [],
    healthDetails: [],
    medications: [],
    doses: [],
    foods: [],
    measures: [],
    phoneTypes: [],
    roomTypes: [],
    bookingStatuses: [],
    validity: [],
    specialNeeds: [],
    sociabilities: [],
    schedules: [],
    issues: [],
    concerns: [],
    penTypes: [],
    errors: []
}, action) {
  switch (action.type) {
    case 'LOADING_LOOKUPS':
      
      return state
      
    case 'LOAD_LOOKUPS':
      
      return {
        ...state,
        ...action.payload.lookups
      }
    
    case 'LOOKUPS_ERRORS':
      
      return {
        ...state,
        errors: action.payload.errors
      }

    default:
      
      return state;
  }
}