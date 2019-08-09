import API from '../adapters/ownerAPI'

export const loadingOwner = () => {
  
  return {
    type: "LOADING_OWNER"
  }
}

export const ownerSuccess = (data) => {
  console.log('fetch success', data)
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
      .then(data => {
        
        return data
      })
      .then(data => data.error ? dispatch(ownerError(data)) : dispatch(ownerSuccess(data)))
  };
}

export const postOwner = owner => {
  
  return dispatch => {
    dispatch(loadingOwner());

    return API.postOwner(owner)
      .then(data => {
        
        return data
      })
      .then(data => data.error ? dispatch(ownerError(data)) : dispatch(ownerSuccess(data)))
  };
}