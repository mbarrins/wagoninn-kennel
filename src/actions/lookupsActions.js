import API from '../adapters/lookupsAPI'

export const loadingLookups = () => {

  return {
    type: "LOADING_LOOKUPS",
    payload: { loading: true }
  }
}

export const getLookupsSuccess = (data) => {

  return {
    type: "LOAD_LOOKUPS",
    payload: data
  }
}

export const getLookupsError = (data) => {

  return {
    type: "LOOKUPS_ERRORS",
    payload: data
  }
}

export const getLookups = () => {

  return dispatch => {
    dispatch(loadingLookups());

    return API.getLookups()
      .then(data => data.error ? dispatch(getLookupsError(data)) : dispatch(getLookupsSuccess(data)))
  };
}