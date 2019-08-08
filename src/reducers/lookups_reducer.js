export default function lookupsReducer(state = {
  lookups: {
    colors: [], 
    breeds: [], 
    sexes: [], 
    sizes: [], 
    petTypes: [],
    immunisations: [],
    healthDetails: [],
    medications: [],
    dose: [],
    food: [],
    measure: [],
    personType: [],
    phoneType: [],
    roomType: [],
    bookingStatus: [],
    validity: [],
    specialNeeds: [],
    sociability: [],
    schedule: [],
    issues: [],
    concerns: [],
    penType: []
  },
  errors: []
}, action) {
  switch (action.type) {
    case 'LOADING_LOOKUPS':
      
      return state
      
    case 'LOAD_LOOKUPS':
      
      return {
        ...state,
        lookups: action.payload.lookups
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