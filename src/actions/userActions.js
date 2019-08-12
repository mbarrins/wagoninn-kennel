import API from '../adapters/usersAPI'

export const validatingUser = () => {
  
  return {
    type: "CHECKING_USER"
  }
}

export const validateUserSuccess = (data) => {
  
  return {
    type: "LOG_IN_USER",
    payload: data
  }
}

export const validateUserError = (data) => {
  
  return {
    type: "USER_ERRORS",
    payload: data
  }
}

export const validateNoToken = () => {
  
  return {
    type: "NO_TOKEN"
  }
}

export const validateUser = () => {
  
  return dispatch => {
    dispatch(validatingUser());

    return API.validateUser()
      .then(data => {
        
        return data
      })
      .then(data => data.error ? dispatch(validateNoToken(data)) : dispatch(validateUserSuccess(data)))
  };
}

export const loginUser = (user) => {
  
  return dispatch => {
    dispatch(validatingUser());

    return API.logIn(user)
      .then(data => data.errors ? dispatch(validateUserError(data)) : dispatch(validateUserSuccess(data)))
      .catch(data => dispatch(validateUserError(data)))
  };
}

export const logoutUser = () => {

  API.clearToken();

  return {
    type: "USER_LOGOUT"
  }
}