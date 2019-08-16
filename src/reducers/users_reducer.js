export default function usersReducer(state = {
  isAuthenticated: false,
  isLoading: false,
  errors: []
}, action) {
  switch (action.type) {
    case 'CHECKING_USER':

      return { ...state, isLoading: true }

    case 'LOG_IN_USER':

      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        errors: []
      }

    case 'USER_ERRORS':

      return {
        ...state,
        errors: action.payload.errors,
        isLoading: false
      }

    case 'NO_TOKEN':

      return {
        ...state,
        isLoading: false
      }

    case 'USER_LOGOUT':

      return {
        ...state,
        isAuthenticated: false
      }

    default:

      return state;
  }
}