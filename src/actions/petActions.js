import API from '../adapters/petAPI'

export const loadingPet = () => {
  
  return {
    type: "LOADING_PET"
  }
}

export const petSuccess = (data) => {
  
  return {
    type: "LOAD_PET",
    payload: data
  }
}

export const petError = (data) => {
  
  return {
    type: "PET_ERRORS",
    payload: data
  }
}

export const getPet = id => {
  
  return dispatch => {
    dispatch(loadingPet());

    return API.getPet(id)
      .then(data => data.error ? dispatch(petError(data)) : dispatch(petSuccess(data)))
  };
}

export const postPet = pet => {
  
  return dispatch => {
    dispatch(loadingPet());

    return API.postPet(pet)
      .then(data => data.error ? dispatch(petError(data)) : dispatch(petSuccess(data)))
  };
}

export const submitUpdatePet = (props) => {

  return dispatch => {
    dispatch(loadingPet());

  return API.patchPet(props)
      .then(data => data.error ? dispatch(petError(data)) : dispatch(petSuccess(data)))
  };
}

export const updatePet = (props) => {
  
  return {
    type: "UPDATE_PET",
    payload: props
  }
}

export const clearPet = (props) => {

  return {
    type: "CLEAR_PET"
  }
}