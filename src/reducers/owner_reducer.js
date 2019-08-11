export default function ownerReducer(state = {
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  primary_phone: '',
  primary_phone_type_id: '',
  secondary_phone: '',
  secondary_phone_type_id: '',
  address_line_1: '',
  address_line_2: '',
  address_line_3: '',
  city: '',
  state: '',
  zipcode: '',
  emergency_contact_name: '',
  emergency_contact_phone: '',
  partner_name: '',
  partner_phone: '',
  agreed_terms: false,
  agreed_date: '',
  notes: '',
  pets: [],
  concerns: [],
  errors: []
}, action) {
switch (action.type) {
  case 'LOADING_OWNER':
    
    return state
    
  case 'LOAD_OWNER':
    
    return {
      ...state,
      ...action.payload.owner
    }
  
  case 'UPDATE_OWNER':

    return {
      ...state,
      ...action.payload
    }

  case 'OWNER_ERRORS':
    
    return {
      ...state,
      errors: action.payload.errors
    }

  default:
    
    return state;
}
}