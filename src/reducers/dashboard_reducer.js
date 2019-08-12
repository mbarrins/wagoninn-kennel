import moment from 'moment'

export default function dashboardReducer(state = {
  date: moment().format('YYYY-MM-DD'),
  today_drop_off: {am: [], pm: []},
  today_pick_up: {am: [], pm: []},
  todays_pens: [],
  tomorrow_drop_off: {am: [], pm: []},
  errors: []
}, action) {
switch (action.type) {
  case 'LOADING_DASHBOARD':
    
    return state
    
  case 'LOAD_DASHBOARD':
    
    return {
      ...state,
      ...action.payload.dashboard
    }

  case 'UPDATE_DASHBOARD':

    return {
      ...state,
      ...action.payload
    }

  case 'DASHBOARD_ERRORS':
    
    return {
      ...state,
      errors: action.payload.errors
    }

  default:
    
    return state;
}
}