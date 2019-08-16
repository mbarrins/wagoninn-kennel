import API from '../adapters/ownerAPI'

export const loadingOwner = () => {

  return {
    type: "LOADING_OWNER"
  }
}

export const ownerSuccess = (data) => {

  return {
    type: "LOAD_OWNER",
    payload: data
  }
}

export const ownerError = (data) => {

  return {
    type: "OWNER_ERRORS",
    payload: data
  }
}

export const getOwner = id => {

  return dispatch => {
    dispatch(loadingOwner());

    return API.getOwner(id)
      .then(data => data.error ? dispatch(ownerError(data)) : dispatch(ownerSuccess(data)))
  };
}

export const postOwner = owner => {

  return dispatch => {
    dispatch(loadingOwner());

    return API.postOwner(owner)
      .then(data => data.error ? dispatch(ownerError(data)) : dispatch(ownerSuccess(data)))
  };
}

export const submitUpdateOwner = (props) => {
  return dispatch => {
    dispatch(loadingOwner());

    return API.patchOwner(props)
      .then(data => data.error ? dispatch(ownerError(data)) : dispatch(ownerSuccess(data)))
  };
}

export const updateOwner = (props) => {

  return {
    type: "UPDATE_OWNER",
    payload: props
  }
}

export const clearOwner = (props) => {

  return {
    type: "CLEAR_OWNER"
  }
}