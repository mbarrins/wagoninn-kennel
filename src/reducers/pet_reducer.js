const initialState = {
  id: '',
  owner_id: '',
  name: '',
  pet_type_id: '',
  dob: '',
  sex_id: '',
  breed_id: '',
  color_id: '', 
  size_id: '',
  spayed_neutered: false,
  immunisations: [],
  foods: [],
  health_details: [],
  special_needs: [],
  medications: [],
  sociabilities: [],
  issues: [],
  errors: []
}

export default function petReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOADING_PET':
      
      return state
      
    case 'LOAD_PET':
      
      return {
        ...state,
        ...action.payload.pet
      }
    
    case 'UPDATE_PET':

      return {
        ...state,
        ...action.payload
      }

    case 'CLEAR_PET':

        return initialState;

    case 'PET_ERRORS':
      
      return {
        ...state,
        errors: action.payload.errors
      }

    default:
      
      return state;
  }
}