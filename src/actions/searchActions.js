import API from '../adapters/ownerAPI'

export const loadingSearch = () => {

  return {
    type: "LOADING_SEARCH"
  }
}

export const searchSuccess = (data) => {

  return {
    type: "LOAD_SEARCH",
    payload: data
  }
}

export const searchError = (data) => {

  return {
    type: "SEARCH_ERRORS",
    payload: data
  }
}

export const searchOwners = searchTerm => {

  return dispatch => {
    dispatch(loadingSearch());

    return API.searchOwners(searchTerm)
      .then(data => data.error ? dispatch(searchError(data)) : dispatch(searchSuccess(data)))
  };
}