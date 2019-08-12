import API from '../adapters/bookingAPI'

export const loadingDashboard = () => {
  
  return {
    type: "LOADING_DASHBOARD"
  }
}

export const dashboardSuccess = (data) => {
  
  return {
    type: "LOAD_DASHBOARD",
    payload: data
  }
}

export const dashboardError = (data) => {
  
  return {
    type: "DASHBOARD_ERRORS",
    payload: data
  }
}

export const getDashboard = (props) => {
  
  return dispatch => {
    dispatch(loadingDashboard());

    return API.getDashboard(props)
      .then(data => data.error ? dispatch(dashboardError(data)) : dispatch(dashboardSuccess(data)))
  };
}

export const updateDashboard = (props) => {

  return {
    type: "UPDATE_DASHBOARD",
    payload: props
  }
}