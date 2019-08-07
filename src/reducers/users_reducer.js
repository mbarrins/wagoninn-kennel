export default function usersReducer(state = {
  loggedIn: false,
  errors: []
}, action) {
  switch (action.type) {
    case 'CHECKING_USER':
      
      return state
      
    case 'LOG_IN_USER':
      
      return {
        ...state,
        loggedIn: true,
        errors: []
      }
    
    case 'USER_ERRORS':
      
      return {
        ...state,
        errors: action.payload.errors
      }

    case 'LOG_OUT_USER':
      
      return {
        ...state,
        loggedIn: false
      }

    default:
      
      return state;
  }
}