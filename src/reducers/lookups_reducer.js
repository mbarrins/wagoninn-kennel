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
    errors: [],
    loading: false
}, action) {
  switch (action.type) {
    case 'LOADING_LOOKUPS':
      
      return {
        ...state,
        ...action.payload
      }
      
    case 'LOAD_LOOKUPS':

      return {
        ...state,
        ...action.payload.lookups,
        loading: false
      }
    
    case 'LOOKUPS_ERRORS':
      
      return {
        ...state,
        errors: action.payload.errors,
        loading: false
      }

    default:
      
      return state;
  }
}