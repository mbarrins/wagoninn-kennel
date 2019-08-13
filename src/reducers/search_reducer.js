export default function searchReducer(state = {
  owners: [],
  errors: []
}, action) {
switch (action.type) {
  case 'LOADING_SEARCH':
    
    return state
    
  case 'LOAD_SEARCH':
    
    return {
      ...state,
      ...action.payload
    }

  case 'SEARCH_ERRORS':
    
    return {
      ...state,
      errors: action.payload.errors
    }

  default:
    
    return state;
  }
}